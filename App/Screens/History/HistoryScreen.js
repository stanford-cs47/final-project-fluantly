import React from "react";
import {Text} from "react-native";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import {MainStyles, TabViewStyles} from "../../Styles/MainStyles";
import * as firebase from "firebase";
import HistoryTable from "./HistoryTable";
import {getRecording} from "../../API/PracticesAPIs";


class HistoryScreen extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'first', title: 'Sent' },
            { key: 'second', title: 'Received' },
        ],
        recordings: [],
    };

    async componentWillMount() {
        if (this.props.navigation.state.params != null && this.props.navigation.state.params.source === "Progress") {
            // set index to timeline if user goes here after posting his/her progress to timeline
            this.setState({index: 1});
        }
        const username = firebase.auth().currentUser.email;
        const recordings = await getRecording(username);
        this.setState({recordings: recordings});
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
        const {recordings} = this.state;
        return (
            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    first: () => <HistoryTable recordings={recordings} navigation={this.props.navigation} />,
                    second: () => <HistoryTable recordings={recordings} navigation={this.props.navigation} />,
                })}
                renderTabBar={this.renderTabBar}
                onIndexChange={index => this.setState({ index })}
                style={TabViewStyles.tabView}
            />
        );
    }
}

export default HistoryScreen;
