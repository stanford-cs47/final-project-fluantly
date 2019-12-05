import React from 'react';
import * as Font from 'expo-font';

import AppNavigation from "./App/Navigation/AppNavigation";
import LoginScreen from "./App/Screens/Auth/LoginScreen";
import firebase from 'firebase';
import {AppLoading} from "expo";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            unsubscribe: null,
            fontLoaded: false
        }
    }

    componentDidMount() {
        // This auto detects whether or not a user is signed in.
        let unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
        this.setState({ unsubscribe });
    }

    componentWillUnmount() {
        this.state.unsubscribe();
    }

    render() {
        if (!this.state.fontLoaded) {
            return (<AppLoading startAsync={fetchFonts} onFinish={() => this.setState({fontLoaded: true})}/>)
        }
        if (this.state.loggedIn) {
            return <AppNavigation />;
        } else {
            return <LoginScreen />;
        }
    }
}

/** Fn is used to retrieve the custom fonts */
const fetchFonts = () => {
    return Font.loadAsync({
        'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'roboto-italic': require('./assets/fonts/Roboto-Italic.ttf'),
        'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
        'century-gothic-bold': require('./assets/fonts/CenturyGothic-Bold.ttf'),
        'century-gothic-italic': require('./assets/fonts/CenturyGothic-Italic.ttf'),
        'century-gothic-regular': require('./assets/fonts/CenturyGothic.ttf'),
        'century-gothic-bold-italic': require('./assets/fonts/CenturyGothic-BoldItalic.ttf'),
    });
};

