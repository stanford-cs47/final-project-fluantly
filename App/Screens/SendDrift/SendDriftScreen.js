import React from 'react';
import {Text, TouchableOpacity, View, Image, ScrollView} from "react-native";
import {SendDriftStyle} from "../../Styles/SendDriftStyle";
import { topics as userTopics} from "../../API/_topics";
import { material } from 'react-native-typography';
import {MainStyles} from "../../Styles/MainStyles";
import {Grid, Row, Col} from "react-native-easy-grid";



export class SendDriftScreen extends React.Component {
    constructor(props) {
        super(props);
        this.populateTopicCards = this.populateTopicCards.bind(this);
        this.state = {
            selectedCard: null
        }
    }

    /* for each of the hard-coded topics, a card is displayed with title,
     * image. On click, show tips/hints. */
    populateTopicCards () {
        let topicCards = [];
        for (let i=0; i<userTopics.length; i+=2) {
            const firstEl = userTopics[i];
            const secondEl = i+1 < userTopics.length ? userTopics[i+1] : null;
            let secondCol = null;
            if (secondEl !== null) {
                secondCol = (
                    <Col style={SendDriftStyle.Cols}>
                        <TouchableOpacity onPress={() => {
                            this.setState({selectedCard: secondEl});
                            this.props.navigation.navigate('RecordScreen', {topic: secondEl.alias});
                        }} key={secondEl._id} style={SendDriftStyle.card}>
                            <View style={SendDriftStyle.topicCardContainer}>
                                <View style={SendDriftStyle.topicCardStyle}>
                                    <Image source={{uri: secondEl.image}} resizeMode={'contain'}
                                           style={{width: '100%', height: '100%', opacity: 0.7}}/>
                                </View>
                                <View style={{flex: 1, height: '40%', justifyContent: 'flex-end', marginBottom: 10}}>
                                    <Text style={SendDriftStyle.cardTextStyle}>{secondEl.title}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Col>
                );
            }
            topicCards.push(
                <Row key={firstEl._id + secondEl._id}>
                    <Col style={SendDriftStyle.Cols}>
                        <TouchableOpacity onPress={() => {
                            this.setState({selectedCard: firstEl});
                            this.props.navigation.navigate('RecordScreen', {topic: firstEl.alias});
                        }} key={firstEl._id} style={SendDriftStyle.card} >
                            <View style={SendDriftStyle.topicCardContainer}>
                                <View style={SendDriftStyle.topicCardStyle}>
                                    <Image source={{uri: firstEl.image}} resizeMode={'contain'} style={{width: '100%', height: '100%', opacity: 0.7}} />
                                </View>
                                <View style={{flex: 1, height: '40%', justifyContent: 'flex-end', marginBottom: 10}}>
                                    <Text style={SendDriftStyle.cardTextStyle}>{firstEl.title}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Col>
                    <Col>{secondCol}</Col>
                </Row>
            )

        };

        return topicCards;
    }

    render() {
        let topicCards = this.populateTopicCards();

        return (
            <ScrollView>
                <View style={[MainStyles.container]}>
                    <Text style={SendDriftStyle.textStyle}>What topic do you want to practice?</Text>
                    <View style={SendDriftStyle.container}>
                        <Grid>
                            {topicCards}
                        </Grid>
                    </View>
                </View>

            </ScrollView>
        );
    }
}