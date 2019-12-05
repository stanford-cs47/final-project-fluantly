import React from 'react';
import { TouchableOpacity, View } from "react-native";
import { Entypo } from '@expo/vector-icons';

import {createStackNavigator} from "react-navigation-stack";
import Metrics from "../Themes/Metrics";
import {MainStyles} from "../Styles/MainStyles";
import HistoryScreen from "../Screens/History/HistoryScreen";
import HistoryDetailScreen from "../Screens/History/HistoryDetailScreen";

const HistoryScreenNavigator = createStackNavigator({
    History: {
        screen: HistoryScreen,
        navigationOptions: ({navigation}) => ({
            title: 'History',
            headerLeft: () => (
                <View style={MainStyles.navigationLeftMargin}>
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <Entypo name="menu" size={Metrics.icons.medium}/>
                    </TouchableOpacity>
                </View>
            ),
        }),
    },
    HistoryDetail: {
        screen: HistoryDetailScreen,
        navigationOptions: ({navigation}) => ({
            // TODO with name ?
            title: 'Feedback',
        }),
    }
}, {
    headerMode: 'float',
    initialRouteName: 'History'
});

export default HistoryScreenNavigator
