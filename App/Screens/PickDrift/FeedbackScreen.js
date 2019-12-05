import React from 'react';
import {
    Image,
    Keyboard,
    Text,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {PickDriftScreenStyles} from "../../Styles/PickDriftScreenStyles";
import {Playback} from "../../Components/Playback";
import PlaybackMessageBoxContainer from "../../Components/PlaybackMessageBoxContainer";
import {MainStyles} from "../../Styles/MainStyles";
import {RFValue} from "react-native-responsive-fontsize";
import Colors from "../../Themes/Colors";


export class FeedbackScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            optionOn: '#D5D5D5',
            optionOff: '#EBEBEB',
            options: ['accent', 'pace', 'tone', 'volume', 'words and phrases'],
            optionStatus: [0, 0, 0, 0, 0],
            comment: null,
            audio: null
        };
    }

    _onPressOptionButton = i => {
        this.setState(state => {
            const optionStatus = state.optionStatus.map((item, j) => {
                if (j === i) {
                    return item == 0 ? 1 : 0;
                } else {
                    return item;
                }
            });
            return {
                optionStatus,
            };
        });
    };

    _onUpdateOptionButtonStyle = i => {
        const color = this.state.optionStatus[i] == 1 ? this.state.optionOn : this.state.optionOff;
        return {
            backgroundColor: color,
            paddingLeft: RFValue(15, 812),
            paddingRight: RFValue(15, 812),
            paddingTop: RFValue(5, 812),
            paddingBottom: RFValue(5, 812),
            marginTop: RFValue(15, 812),
            borderRadius: RFValue(7, 812),
        }
    };

    render() {
        const face = this.props.navigation.getParam('face');
        const disabled = this.state.optionStatus.reduce((a,b) => a + b, 0) === 0;

        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={MainStyles.container}>
                    <PlaybackMessageBoxContainer children={<Playback />} narrow={true}/>
                    <View style={{flexDirection: 'row'}}>
                        <View style={PickDriftScreenStyles.imageContainer}>
                            <View>
                                <Image style={PickDriftScreenStyles.feedbackImage}
                                       source={face == 0 ? require('../../../assets/confused-white.png') : require('../../../assets/confused.png')}/>
                            </View>
                            <Text style={PickDriftScreenStyles.textCentered}>Not sure...</Text>
                        </View>
                        <View style={PickDriftScreenStyles.imageContainer}>
                            <View>
                                <Image style={PickDriftScreenStyles.feedbackImage}
                                       source={face == 1 ? require('../../../assets/thumbs-up-white.png') : require('../../../assets/thumbs-up.png')}/>
                            </View>
                            <Text style={PickDriftScreenStyles.textCentered}>Got it!</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{flexDirection: 'row'}}>
                            <Text style={PickDriftScreenStyles.textRegularGray}>
                                {face === 1 ? 'What I like about' : 'What can be improved'} (tap to select)
                            </Text>
                            <Text style={{color: Colors.secondary}}>*</Text>
                        </Text>
                        <View style={PickDriftScreenStyles.optionList}>
                            {this.state.options.map((prop, key) => {
                                return (
                                    <TouchableOpacity key={key}
                                                      style={this._onUpdateOptionButtonStyle(key)}
                                                      onPress={() => this._onPressOptionButton(key)}>
                                        <Text style={PickDriftScreenStyles.optionText}>{prop}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                    <View style={PickDriftScreenStyles.commentContainer}>
                        <Text style={PickDriftScreenStyles.textRegularGray}>Leave more comments to help your friend!</Text>
                        <View style={PickDriftScreenStyles.commentInputContainer}>
                            <TextInput
                                numberOfLines={10}
                                multiline={true}
                                value={this.state.comment}
                                onChangeText={text => this.setState({text})}
                            />
                        </View>
                    </View>

                    <TouchableOpacity style={MainStyles.buttonFilled}
                                      onPress={() => this.props.navigation.navigate('Home', {
                                          driftSendStatus: 'Feedback successfully sent',
                                      })}>

                        <Text style={PickDriftScreenStyles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
