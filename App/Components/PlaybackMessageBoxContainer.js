import React from "react";
import {Image, View} from "react-native";
import {PlaybackStyles} from "../Styles/MainStyles";
import PropTypes from 'prop-types';


class PlaybackMessageBoxContainer extends React.Component {
    static propTypes = {
        narrow: PropTypes.bool,
    };

    static defaultProps = {
        narrow: false,
    };

    render() {
        return (
            <View style={[PlaybackStyles.messageBox, this.props.narrow && PlaybackStyles.messageBoxNarrow]}>
                <View style={PlaybackStyles.bottleImageContainer}>
                    <Image style={PlaybackStyles.bottleImage}
                           source={require('../../assets/bottle.png')} />
                </View>
                <View style={PlaybackStyles.content}>
                    {this.props.children}
                </View>
            </View>
        );
    }
}

export default PlaybackMessageBoxContainer;