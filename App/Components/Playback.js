import React from 'react';
import { Text, TouchableOpacity, View, Image, Slider } from "react-native";
import { Audio } from 'expo-av';
import firebase from 'firebase';
import { PlaybackStyles } from "../Styles/MainStyles";
import firestore from "../../firebase";

const allUsers = ['tounkara@fluantly.com', 'suyie@gmail.com', 'ibrahima@fluantly.com'];

export class Playback extends React.Component {
    constructor(props) {
        super(props);
        this.isSeeking = false;
        this.shouldPlayAtEndOfSeek = false;
        this.playbackInstance = null;
        this.state = {
            playbackInstancePosition: null,
            playbackInstanceDuration: null,
            isPlaying: false,
            isBuffering: false,
            isLoading: true,
            volume: 1.0,
            rate: 1.0,
            source: {}
        };
    }

    _isMounted = false;

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false
        });
        (async () => {
            await this._loadNewPlaybackInstance();
        })();
    }

    getEmail = () => {
        let chosen = allUsers[Math.round(Math.random()*(allUsers.length - 1))];
        while (chosen === firebase.auth().currentUser.email){
            chosen = allUsers[Math.round(Math.random()*(allUsers.length - 1))];
        }
        return chosen;
    };

    async _loadSameInstance(){
        const initialStatus = {
            shouldPlay: false,
            rate: this.state.rate,
            volume: this.state.volume
        };

        const { sound, status } = await Audio.Sound.createAsync(
            this.state.source,
            initialStatus,
            this._onPlaybackStatusUpdate
        );

        this.playbackInstance = sound;
        this.setState({isLoading: false});
    }

    async _loadNewPlaybackInstance() {
        if (this.playbackInstance != null) {
            await this.playbackInstance.unloadAsync();
            this.playbackInstance.setOnPlaybackStatusUpdate(null);
            this.playbackInstance = null;
        }

        let userRef = firestore.collection('practice').doc(this.getEmail());
        await userRef.get().then(d => {
            let recs = d.data().recordings;
            this.setState({source:{uri: recs ? recs[Math.round(Math.random()*(recs.length - 1))].audioURL : null}});
        });

        const initialStatus = {
            shouldPlay: false,
            rate: this.state.rate,
            volume: this.state.volume
        };

        const { sound, status } = await Audio.Sound.createAsync(
            this.state.source,
            initialStatus,
            this._onPlaybackStatusUpdate
        );

        this.playbackInstance = sound;
        this.setState({isLoading: false});
    }

    _onPlaybackStatusUpdate = status => {
        if (this._isMounted) {
            if (status.isLoaded) {
                this.setState({
                    playbackInstancePosition: status.positionMillis,
                    playbackInstanceDuration: status.durationMillis,
                    shouldPlay: status.shouldPlay,
                    isPlaying: status.isPlaying,
                    isBuffering: status.isBuffering,
                    rate: status.rate,
                    volume: status.volume
                });
                if (status.didJustFinish) {
                    (async () => {
                        await this._loadSameInstance();
                    })();
                }
            } else {
                if (status.error) {
                    console.log(`FATAL PLAYER ERROR: ${status.error}`);
                }
            }
        }
    }

    _onPlayPausePressed = () => {
        if (this._isMounted) {
            if (this.playbackInstance != null) {
                if (this.state.isPlaying) {
                    this.setState({isPlaying: false});
                    this.playbackInstance.pauseAsync();
                } else {
                    this.setState({isPlaying: true});
                    this.playbackInstance.playAsync();
                }
            }
            // else {
            //     this._loadNewPlaybackInstance();
            // }
        }
    }

    _onSeekSliderValueChange = value => {
        if (this.playbackInstance != null && !this.isSeeking && this._isMounted) {
            this.isSeeking = true;
            this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
            this.playbackInstance.pauseAsync();
        }
    };

    _onSeekSliderSlidingComplete = async value => {
        if (this.playbackInstance != null && this._isMounted) {
            this.isSeeking = false;
            const seekPosition = value * this.state.playbackInstanceDuration;
            if (this.shouldPlayAtEndOfSeek) {
                this.playbackInstance.playFromPositionAsync(seekPosition);
            } else {
                this.playbackInstance.setPositionAsync(seekPosition);
            }
        }
    };

    _getSeekSliderPosition() {
        if (
            this._isMounted &&
            this.playbackInstance != null &&
            this.state.playbackInstancePosition != null &&
            this.state.playbackInstanceDuration != null
        ) {
            return (
                this.state.playbackInstancePosition /
                this.state.playbackInstanceDuration
            );
        }
        return 0;
    }

    _getMMSSFromMillis(millis) {
        const totalSeconds = millis / 1000;
        const seconds = Math.floor(totalSeconds % 60);
        const minutes = Math.floor(totalSeconds / 60);

        const padWithZero = number => {
            const string = number.toString();
            if (number < 10) {
                return "0" + string;
            }
            return string;
        };
        return padWithZero(minutes) + ":" + padWithZero(seconds);
    }

    _getTimestamp() {
        if (
            this._isMounted &&
            this.playbackInstance != null &&
            this.state.playbackInstancePosition != null &&
            this.state.playbackInstanceDuration != null
        ) {
            return `${this._getMMSSFromMillis(this.state.playbackInstanceDuration-this.state.playbackInstancePosition)}`;
        }
        return "";
    }

    render() {
        return (
            <View style={PlaybackStyles.playbackContainer}>
                <TouchableOpacity style={{width: '15%'}}
                                  onPress={this._onPlayPausePressed}
                                  disabled={this.state.isLoading}>
                    <Image style={PlaybackStyles.playbackIcon}
                           source={this.state.isPlaying? require('../../assets/pause.png'):require('../../assets/play.png')} />
                </TouchableOpacity>
                <View style={PlaybackStyles.sliderContainer}>
                    <View style={{width: '18%'}}>
                        <Text style={PlaybackStyles.timeSmallGrey}>{this._getTimestamp()}</Text>
                    </View>
                    <Slider
                        style={{width: '82%'}}
                        value={this._getSeekSliderPosition()}
                        onValueChange={this._onSeekSliderValueChange}
                        onSlidingComplete={this._onSeekSliderSlidingComplete}
                        disabled={this.state.isLoading}
                    />
                </View>
            </View>
        );
    }
}

