import React from 'react';
import {StyleSheet} from 'react-native';
import {RFValue} from "react-native-responsive-fontsize";
import Colors from "../Themes/Colors";

export const PickDriftScreenStyles = StyleSheet.create({
    driftContainer: {
        justifyContent: 'center',
        paddingBottom: RFValue(100, 812),
    },
    messageText: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'century-gothic-regular',
        lineHeight: RFValue(36, 812),
        color: '#2F496E'
    },
    bottleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: RFValue(50, 812),
        marginBottom: RFValue(50, 812),
    },
    bottleImage: {
        height: RFValue(340, 812),
        resizeMode: 'contain'
    },

    // text styles
    textCentered: {
        textAlign: 'center',
        fontSize: 17,
        fontFamily: 'century-gothic-regular',
        color: '#707070'
    },
    textRegularBlue: {
        fontSize: 17,
        fontFamily: 'century-gothic-regular',
        color: '#2F496E'
    },
    textRegularGray: {
        fontSize: 17,
        fontFamily: 'century-gothic-regular',
        color: '#707070'
    },
    textSmallGray: {
        fontSize: 13,
        fontFamily: 'century-gothic-regular',
        color: Colors.text,
        textAlign: 'center',
    },
    // feedback on view drift screen
    feedbackImage: {
        height: RFValue(90, 812),
        width: RFValue(90, 812),
        margin: RFValue(10, 812),
        resizeMode: 'contain'
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // options
    optionsContainer: {
        marginTop: '15%',
        // marginLeft: '5%',
        // marginRight: '5%'
    },
    optionList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    optionText: {
        fontFamily: 'century-gothic-regular',
        color: Colors.text,
        opacity: 0.8
    },

    // comment input
    commentContainer: {
        justifyContent: 'space-between',
    },
    commentInputContainer: {
        marginTop: RFValue(10, 812),
        borderColor: '#707070',
        borderWidth: 0.5,
        height: RFValue(85, 812),
        width: '100%',
        padding: RFValue(8, 812),
    },

    // submit button
    submitButtonText: {
        fontSize: 17,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'century-gothic-regular',
    },

});
