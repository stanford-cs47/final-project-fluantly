import React from 'react';
import {Text, TouchableOpacity, View, Image} from "react-native";
import {PickDriftScreenStyles} from "../../Styles/PickDriftScreenStyles";
import {MainStyles} from "../../Styles/MainStyles";

export class PickDriftScreen extends React.Component {
    render() {
        return (
            <View style={[MainStyles.container, PickDriftScreenStyles.driftContainer]}>
                <Text style={PickDriftScreenStyles.messageText}>
                    You've received a new drift bottle from someone in Palo Alto!
                </Text>
                <View style={PickDriftScreenStyles.bottleContainer}>
                    <TouchableOpacity onPress={() => {this.props.navigation.navigate('ViewDrift')}}>
                        <Image style={PickDriftScreenStyles.bottleImage}
                               source={require('../../../assets/bottle.png')} />
                    </TouchableOpacity>
                </View>
                <Text style={PickDriftScreenStyles.textCentered}>
                    Tap on the bottle to view
                </Text>
            </View>
        );
    }
}
