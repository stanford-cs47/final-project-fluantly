import {StyleSheet} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const ProfileScreenStyles = StyleSheet.create({
    container: {
        justifyContent: 'space-evenly',
    },
    basicInfoContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        height: RFValue(169, 812),
    },
    profileImg: {
        width: RFValue(96, 812),
        height: RFValue(96, 812),
        borderRadius: RFValue(48, 812),
    },
    name: {
        textAlign: 'center',
    },
    basicInfo: {
        color: '#ED8C72',
    },
    miscInfoContainer: {
        justifyContent: 'space-between',
        height: RFValue(313, 812),
    },
    miscInfoHeader: {
        textTransform: 'uppercase',
        height: RFValue(30, 812),
    },
    row: {
        flexDirection: 'row',
        height: RFValue(30, 812),
        textTransform: 'capitalize',
    },
    buttonGroups: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        width: '48%',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});