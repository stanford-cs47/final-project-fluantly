import React from "react";
import {Keyboard, Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {getProgress} from "../../API/PracticesAPIs";
import {ProgressScreenStyles} from "../../Styles/ProgressScreenStyles";
import Metrics from "../../Themes/Metrics";
import {Entypo} from "@expo/vector-icons";
import {MainStyles} from "../../Styles/MainStyles";
import moment from "moment";
import {ProgressBarChart} from "./ProgressBarChart";
import * as firebase from "firebase";
import {createPost} from "../../API/PostsAPIs";


class ProgressScreen extends React.Component {

    state = {
        data: [],
        index: -1,
        currentData: null,
        modalVisible: false,
        progressShared: false,
        progressText: '',
    };

    async componentWillMount() {
        try {
            const data = await getProgress(firebase.auth().currentUser.email);
            data.sort((a, b) => (a.startDate > b.startDate) ? 1 : -1);
            this.setState({
                data: data,
                index: data.length - 1,
                currentData: data.length === 0 ? null : data[data.length - 1],
            })
        }
        catch (err) {
            console.log(err);
        }
    }

    toggleModal(visible) {
        this.setState({ modalVisible: visible });
        if (!visible) {
            this.setState({progressShared: false});
        }
    }

    async postToTimeline() {
        const data = {
            "username": firebase.auth().currentUser.email,
            "text": this.state.progressText,
            "time": firebase.firestore.Timestamp.fromDate(new Date()),
            "likes": [],
            "comments": [],
        };
        await createPost(data);
        this.setState({progressShared: true})
    }

    // utility functions

    changeWeek(goLeft) {
        const {data, index} = this.state;
        let newIndex = index + 1;
        if (goLeft) {
            newIndex = index - 1;
        }
        if (0 <= newIndex && newIndex < data.length) {
            const newCurrentData = data[newIndex];
            this.setState({index: newIndex, currentData: newCurrentData});
        }
    }

    getAvegage() {
        const {currentData} = this.state;
        if (currentData == null) {
            return 0;
        } else {
            let sum = 0;
            let i;
            for (i = 0; i < currentData.data.length; i ++) {
                sum += currentData.data[i];
            }
            return parseInt(sum / currentData.data.length);
        }
    }

    static getWeekStart(dateString) {
        return 'Week of ' + moment(dateString).format('MMM. D');
    }

    // Modal related

    getModal() {
        const preShare = <View style={ProgressScreenStyles.modalContent}>
            <View style={ProgressScreenStyles.modalTextAreaContainer} >
                <TextInput
                    placeholder="Say something"
                    placeholderTextColor="grey"
                    numberOfLines={10}
                    multiline={true}
                    style={[MainStyles.fontNormal, MainStyles.fontRegular]}
                    onChangeText={(text) => this.setState({progressText: text})}
                />
            </View>
            <TouchableOpacity>
                <View style={ProgressScreenStyles.modalRow}>
                    <Text style={[MainStyles.fontNormal, MainStyles.fontRegular]}>Send to Friend</Text>
                    <Entypo name="chevron-small-right" size={Metrics.icons.small} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.postToTimeline()}>
                <View style={ProgressScreenStyles.modalRow}>
                    <Text style={[MainStyles.fontNormal, MainStyles.fontRegular]}>Post to Timeline</Text>
                    <Entypo name="chevron-small-right" size={Metrics.icons.small} />
                </View>
            </TouchableOpacity>
            <View style={ProgressScreenStyles.modalRow}>
                <Text style={[MainStyles.fontNormal, MainStyles.fontRegular]}>Share on</Text>
            </View>
            <View style={[ProgressScreenStyles.modalRow, ProgressScreenStyles.modalSocialMedia]}>
                <TouchableOpacity onPress={() => {}}>
                    <Entypo name="facebook" size={Metrics.icons.medium} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                    <Entypo name="instagram" size={Metrics.icons.medium} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                    <Entypo name="linkedin" size={Metrics.icons.medium} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                    <Entypo name="twitter" size={Metrics.icons.medium} />
                </TouchableOpacity>
            </View>
        </View>;

        const postShare = <View style={ProgressScreenStyles.modalContent}>
            <View style={[ProgressScreenStyles.progressSharedMessageContainer]}>
                <Text style={[MainStyles.fontExtraLarge, MainStyles.fontRegular, ProgressScreenStyles.progressSharedMessage]}>Thank you for sharing your progress!</Text>
            </View>
            <TouchableOpacity onPress={() => {
                this.toggleModal(false);
                this.props.navigation.navigate('Community', {"source": "Progress"});
            }}>
                <View style={ProgressScreenStyles.modalRow}>
                    <Text style={[MainStyles.fontNormal, MainStyles.fontRegular]}>Go to Timeline</Text>
                    <Entypo name="chevron-small-right" size={Metrics.icons.small} />
                </View>
            </TouchableOpacity>
        </View>;

        const {modalVisible} = this.state;

        return (
            <Modal transparent={true} visible={modalVisible} >
                <View style={[ProgressScreenStyles.shareModal, (this.state.progressShared && ProgressScreenStyles.modalProgressShared)]}>
                    <View style={ProgressScreenStyles.modalHeader}>
                        <TouchableOpacity onPress={() => {this.toggleModal(false);}}>
                            <Entypo name="cross" size={Metrics.icons.medium} />
                        </TouchableOpacity>
                    </View>
                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                        {this.state.progressShared ? postShare : preShare}
                    </TouchableWithoutFeedback>
                </View>
            </Modal>
        )
    }

    render() {
        const {data, index, currentData, modalVisible} = this.state;
        const target = currentData == null ? 0 : currentData.target;
        const avg = this.getAvegage();
        const leftArrowDisabled = index < 1;
        const rightArrowDisabled = currentData == null ? true : index >= data.length - 1;
        return (
            <View style={ProgressScreenStyles.container}>
                {this.getModal()}
                <View style={[ProgressScreenStyles.overlay, !modalVisible && ProgressScreenStyles.overlayHidden]} />
                <View style={[MainStyles.container, ProgressScreenStyles.progressContainer]}>
                    <View style={ProgressScreenStyles.row}>
                        <TouchableOpacity onPress={() => this.changeWeek(true)} disabled={leftArrowDisabled}>
                            <Entypo name="chevron-small-left" size={Metrics.icons.large}
                                    style={leftArrowDisabled && ProgressScreenStyles.startDateArrowsDisabled} />
                        </TouchableOpacity>
                        <Text style={[MainStyles.fontLarge, MainStyles.fontRegular, ProgressScreenStyles.startDateText]}>{currentData === null ? '' : ProgressScreen.getWeekStart(currentData.startDate)}</Text>
                        <TouchableOpacity onPress={() => this.changeWeek(false)} disabled={rightArrowDisabled}>
                            <Entypo name="chevron-small-right" size={Metrics.icons.large}
                                    style={rightArrowDisabled && ProgressScreenStyles.startDateArrowsDisabled} />
                        </TouchableOpacity>
                    </View>

                    {currentData && <ProgressBarChart data={currentData.data}/>}

                    <View style={ProgressScreenStyles.goalContainer}>
                        <View style={[ProgressScreenStyles.row, ProgressScreenStyles.goalRow]}>
                            <Text style={[MainStyles.fontNormal, MainStyles.fontBold]}>GOAL</Text>
                            <Text style={[MainStyles.fontLarge, MainStyles.fontRegular, ProgressScreenStyles.goalRowNumber]}>{target}</Text>
                            <Text style={[MainStyles.fontNormal, MainStyles.fontRegular]}> min/day</Text>
                        </View>
                        <View style={[ProgressScreenStyles.row, ProgressScreenStyles.goalRow]}>
                            <Text style={[MainStyles.fontNormal, MainStyles.fontBold]}>THIS WEEK</Text>
                            <Text style={[MainStyles.fontLarge, MainStyles.fontRegular, ProgressScreenStyles.goalRowNumber]}>{avg}</Text>
                            <Text style={[MainStyles.fontNormal, MainStyles.fontRegular]}> min/day</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={MainStyles.buttonFilled} onPress={() => this.toggleModal(true)}>
                        <Text style={[MainStyles.fontNormal, MainStyles.fontRegular, ProgressScreenStyles.shareButtonText]}>Share My Progress</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default ProgressScreen;
