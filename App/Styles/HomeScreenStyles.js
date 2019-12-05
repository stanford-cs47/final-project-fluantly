import React from 'react';
import {StyleSheet} from 'react-native';
import {Metrics, Colors} from "../Themes";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


export const HomeScreenStyles = StyleSheet.create({
    buttonPrimary: {
        flex: 2,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        backgroundColor: Colors.snow,
        // border
        borderRadius: RFValue(12, 812),
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: RFValue(3, 812) },
    },
    buttonText: {
        fontFamily: 'century-gothic-bold',
        textTransform: 'uppercase',
        fontSize:  RFPercentage(3),
        textAlign: 'center',
        color: '#2F496E',
    },
    buttonImgContainer: {
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonSecondaryContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
    },
    buttonSecondary: {
        height: RFValue(64, 812),
        width: RFValue(64, 812),
        borderRadius: RFValue(32, 812),
        marginBottom: RFValue(10, 812),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.snow,
        // border
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: RFValue(3, 812) },
    },
    ColsButtons: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    verticalSeparator: {
        flex: 1
    },
    buttonSecondaryText: {
        fontFamily: 'century-gothic-bold',
        fontSize:  RFPercentage(1.8),
        textAlign: 'center',
        color: '#2F496E',
    },
});
