import React from "react";
import {Image, Text, View} from "react-native";
import {HistoryDetailStyles} from "../../Styles/HistoryScreenStyles";
import {MainStyles} from "../../Styles/MainStyles";
import {Playback} from "../../Components/Playback";
import PlaybackMessageBoxContainer from "../../Components/PlaybackMessageBoxContainer";

class HistoryDetailScreen extends React.Component {

    getFeedback(status) {
        const {options, comment} = this.props.navigation.state.params.recording.feedback;
        return (
            <>
                <View style={[HistoryDetailStyles.section, HistoryDetailStyles.optionsContainer]}>
                    <Image style={HistoryDetailStyles.statusImg}
                           source={status === 1 ? require('../../../assets/thumbs-up-white.png') : require('../../../assets/confused-white.png')} />
                    <View style={HistoryDetailStyles.optionList}>
                        {options.map((prop, key) => {
                            return (
                                <Text key={key} style={[MainStyles.fontSmall, MainStyles.fontRegular, HistoryDetailStyles.optionText]}>{prop}</Text>
                            );
                        })}
                    </View>
                </View>
                <View style={[HistoryDetailStyles.section, HistoryDetailStyles.optionsContainer]}>
                    <Text style={[MainStyles.fontNormal, MainStyles.fontRegular, HistoryDetailStyles.comment]}>{comment}</Text>
                </View>
            </>
        )
    }

    render() {
        const {prompt, status} = this.props.navigation.state.params.recording;
        const {title} = prompt;
        return (
            <View style={MainStyles.container}>
                <PlaybackMessageBoxContainer children={(
                    <>
                        <View style={HistoryDetailStyles.section}>
                            <Text style={[MainStyles.fontNormal, MainStyles.fontRegular]}>You responded to the prompt:</Text>
                        </View>
                        <View style={HistoryDetailStyles.section}>
                            <Text style={[MainStyles.fontNormal, MainStyles.fontRegular]}>Talk about your</Text>
                            <Text style={[MainStyles.fontNormal, MainStyles.fontBold]}>{title}</Text>
                        </View>
                        <View style={HistoryDetailStyles.section}>
                            <Text style={[MainStyles.fontNormal, MainStyles.fontRegular]}>Play my recording</Text>
                            <Playback />
                        </View>
                        {status !== 0 && this.getFeedback(status)}
                    </>
                )} />
            </View>
        );
    }
}

export default HistoryDetailScreen;