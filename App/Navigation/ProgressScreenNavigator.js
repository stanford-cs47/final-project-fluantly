import React from 'react';
import {TouchableOpacity, View} from "react-native";
import { Entypo } from '@expo/vector-icons';

import {createStackNavigator} from "react-navigation-stack";
import Metrics from "../Themes/Metrics";
import ProgressScreen from "../Screens/Progress/ProgressScreen";
import {MainStyles} from "../Styles/MainStyles";

const ProgressScreenNavigator = createStackNavigator({
    Progress: {
        screen: ProgressScreen,
        navigationOptions: ({navigation}) => ({
            title: 'Progress',
            headerLeft: () => (
                <View style={MainStyles.navigationLeftMargin}>
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <Entypo name="menu" size={Metrics.icons.medium}/>
                    </TouchableOpacity>
                </View>
            )
        }),
    },
}, {
    headerMode: 'float',
    initialRouteName: 'Progress'
});

export default ProgressScreenNavigator