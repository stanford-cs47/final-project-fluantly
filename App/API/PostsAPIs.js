import firestore from "../../firebase";
import {getField} from "./util";
import {getUserFriends, getUserInfo} from "./UsersAPIs";

const USE_REAL_API = true; // change to `false` when needed

async function getPosts(usernames) {
    // Get posts of certain users: /posts
    // for timeline
    // return list of posts
    if (USE_REAL_API) {
        try {
            let postRef = firestore.collection('posts');
            const snapshot = await postRef.get();
            let posts = [];
            snapshot.forEach(doc => {
                if (doc.exists) {
                    if (usernames.includes(getField(doc.data(), "username"))) {
                        let data = doc.data();
                        data["time"] = getField(getField(data, "time"), "seconds") * 1000;
                        data["id"] = doc.id;
                        posts.push(data)
                    }
                }
            });
            return posts;
        }
        catch (err) {
            console.log('Error getting collection', err);
            return null;
        }
    } else {
        const data = require('../MockData/Posts');
        return getField(data, "posts");
    }
}

async function getTimeline(username, friends) {
    // for timeline
    // return list of posts of the user and his/her friends
    try {
        let postUsernames = await getUserFriends(username);
        postUsernames.push(username);
        let posts = await getPosts(postUsernames);
        const attributes = ["name", "profileImg"];
        let userInfos = {};
        for (let i = 0; i < friends.length; i ++){
            userInfos[getField(friends[i], "username")] = friends[i];
        }
        userInfos[username] = await getUserInfo(username, attributes);
        for (let i = 0; i < posts.length; i ++){
            const currentUsername = getField(posts[i], "username");
            // change post info
            posts[i]["name"] = getField(userInfos[currentUsername], "name");
            posts[i]["profileImg"] = getField(userInfos[currentUsername], "profileImg");
            // change comment info
            const comments = getField(posts[i], "comments");
            for (let j = 0; j < comments.length; j ++) {
                const commentUsername = getField(comments[i], "username");
                posts[i]["comments"][j]["name"] = getField(userInfos[commentUsername], "name");
            }
        }
        return posts;
    }
    catch (err) {
        console.log(err);
        return [];
    }
}

async function updateLike(id, likes) {
    try {
        let postRef = firestore.collection('posts').doc(id);
        // console.log(6, postRef);
        // console.log(7, likes);
        await postRef.update({
            likes: likes
        });
    }
    catch (err) {
        console.log('Error setting collection', err);
        return null;
    }
}

async function createPost(data) {
    try {
        let postRef = firestore.collection('posts');
        await postRef.add(data);
    }
    catch (err) {
        console.log('Error adding document', err);
        return null;
    }
}

export {getPosts, getTimeline, updateLike, createPost}
