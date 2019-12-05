import React from "react";
import {Text} from "react-native";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import FriendsTable from "./FriendsTable";
import {MainStyles, TabViewStyles} from "../../Styles/MainStyles";
import PostsTable from "./PostsTable";
import {getFriends} from "../../API/UsersAPIs";
import * as firebase from "firebase";


class CommunityScreen extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'first', title: 'Friends' },
            { key: 'second', title: 'Timeline' },
        ],
        friends: [],
    };

    async componentWillMount() {
        if (this.props.navigation.state.params != null && this.props.navigation.state.params.source === "Progress") {
            // set index to timeline if user goes here after posting his/her progress to timeline
            this.setState({index: 1});
        }
        const username = firebase.auth().currentUser.email;
        const friends = await getFriends(username);
        this.setState({friends: friends});
    }

    renderTabBar = props =>
        <TabBar
            {...props}
            indicatorStyle={TabViewStyles.tabIndicator}
            style={TabViewStyles.tabBar}
            renderLabel={this.renderLabel}
        />;

    renderLabel= ({ route }) => (
            <Text style={[MainStyles.fontNormal, MainStyles.fontRegular,
                (route.key === 'first' && this.state.index === 0) || route.key === 'second' && this.state.index === 1 ?
                    TabViewStyles.activeLabel : TabViewStyles.inactiveLabel]}>
                {route.title}
            </Text>
        );

    render() {
        const {friends} = this.state;
        return (
            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    first: () => <FriendsTable navigation={this.props.navigation} friends={friends}/>,
                    second: () => <PostsTable friends={friends}/>,
                })}
                renderTabBar={this.renderTabBar}
                onIndexChange={index => this.setState({ index })}
                style={TabViewStyles.tabView}
            />
        );
    }
}

export default CommunityScreen;