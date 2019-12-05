import {StyleSheet} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const CommunityScreenStyles = StyleSheet.create({
    // friends
    friendRow: {
        // size
        width: '100%',
        // flex
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#707070',
    },
    friendProfileImg: {
        width: RFValue(48, 812),
        height: RFValue(48, 812),
        borderRadius: RFValue(24, 812),
        marginRight: RFValue(16, 812),
        marginTop: RFValue(12, 812),
        marginBottom: RFValue(12, 812),
    },
    friendInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexGrow: 1,
    },
    friendStatus: {
        textTransform: 'uppercase',
    },
    friendStatusOffline: {
        color: '#D5D5D5',
    },

    // timeline
    postRow: {
        // size
        width: '100%',
        // flex
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: RFValue(26, 812),
    },
    postProfileImage: {
        width: RFValue(48, 812),
        height: RFValue(48, 812),
        borderRadius: RFValue(24, 812),
        marginRight: RFValue(11, 812),
    },
    postContainer: {
        flex: 1,
        marginTop: RFValue(6, 812),
        marginBottom: RFValue(6, 812),
    },
    postItem: {
        marginBottom: RFValue(18, 812),
    },
    postLike: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: RFValue(6, 812),
    },
    postLikeIcon: {
        color: '#ED8C72',
        marginRight: RFValue(6, 812),
    },
    postLikeCount: {
        color: '#ED8C72',
    },
    postComment: {
        alignItems: 'stretch',
    },
    postCommentIcon: {
        color: '#2F496E',
        marginRight: RFValue(6, 812),
    },
    postCommentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: RFValue(6, 812),
    },
    postCommentRowHeader: {
        color: '#2F496E',
        marginRight: RFValue(6, 812),
    },
    postCommentRowText: {
        color: '#2F496E',
    },
});
