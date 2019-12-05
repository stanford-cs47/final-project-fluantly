import React from 'react';

import { createAppContainer } from 'react-navigation';
import {createDrawerNavigator, DrawerNavigatorItems} from "react-navigation-drawer";

import HomeNavigator from "./HomeScreenNavigator";
import ProgressScreenNavigator from "./ProgressScreenNavigator";

import {Metrics} from "../Themes";

import { Entypo, Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import CommunityScreenNavigator from "./CommunityScreenNavigator";
import ProfileScreenNavigator from "./ProfileScreenNavigator";
import DrawerComponent from "../Components/DrawerComponent";
import HistoryScreenNavigator from "./HistoryScreenNavigator";
import Colors from "../Themes/Colors";
import { RFValue } from "react-native-responsive-fontsize";

const drawerContentOptions = {
    itemsContainerStyle: {
        marginTop: RFValue(34, 812),
    },
    labelStyle: {
        fontFamily: 'century-gothic-regular',
    },
    itemStyle: {
        fontSize: 17,
        minHeight: RFValue(60, 812),
        paddingHorizontal: RFValue(24, 812),
    },
    activeTintColor: Colors.primary,
    inactiveTintColor: Colors.text,
};


const AppNavigator = createDrawerNavigator({
        HomeNavigator: {
            screen: HomeNavigator,
            navigationOptions: ({navigation}) => ({
                title: 'Explore',
                drawerIcon: () => (<Entypo name="home" size={Metrics.icons.small} />)
            })
        },
        ProgressNavigator: {
            screen: ProgressScreenNavigator,
            navigationOptions: ({navigation}) => ({
                title: 'Progress',
                drawerIcon: () => (<AntDesign name="dashboard" size={Metrics.icons.small} />)
            })
        },
        CommunityNavigator: {
            screen: CommunityScreenNavigator,
            navigationOptions: ({navigation}) => ({
                title: 'Community',
                drawerIcon: () => (<Ionicons name="ios-people" size={Metrics.icons.small} />)
            })
        },
        NotificationsNavigator: {
            screen: HomeNavigator,
            navigationOptions: ({navigation}) => ({
                title: 'Notifications',
                drawerIcon: () => (<Ionicons name="md-notifications" size={Metrics.icons.small} />)
            })
        },
        ProfileNavigator: {
            screen: ProfileScreenNavigator,
            navigationOptions: ({navigation}) => ({
                title: 'Profile',
                drawerIcon: () => (<Ionicons name="ios-contact" size={Metrics.icons.small} />)
            })
        },
        HistoryNavigator: {
            screen: HistoryScreenNavigator,
            navigationOptions: ({navigation}) => ({
                title: 'History',
                drawerIcon: () => (<MaterialIcons name="history" size={Metrics.icons.small} />)
            })
        },
        MessagesNavigator: {
            screen: HomeNavigator,
            navigationOptions: ({navigation}) => ({
                title: 'Messages',
                drawerIcon: () => (<Entypo name="message" size={Metrics.icons.small} />)
            })
        },
        SettingsNavigator: {
            screen: HomeNavigator,
            navigationOptions: ({navigation}) => ({
                title: 'Settings',
                drawerIcon: () => (<AntDesign name="setting" size={Metrics.icons.small} />)
            })
        },
    },
    {
        initialRouteName: 'HomeNavigator',
        drawerWidth: '80%',
        contentComponent: (props) => (<DrawerComponent theProps={props}/>),
        contentOptions: drawerContentOptions,
    });

export default createAppContainer(AppNavigator);
