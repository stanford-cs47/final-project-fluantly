import React from 'react';
import {StyleSheet} from 'react-native';
import {RFPercentage, RFValue} from "react-native-responsive-fontsize";
import Colors from "../Themes/Colors";

export const RecordScreenStyles = StyleSheet.create({
    textStyle: {
        fontFamily: 'century-gothic-regular',
        fontSize: RFPercentage(2.5),
        textAlign: 'center',
        color: Colors.text,
    },
    cardAction: {
        fontFamily: 'century-gothic-regular',
        fontSize: RFPercentage(2.5),
        color: Colors.primaryDark,
    },
    cardPrompt: {
        fontFamily: 'century-gothic-bold',
        fontSize: RFPercentage(3),
        color: Colors.primaryDark,
        textAlign: 'center',
    },
    cardHints: {
        fontFamily: 'century-gothic-italic',
        fontSize: RFPercentage(2),
        color: Colors.primaryDark,
    },
    recordTextStyle: {
        fontFamily: 'century-gothic-regular',
        fontSize: RFPercentage(2.5),
        textAlign: 'center',
        color: Colors.text,
    },
    smallTextStyle: {
        fontFamily: 'century-gothic-regular',
        textAlign: 'center',
        color: Colors.text,
    }
});