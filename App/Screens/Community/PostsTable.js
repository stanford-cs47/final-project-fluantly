import React from "react";
import {RefreshControl, ScrollView, View} from "react-native";
import PostRow from "./PostRow";
import * as firebase from "firebase";
import {getTimeline} from "../../API/PostsAPIs";
import {TabViewStyles} from "../../Styles/MainStyles";

class PostsTable extends React.Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        // Bind the this context to the handler function
        this.loadPost = this.loadPost.bind(this);
    }

    state = {
        refreshing: false,
        posts: [],
    };

    async componentDidMount() {
        this._isMounted = true;
        await this.loadPost();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async loadPost() {
        this.setState({refreshing: true});
        const username = firebase.auth().currentUser.email;
        let posts = await getTimeline(username, this.props.friends);
        posts?.sort((a, b) => a.time < b.time ? 1 : -1);
        if (this._isMounted) {
            // const [refreshing, setRefreshing] = React.useState(false);
            // setRefreshing(true);
            this.setState({posts: posts});
            // setRefreshing(false);
            this.setState({refreshing: false});
        }
    }

    getPostsTable() {
        const {posts} = this.state;
        let table = [];
        if (posts != null) {
            for (let i = 0; i < posts.length; i++) {
                const post = posts[i];
                const entryItem =
                    <PostRow
                        key={i}
                        name={post.name}
                        profileImg={post.profileImg}
                        text={post.text}
                        time={post.time}
                        likes={post.likes}
                        comments={post.comments}
                        id={post.id}
                        loadPost={this.loadPost}
                    />;
                table.push(entryItem);
            }
        }
        return table;
    }

    render() {
        return (
            // TODO hide refresh control?
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.loadPost}
                />
            }>
                <View style={TabViewStyles.tabScene}>
                    {this.getPostsTable()}
                </View>
            </ScrollView>
        );
    }
}

export default PostsTable;
