import React from "react";
import {Image, Text, View} from "react-native";
import {CommunityScreenStyles} from "../../Styles/CommunityScreenStyles";
import {MainStyles} from "../../Styles/MainStyles";

class FriendRow extends React.Component {
    render() {
        const {profileImg, name, city, isOnline} = this.props;
        const isOnlineString = isOnline ? "online" : "offline";

        return (
            <View style={CommunityScreenStyles.friendRow}>
                <Image
                    style={CommunityScreenStyles.friendProfileImg}
                    source={{uri: profileImg}}
                />
                <View style={CommunityScreenStyles.friendInfoContainer}>
                    <Text style={[MainStyles.fontNormal, MainStyles.fontBold]}>{name}</Text>
                    <Text style={[MainStyles.fontNormal, MainStyles.fontRegular]}>, {city}</Text>
                </View>
                <Text style={[
                        MainStyles.fontNormal,
                        MainStyles.fontRegular,
                        CommunityScreenStyles.friendStatus,
                        !isOnline && CommunityScreenStyles.friendStatusOffline]}>
                    {isOnlineString}
                </Text>
            </View>
        );
    }
}

export default FriendRow;
