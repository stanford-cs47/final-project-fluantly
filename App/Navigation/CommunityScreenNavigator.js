import React from 'react';
import {TouchableOpacity, View} from "react-native";
import { Entypo } from '@expo/vector-icons';

import {createStackNavigator} from "react-navigation-stack";
import Metrics from "../Themes/Metrics";
import CommunityScreen from "../Screens/Community/CommunityScreen";
import ProfileScreen from "../Screens/Profile/ProfileScreen";
import {MainStyles} from "../Styles/MainStyles";

const CommunityScreenNavigator = createStackNavigator({
    Community: {
        screen: CommunityScreen,
        navigationOptions: ({navigation}) => ({
            title: 'Community',
            headerLeft: () => (
                <View style={MainStyles.navigationLeftMargin}>
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <Entypo name="menu" size={Metrics.icons.medium}/>
                    </TouchableOpacity>
                </View>
            )
        }),
    },

    FriendProfile: {
        screen: ProfileScreen,
        navigationOptions: ({navigation}) => ({
            title: navigation.state.params.name,
        }),
    },
}, {
    headerMode: 'float',
    initialRouteName: 'Community'
});

export default CommunityScreenNavigator