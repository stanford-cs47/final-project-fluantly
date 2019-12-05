import React from 'react';
import {Text, TouchableOpacity, View, Image} from "react-native";
import {PickDriftScreenStyles} from "../../Styles/PickDriftScreenStyles";
import { Playback } from "../../Components/Playback";
import PlaybackMessageBoxContainer from "../../Components/PlaybackMessageBoxContainer";
import {MainStyles} from "../../Styles/MainStyles";
import {RFValue} from "react-native-responsive-fontsize";

export class ViewDriftScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[MainStyles.container, PickDriftScreenStyles.driftContainer]}>
                <PlaybackMessageBoxContainer children={
                    <>
                        <View>
                            <Text style={PickDriftScreenStyles.textRegularBlue}>From someone in Palo Alto</Text>
                        </View>
                        <Playback currentAudio={(curr)=>this.setState({currentAudio: curr})}/>
                    </>
                }/>
                <View style={{marginTop: RFValue(45, 812)}}>
                    <View>
                        <Text style={PickDriftScreenStyles.textRegularGray}>Were you able to understand?</Text>
                    </View>
                    <View style={{marginTop: RFValue(30, 812), flexDirection: 'row'}}>
                        <View style={PickDriftScreenStyles.imageContainer}>
                            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Feedback', {face: 0})}}>
                                <Image style={PickDriftScreenStyles.feedbackImage} source={require('../../../assets/confused.png')} />
                            </TouchableOpacity>
                            <Text style={PickDriftScreenStyles.textCentered}>Not sure...</Text>
                        </View>
                        <View style={PickDriftScreenStyles.imageContainer}>
                            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Feedback', {face: 1})}}>
                                <Image style={PickDriftScreenStyles.feedbackImage} source={require('../../../assets/thumbs-up.png')} />
                            </TouchableOpacity>
                            <Text style={PickDriftScreenStyles.textCentered}>Got it!</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
