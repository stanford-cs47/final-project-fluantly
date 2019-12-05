import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { createStackNavigator } from 'react-navigation-stack';

import {Metrics} from "../Themes"
import {HomeScreen} from "../Screens/homeScreen";
import {SendDriftScreen} from "../Screens/SendDrift/SendDriftScreen";
import {PickDriftScreen} from "../Screens/PickDrift/PickDriftScreen";
import {ViewDriftScreen} from "../Screens/PickDrift/ViewDriftScreen";
import {FeedbackScreen} from "../Screens/PickDrift/FeedbackScreen";
import {RecordDriftScreen} from "../Screens/SendDrift/RecordDriftScreen";
import {MainStyles} from "../Styles/MainStyles";

const HomeNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: ({navigation}) => ({
            title: 'Home',
            headerLeft: () => (
                <View style={MainStyles.navigationLeftMargin}>
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <Entypo name="menu" size={Metrics.icons.medium}/>
                    </TouchableOpacity>
                </View>
            )
        }),
    },

    SendDrift: {
        screen: SendDriftScreen,
        navigationOptions: () => ({
            title: 'Choose a topic',
        })
    },

    RecordScreen: {
        screen: RecordDriftScreen,
        navigationOptions: ({navigation}) => {
            return {
                title: ((navigation.getParam('topic')).replace(/^\w/, c => c.toUpperCase())).replace('-', c => ' & ')
            }
        }
    },

    PickDrift: {
        screen: PickDriftScreen,
        navigationOptions: () => ({
            title: 'Pick Up Drift Bottle',
        })
    },

    ViewDrift: {
        screen: ViewDriftScreen,
        navigationOptions: () => ({
            title: 'Pick Up Drift Bottle',
        })
    },

    Feedback: {
        screen: FeedbackScreen,
        navigationOptions: () => ({
            title: 'Pick Up Drift Bottle',
        })
    }
}, {
    headerMode: 'float',
    initialRouteName: 'Home'
});

export default HomeNavigator
