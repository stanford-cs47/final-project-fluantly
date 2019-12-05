import React from 'react';
import {StyleSheet} from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";

export const ProgressScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    // main content
    progressContainer: {
        justifyContent: 'space-between',
        paddingBottom: RFValue(75, 812),
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    startDateArrowsDisabled: {
        color: '#D5D5D5',
    },
    startDateText: {
        flexGrow: 1,
        textAlign: 'center',
    },
    progressBarChartContainer: {
        height: RFValue(231.41, 812),
        width: '100%',
    },
    goalContainer: {
        marginTop: RFValue(10, 812),
        justifyContent: 'space-between',
        width: '100%',
    },
    goalRow: {
        marginTop: RFValue(34, 812),
    },
    goalRowNumber: {
        flexGrow: 1,
        textAlign: 'right',
    },

    // progress bar
    progressBarRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    progressBarRowChart: {
        flex: 1,
    },
    progressBarItemContainer: {
        justifyContent: 'flex-end',
        width: 30,
    },
    progressBarItem: {
        backgroundColor: '#2F496E',
        width: '100%',
        marginTop: RFValue(5, 812),
        marginBottom: RFValue(5, 812),
    },
    progressBarItemText: {
        textAlign: 'center',
    },

    // share
    shareButtonText: {
        color: 'white',
    },

    // modal
    shareModal: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        marginLeft: RFValue(32, 812),
        marginRight: RFValue(32, 812),
        top: RFValue(200, 812),
        maxHeight: RFValue(430, 812),
        padding: 0,
        borderRadius: RFValue(7, 812),
        // border
        shadowColor: '#000',
        shadowOpacity: 0.16,
        shadowOffset: { width: 0, height: RFValue(3, 812) },
    },
    modalProgressShared: {
        backgroundColor: '#F1EBDF',
    },
    modalHeader: {
        alignSelf: 'flex-end',
    },
    modalContent: {
        flexGrow: 1,
        justifyContent: 'space-between',
        marginLeft: RFValue(26, 812),
        marginRight: RFValue(26, 812),
        marginTop: RFValue(16, 812),
        marginBottom: RFValue(26, 812),
        alignItems: 'stretch',
    },
    modalTextAreaContainer: {
        height: RFValue(161, 812),
        borderRadius: RFValue(10, 812),
        backgroundColor: '#F1EBDF',
        padding: RFValue(15, 812),
    },
    modalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: RFValue(36, 812),
    },
    modalSocialMedia: {
        justifyContent: 'space-around'
    },
    overlay: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.5,
        zIndex: 1,
        backgroundColor: '#D5D5D5',
    },
    overlayHidden: {
        display: 'none',
    },
    progressSharedMessageContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    progressSharedMessage: {
        textAlign: 'center',
    },
});