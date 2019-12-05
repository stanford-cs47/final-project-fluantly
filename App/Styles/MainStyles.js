import React from 'react';
import {StyleSheet} from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import Colors from "../Themes/Colors";

const MainStyles = StyleSheet.create({
    // font
    fontRegular: {
        fontFamily: 'century-gothic-regular',
    },
    fontBold: {
        fontFamily: 'century-gothic-bold',
    },
    fontMedium: {
        fontFamily: 'century-gothic-medium',
    },
    fontItalic: {
        fontFamily: 'century-gothic-italic',
    },
    fontNormal: {
        fontSize: 17,
        color: Colors.text,
    },
    fontSmall: {
        fontSize: 13,
        color: Colors.text,
    },
    fontListNormal: {
        // normal font size for list view
        fontSize: 15,
        color: Colors.text,
    },
    fontLarge: {
        fontSize: 20,
        color: Colors.text,
    },
    fontExtraLarge: {
        fontSize: 24,
        color: Colors.text,
    },
    buttonFilled: {
        backgroundColor: '#2988BC',
        opacity: 1,
        borderRadius: RFValue(7, 812),
        padding: RFValue(10, 812),
        alignSelf: 'center',
        minWidth: RFValue(151, 812),
    },
    buttonFilledDisabled: {
        opacity: 0.5,
    },
    navigationLeftMargin: {
        left: RFValue(8, 812),
    },
    navigationRightMargin: {
        right: RFValue(17, 812),
    },
    // Unified margin for container in all screens
    container: {
        paddingLeft: RFValue(17, 812),
        paddingRight: RFValue(17, 812),
        paddingTop: RFValue(34, 812),
        paddingBottom: RFValue(34, 812),
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-between',
    },
});

const TabViewStyles = StyleSheet.create({
    // Tab Views
    tabView: {
        height: RFValue(41, 812),
    },
    tabBar: {
        backgroundColor: '#fff',
        marginLeft: RFValue(17, 812),
        marginRight: RFValue(17, 812),
    },
    tabIndicator: {
        backgroundColor: '#ED8C72',
    },
    activeLabel: {
        color: '#ED8C72',
    },
    inactiveLabel: {
        color: Colors.text,
    },
    tabScene: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        marginTop: RFValue(13, 812),
        marginLeft: RFValue(17, 812),
        marginRight: RFValue(17, 812),
    },
});

const PlaybackStyles = StyleSheet.create({
    // Shared playback containers
    messageBox: {
        paddingLeft: RFValue(17, 812),
        paddingRight: RFValue(17, 812),
        paddingTop: RFValue(34, 812),
        paddingBottom: RFValue(34, 812),
        // border
        shadowColor: '#000',
        shadowOpacity: 0.16,
        shadowOffset: { width: 0, height: RFValue(3, 812) },
        backgroundColor: '#FFF',
        borderRadius: RFValue(7, 812),
        // flex
        justifyContent: 'space-evenly',
        zIndex: 1,
    },
    messageBoxNarrow: {
        paddingBottom: RFValue(17, 812),
    },
    bottleImageContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        zIndex: 2,
    },
    bottleImage: {
        width: RFValue(37, 812),
        height: RFValue(82, 812),
        transform: [{ rotate: '19deg' }],
        position: 'absolute',
        top: RFValue(-55, 812),
        right: RFValue(-20, 812),
        resizeMode: 'contain',
    },
    content: {
        zIndex: 3,
    },
    playbackContainer: {
        marginTop: RFValue(12, 812),
        marginBottom: RFValue(12, 812),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    playbackIcon: {
        height: RFValue(30, 812),
        width: RFValue(30, 812),
        resizeMode: 'contain'
    },
    timeSmallGrey: {
        fontSize: 13,
        fontFamily: 'century-gothic-regular',
        color: Colors.text,
        textAlign: 'center',
    },
    sliderContainer: {
        width: '85%',
        borderWidth: 1,
        borderColor: '#707070',
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export {MainStyles, TabViewStyles, PlaybackStyles}