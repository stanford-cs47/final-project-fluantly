import React from 'react';
import {Text, StyleSheet, View} from "react-native";
import Carousel from 'react-native-snap-carousel';
import {RecordScreenStyles} from "../../Styles/RecordScreenStyles";
import Recording from "../../Components/Recording";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {Colors} from "../../Themes";
import {GetPromptsForTopic} from "../../API/GetPromptsForTopic";
import {MainStyles} from "../../Styles/MainStyles";




export class RecordDriftScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCard: null,
            prompts: [],
            topic: null,
            isRecording: false
        }
    }

    componentDidMount() {
        const topic = this.props.navigation.getParam('topic');
        this.setState({ topic });
        const prompts = GetPromptsForTopic(topic);
        if (prompts !== []) {
            this.setState({prompts, selectedCard: prompts[0]});
        }
    }


    _renderItem = ({item}) => {
        return (
            <View style={styles.slide}>
                <View style={styles.slideItem}>
                    <Text style={RecordScreenStyles.cardAction}>{ item.action }</Text>
                </View>
                <View style={styles.slideItem}>
                    <Text style={RecordScreenStyles.cardPrompt}>{ item.title }</Text>
                </View>

               <View style={{borderBottomWidth: .5, width: '100%', margin: 10, borderColor: Colors.primaryDark}}/>

                <View style={{...styles.hints}}>
                    <Text style={RecordScreenStyles.cardHints}>{ item.hints[0] }</Text>
                </View>
            </View>
        );};

    render() {
        return (
            <View style={MainStyles.container}>
                <Text style={RecordScreenStyles.textStyle}>Swipe left/right to change prompts.</Text>
                <View style={{flex: 3, margin: RFValue(20, 812), alignItems: 'center', justifyContent: 'center'}}>
                    <Carousel
                        firstItem={0}
                        onSnapToItem={(slideIndex)=> this.setState({selectedCard: this.state.prompts[slideIndex]})}
                        layout={'default'}
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.isRecording ? [this.state.selectedCard] : this.state.prompts}
                        renderItem={this._renderItem}
                        sliderWidth={RFPercentage(70)}
                        itemWidth={RFPercentage(40)}
                        loop={true}
                        removeClippedSubviews={false}
                    />
                </View>

                <Text style={RecordScreenStyles.textStyle}>Record in French</Text>
                <View style={{flex: 2}}>
                    <Recording
                        topic={this.state.topic}
                        prompt={this.state.selectedCard}
                        navigation={this.props.navigation}
                    />
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    slide: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginVertical: '5%',
        height: '90%',
        padding: RFValue(20, 812),
        backgroundColor: Colors.snow,
        // border
        borderRadius: RFValue(12, 812),
        shadowColor: Colors.primaryDark,
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: RFValue(3, 812) },
    },
    slideItem: {
        flex: 1
    },
    hints: {
        backgroundColor: 'white',
        width: '100%'
    }

});