import React from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {FontAwesome, MaterialIcons} from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';
import {Colors, Metrics} from "../Themes";
import firebase from 'firebase';
import firestore from "../../firebase";
import {RFPercentage, RFValue} from "react-native-responsive-fontsize";
import {RecordScreenStyles} from "../Styles/RecordScreenStyles";


const RATE_SCALE = 3.0;

export default class Recording extends React.Component {
    constructor(props) {
        super(props);
        this.recording = null;
        this.sound = null;
        this.isSeeking = false;
        this.shouldPlayAtEndOfSeek = false;
        this.state = {
            progress: null,
            uploading: false,
            props: props,
            haveRecordingPermissions: false,
            isLoading: false,
            isPlaybackAllowed: false,
            muted: false,
            soundPosition: null,
            soundDuration: null,
            recordingDuration: null,
            shouldPlay: false,
            isPlaying: false,
            isRecording: false,
            fontLoaded: false,
            shouldCorrectPitch: true,
            volume: 1.0,
            rate: 1.0,
            recordingIcon: 'microphone' // start / send / stop,

        };
        this.recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY));
        this.navigation = null;
        // // UNCOMMENT THIS TO TEST maxFileSize:
        // this.recordingSettings.android['maxFileSize'] = 12000;
    }

    _isMounted = false;

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        this._askForPermissions(); // gets user permission
    }

    _askForPermissions = async () => {
        const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        if (this._isMounted) {
            this.setState({
                haveRecordingPermissions: response.status === 'granted',
            });
        }

    };

    /** _onSend: fn will send the recording to allDriftBottles/. Appears when user
     * successfully records audio and taps 'send'. On success or failure, navigates home/ w message. */
    _onSend = async () => {
        this.setState({uploading: true});
        const self = this;
        let res = await this._uploadAudio(this.recording.getURI());
        await res.task.on('state_changed', function(snapshot){
            // sets the progress bar
            self.setState({progress: (((snapshot.bytesTransferred / snapshot.totalBytes)) * 100).toFixed(0)});
        }, (e) => {     // Handle unsuccessful uploads
            this.props.navigation.navigate('Home', {
                driftSendStatus: 'Drift bottle failed to send',
            });
            console.log('An error occurred', e);
        }, () => {  // Handle successful uploads on complete
            res.task.snapshot.ref.getDownloadURL().then((downloadURL) => {
                let userRef = firestore.collection('practice').doc(firebase.auth().currentUser.email);
                userRef.get().then((doc)=>{
                    if (doc.exists) {
                        let recordings = doc.data().recordings || [];
                        recordings.push({
                            status: 0,
                            topic: this.props.topic,
                            prompt: this.props.prompt,
                            time: Date.now(),
                            audioURL: downloadURL

                        });
                        let newDoc = {
                            ...doc.data(), recordings : recordings
                        };
                        userRef.set(newDoc, {merge: true});
                    } else {
                        console.log('here')
                    }
                });
            });
            this.props.navigation.navigate('Home', {
                driftSendStatus: 'Drift bottle successfully sent',
            });
        });
    }

    /** _onRecordPressed: Handles event when user finished recording and is ready to send */
    _onRecordPressed = () => {
        if (this.state.recordingIcon !== 'send' && this._isMounted) {
            if (this.state.isRecording) {
                this._stopRecordingAndEnablePlayback();
                this.setState({recordingIcon: 'send'})
            } else {
                this._stopPlaybackAndBeginRecording();
                this.setState({recordingIcon: 'stop'})
            }
        }
    };

    /** _onRestartRecording: Allow a resetting of recording params. Restart */
    _onRestartRecording = () => {
        if (this._isMounted) {
            this.setState({recordingIcon: 'microphone', soundDuration: null, isRecording: null})
        }
    }

    /** _updateScreenForSoundStatus: Updates screen to show time of recording [progress state] */
    _updateScreenForSoundStatus = status => {
        if (status.isLoaded && this._isMounted) {
            this.setState({
                soundDuration: status.durationMillis,
                soundPosition: status.positionMillis,
                shouldPlay: status.shouldPlay,
                isPlaying: status.isPlaying,
                rate: status.rate,
                muted: status.isMuted,
                volume: status.volume,
                shouldCorrectPitch: status.shouldCorrectPitch,
                isPlaybackAllowed: true,
            });
        } else if (this._isMounted){
            this.setState({
                soundDuration: null,
                soundPosition: null,
                isPlaybackAllowed: false,
            });
            if (status.error) {
                console.log(`FATAL PLAYER ERROR: ${status.error}`);
            }
        }
    };

    _uploadAudio = async(uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const timestamp = Number(new Date());
        let filename = firebase.auth().currentUser.email + '-' + timestamp + '.caf';
        const ref = firebase.storage().ref().child('allDriftBottles/'+filename);
        let task = ref.put(blob);
        return {task, ref};
    };

    _updateScreenForRecordingStatus = status => {
        if (status.canRecord && this._isMounted) {
            this.setState({
                isRecording: status.isRecording,
                recordingDuration: status.durationMillis,
            });
        } else if (status.isDoneRecording && this._isMounted) {
            this.setState({
                isRecording: false,
                recordingDuration: status.durationMillis,
            });
            if (!this.state.isLoading) {
                this._stopRecordingAndEnablePlayback();
            }
        }
    };

    async _stopPlaybackAndBeginRecording() {
        if (this._isMounted) {
            this.setState({
                isLoading: true,
            });

            if (this.sound !== null) {
                await this.sound.unloadAsync();
                this.sound.setOnPlaybackStatusUpdate(null);
                this.sound = null;
            }
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                playsInSilentModeIOS: true,
                shouldDuckAndroid: true,
                interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
                playThroughEarpieceAndroid: false,
                staysActiveInBackground: true,
            });
            if (this.recording !== null) {
                this.recording.setOnRecordingStatusUpdate(null);
                this.recording = null;
            }

            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(this.recordingSettings);
            recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);

            this.recording = recording;
            await this.recording.startAsync(); // Will call this._updateScreenForRecordingStatus to update the screen.
            this.setState({
                isLoading: false,
            });
        }
    }

    async _stopRecordingAndEnablePlayback() {
        if (this._isMounted) {
            this.setState({
                isLoading: true,
            });
            try {
                await this.recording.stopAndUnloadAsync();
            } catch (error) {
                // Do nothing -- we are already unloaded.
            }

            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                playsInSilentModeIOS: true,
                playsInSilentLockedModeIOS: true,
                shouldDuckAndroid: true,
                interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
                playThroughEarpieceAndroid: false,
                staysActiveInBackground: true,
            });
            const {sound, status} = await this.recording.createNewLoadedSoundAsync(
                {
                    isLooping: false,
                    isMuted: this.state.muted,
                    volume: this.state.volume,
                    rate: this.state.rate,
                    shouldCorrectPitch: this.state.shouldCorrectPitch,
                },
                this._updateScreenForSoundStatus
            );
            this.sound = sound;
            this.setState({
                isLoading: false,
            });
        }
    }

    _onPlayPausePressed = () => {
        if (this.sound != null && this._isMounted) {
            if (this.state.isPlaying) {
                this.sound.pauseAsync();
            } else {
                this.sound.playAsync();
            }
        }
    };

    _onStopPressed = () => {
        if (this.sound != null && this._isMounted) {
            this.sound.stopAsync();
        }
    };


    _getRecordingTimestamp() {
        if (this.state.recordingDuration != null) {
            return `${this._getMMSSFromMillis(this.state.recordingDuration)}`;
        }
        return `${this._getMMSSFromMillis(0)}`;
    }

    _getMMSSFromMillis(millis) {
        const totalSeconds = millis / 1000;
        const seconds = Math.floor(totalSeconds % 60);
        const minutes = Math.floor(totalSeconds / 60);

        const padWithZero = number => {
            const string = number.toString();
            if (number < 10) {
                return '0' + string;
            }
            return string;
        };
        return padWithZero(minutes) + ':' + padWithZero(seconds);
    }

    _getPlaybackTimestamp() {
        if (
            this.sound != null &&
            this.state.soundPosition != null &&
            this.state.soundDuration != null
        ) {
            return `${this._getMMSSFromMillis(this.state.soundPosition)} / ${this._getMMSSFromMillis(
                this.state.soundDuration
            )}`;
        }
        return '';
    }

    render() {

        if (!this.state.haveRecordingPermissions){
            return (
                <View>
                    <View />
                    <Text>
                        You must enable audio recording permissions in order to use this app.
                    </Text>
                    <View />
                </View>
            )
        }

        return (
            <View>
                {
                    this.state.progress && this.state.uploading
                        ?
                        <Text style={{textAlign: 'center', fontSize: 20, fontFamily: 'century-gothic-bold'}}>
                            {this.state.progress === 100 ? 'Drift sent' : 'Drifting: ' + this.state.progress + '%'}
                        </Text>
                        :
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{flexDirection: "row", alignItems: 'center', justifyContent: 'center'}}>
                                {this.state.recording || this.state.soundDuration === null ? null :
                                    <View>
                                        <TouchableOpacity style={{margin: 10}} onPress={this._onPlayPausePressed}>
                                            <View style={{
                                                borderRadius: '100%',
                                                borderWidth: RFValue(3, 812),
                                                borderColor: Colors.text,
                                                height: Metrics.icons.xlarge,
                                                width: Metrics.icons.xlarge,
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <MaterialIcons name={'play-arrow'} size={Metrics.icons.xll} color={Colors.text} />
                                            </View>
                                        </TouchableOpacity>

                                        <Text style={RecordScreenStyles.smallTextStyle}>
                                            Play
                                        </Text>
                                    </View>
                                }

                                <View>
                                    <Text style={{color: Colors.error, textAlign: 'center'}}>
                                        {this.state.isRecording ? 'LIVE' : ' '}
                                    </Text>
                                    <TouchableOpacity onPress={this.state.recordingIcon !== 'send' && this._isMounted ? this._onRecordPressed : this._onSend} style={{margin: 10}}>
                                        <View style={{
                                            borderRadius: '100%',
                                            borderWidth: RFValue(3, 812),
                                            borderColor: Colors.primary,
                                            height: Metrics.icons.xxlarge,
                                            width: Metrics.icons.xxlarge,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            {this.state.recordingIcon === 'send'
                                                ?  <Image style={{width: RFPercentage(10), height: RFPercentage(10)}}
                                                          source={require('../../assets/bottle_blue.png')} />
                                                : <FontAwesome name={this.state.recordingIcon} size={RFPercentage(10)} color={Colors.primary} />
                                            }
                                        </View>
                                    </TouchableOpacity>
                                    <Text style={RecordScreenStyles.smallTextStyle}>
                                        {this._getRecordingTimestamp()}
                                    </Text>
                                </View>

                                {this.state.recording || this.state.soundDuration === null ? null :
                                    <View>
                                        <TouchableOpacity style={{margin: 10}} onPress={this._onRestartRecording}>
                                            <View style={{
                                                borderRadius: '100%',
                                                borderWidth: RFValue(3, 812),
                                                borderColor: Colors.text,
                                                height: Metrics.icons.xlarge,
                                                width: Metrics.icons.xlarge,
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <FontAwesome name={'close'} size={Metrics.icons.xll} color={Colors.text}/>
                                            </View>
                                        </TouchableOpacity>

                                        <Text style={RecordScreenStyles.smallTextStyle}>
                                            Cancel
                                        </Text>
                                    </View>
                                }
                            </View>
                        </View>
                }
            </View>
        )
    }
}
