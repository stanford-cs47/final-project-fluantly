import React from 'react';
import {StyleSheet} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {Dimensions } from "react-native";
const screenWidth = Math.round(Dimensions.get('window').width);
import {Metrics, Colors} from "../Themes";


export const SendDriftStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: RFValue(10, 812),
    },
    card: {
        backgroundColor: Colors.snow,
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: RFValue(3, 812) },
        borderRadius: RFValue(7, 812),
        height: RFValue(180, 812),
        width: RFValue(180, 812),
        marginTop: RFValue(10, 812),
        marginBottom: RFValue(10, 812),
    },
    textStyle: {
        fontFamily: 'century-gothic-regular',
        fontSize: RFPercentage(2.5),
        textAlign: 'center',
        color: Colors.text,
    },
    cardTextStyle: {
        fontFamily: 'century-gothic-regular',
        fontSize: RFPercentage(1.9)
    },
    topicCardContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        marginTop: 20
    },
    topicCardStyle: {
        flex: 2,
        width: '100%',
        height: '60%',
        paddingBottom: 10
    },
    Cols: {
        justifyContent: 'center',
        alignItems: 'center'
    },
});