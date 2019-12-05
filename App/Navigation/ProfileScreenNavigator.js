import React from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { Entypo } from '@expo/vector-icons';

import {createStackNavigator} from "react-navigation-stack";
import Metrics from "../Themes/Metrics";
import ProfileScreen from "../Screens/Profile/ProfileScreen";
import {MainStyles} from "../Styles/MainStyles";

const ProfileScreenNavigator = createStackNavigator({
    Profile: {
        screen: ProfileScreen,
        navigationOptions: ({navigation}) => ({
            title: 'Profile',
            headerLeft: () => (
                <View style={MainStyles.navigationLeftMargin}>
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                        <Entypo name="menu" size={Metrics.icons.medium}/>
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={MainStyles.navigationRightMargin}>
                    <TouchableOpacity>
                        <Text style={[MainStyles.fontNormal]}>Edit</Text>
                    </TouchableOpacity>
                </View>
            ),
        }),
    },
}, {
    headerMode: 'float',
    initialRouteName: 'Profile'
});

export default ProfileScreenNavigator