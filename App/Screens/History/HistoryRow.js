import React from "react";
import {Image, Text, View} from "react-native";
import {MainStyles} from "../../Styles/MainStyles";
import {HistoryRowStyles} from "../../Styles/HistoryScreenStyles";
import moment from "moment";

class HistoryRow extends React.Component {
    render() {
        const {topic, prompt, time, status} = this.props.recording;
        const {title} = prompt;
        let statusBlock;
        switch (status) {
            case 1:
                statusBlock =
                    <Image style={HistoryRowStyles.statusImg} source={require('../../../assets/thumbs-up.png')} />;
                break;
            case 2:
                statusBlock =
                    <Image style={HistoryRowStyles.statusImg} source={require('../../../assets/confused.png')} />;
                break;
            default:
                statusBlock =
                    <Text style={[MainStyles.fontSmall, MainStyles.fontRegular, HistoryRowStyles.status]}>
                        Sent
                    </Text>;
        }
        const timeString = moment(time).format('YYYY-MM-DD hh:mm:ss a');

        return (
            <View style={HistoryRowStyles.container}>
                <View style={HistoryRowStyles.row}>
                    <Text style={[MainStyles.fontSmall, MainStyles.fontRegular, HistoryRowStyles.time]}>{timeString}</Text>
                    <View style={HistoryRowStyles.statusContainer}>
                        {statusBlock}
                    </View>
                </View>
                <View>
                    <Text style={[MainStyles.fontListNormal, MainStyles.fontBold, HistoryRowStyles.topic]}>{topic}</Text>
                    <Text style={[MainStyles.fontListNormal, MainStyles.fontRegular, HistoryRowStyles.title]}>{title}</Text>
                </View>
            </View>
        );
    }
}

export default HistoryRow;