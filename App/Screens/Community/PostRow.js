import React from "react";
import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import {CommunityScreenStyles} from "../../Styles/CommunityScreenStyles";
import {MainStyles} from "../../Styles/MainStyles";
import Metrics from "../../Themes/Metrics";
import * as firebase from "firebase";
import {updateLike} from "../../API/PostsAPIs";
import moment from "moment";

class PostRow extends React.Component {

    static getComments(comments) {
        let rows = [];
        for (let i = 0; i < comments.length; i ++) {
            let comment = comments[i];
            let row =
                <View style={CommunityScreenStyles.postCommentRow} key={i}>
                    <Text style={[MainStyles.fontSmall, MainStyles.fontBold, CommunityScreenStyles.postCommentRowHeader]}>{comment.name}:</Text>
                    <Text style={[MainStyles.fontSmall, MainStyles.fontRegular, CommunityScreenStyles.postCommentRowText]}>{comment.text}</Text>
                </View>;
            rows.push(row);
        }
        return rows;
    }

    async handleLike() {
        const {likes, id, loadPost} = this.props;
        const username = firebase.auth().currentUser.email;
        const index = likes.indexOf(username);
        if (index > -1) {
            likes.splice(index, 1);
        } else {
            likes.push(username);
        }
        await updateLike(id, likes);
        await loadPost();
    }

    render() {
        const {name, profileImg, time, text, likes, comments} = this.props;
        const liked = likes.includes(firebase.auth().currentUser.email);
        let timeString = moment(time).fromNow();

        return (
            <View style={CommunityScreenStyles.postRow}>
                <Image
                    style={CommunityScreenStyles.postProfileImage}
                    source={{uri: profileImg}}
                />
                <View style={CommunityScreenStyles.postContainer}>
                    <Text style={[MainStyles.fontListNormal, MainStyles.fontBold, CommunityScreenStyles.postItem]}>{name}</Text>
                    <Text style={[MainStyles.fontListNormal, MainStyles.fontRegular, CommunityScreenStyles.postItem]}>{text}</Text>
                    <Text style={[MainStyles.fontSmall, MainStyles.fontRegular, CommunityScreenStyles.postItem]}>{timeString}</Text>
                    <View style={CommunityScreenStyles.postLike}>
                        <TouchableOpacity onPress={() => this.handleLike()}>
                            <Entypo name={liked ? "heart" : "heart-outlined"} size={Metrics.icons.small} style={CommunityScreenStyles.postLikeIcon}/>
                        </TouchableOpacity>
                        <Text style={[MainStyles.fontSmall, MainStyles.fontRegular, CommunityScreenStyles.postLikeCount]}>{likes.length}</Text>
                    </View>
                    <View style={CommunityScreenStyles.postComment}>
                        <View style={CommunityScreenStyles.postCommentRow}>
                            <MaterialIcons name="message" size={Metrics.icons.small} style={CommunityScreenStyles.postCommentIcon}/>
                            <TextInput
                                placeholder="Say something"
                                placeholderTextColor="grey"
                                multiline={false}
                                allowFontScaling={true}
                                style={[MainStyles.fontSmall, MainStyles.fontRegular]}
                            />
                        </View>
                        {PostRow.getComments(comments)}
                    </View>
                </View>
            </View>
        );
    }
}

export default PostRow;
