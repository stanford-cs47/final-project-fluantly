import {StyleSheet} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const HistoryRowStyles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'stretch',
        borderBottomWidth: 1,
        borderColor: '#707070',
        paddingTop: RFValue(16, 812),
        paddingBottom: RFValue(16, 812),
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    time: {
        textTransform: 'uppercase',
    },
    topic: {
        textTransform: 'uppercase',
    },
    title: {
        textTransform: 'capitalize',
    },
    statusContainer: {
        marginLeft: RFValue(21, 812),
    },
    status: {
        textTransform: 'uppercase',
        marginBottom: RFValue(8, 812),
    },
    statusImg: {
        width: RFValue(33, 812),
        height: RFValue(33, 812),
    }
});

const HistoryDetailStyles = StyleSheet.create({
    section: {
        marginBottom: RFValue(20, 812),
    },
    optionsContainer: {
        flexDirection: 'row',
    },
    statusImg: {
        width: RFValue(65, 812),
        height: RFValue(65, 812),
        marginRight: RFValue(14, 812),
    },
    optionList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexShrink: 2,
    },
    optionText: {
        color: '#ED8C72',
        paddingLeft: RFValue(13, 812),
        paddingRight: RFValue(13, 812),
        paddingTop: RFValue(2, 812),
        paddingBottom: RFValue(4, 812),
        marginBottom: RFValue(10, 812),
        marginRight: RFValue(6, 812),
        textTransform: 'lowercase',
        // border
        borderColor: '#ED8C72',
        borderWidth: 1,
        borderRadius: 12,
    },
    comment: {
        color: '#2F496E',
    },
});

export {HistoryRowStyles, HistoryDetailStyles}