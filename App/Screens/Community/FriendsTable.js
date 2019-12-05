import React from "react";
import {ScrollView, TouchableOpacity, View} from "react-native";
import FriendRow from "./FriendRow";
import {TabViewStyles} from "../../Styles/MainStyles";

class FriendsTable extends React.Component {

    getFriendsTable() {
        const {friends} = this.props;
        let table = [];
        if (friends != null) {
            for (let i = 0; i < friends.length; i++) {
                const friend = friends[i];
                const entryItem =
                    <TouchableOpacity key={i}
                                      onPress={() => {this.props.navigation.navigate('FriendProfile', {"username": friend.username, "name": friend.name})}}>
                        <FriendRow
                            profileImg={friend.profileImg}
                            name={friend.name}
                            city={friend.city}
                            isOnline={friend.isOnline}
                        />
                    </TouchableOpacity>;
                table.push(entryItem);
            }
        }
        return table;
    }

    render() {
        return (
            <ScrollView>
                <View style={TabViewStyles.tabScene}>
                    {this.getFriendsTable()}
                </View>
            </ScrollView>
        );
    }
}

export default FriendsTable;
