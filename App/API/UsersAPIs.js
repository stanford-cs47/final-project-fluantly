import {getField} from "./util";
import firestore from "../../firebase";

const USE_REAL_API = true; // change to `false` when needed

async function getUser(username) {
    // Get users document for username: /users/username
    if (USE_REAL_API) {
        try {
            let userRef = firestore.collection('users').doc(username);
            const doc = await userRef.get();
            if (!doc.exists) {
                console.log('No such users document for', username);
                return null;
            } else {
                return doc.data();
            }
        }
        catch (err) {
            console.log('Error getting document', err);
            return null;
        }
    } else {
        const data = require('../MockData/Users');
        const users = getField(data, "users");
        return getField(users, username);
    }
}


const userInfoAttributes = ["name", "profileImg", "gender", "age", "occupation", "city", "state", "languages", "interests", "isOnline"];

async function getUserInfo(username, attributes=userInfoAttributes) {
    // for ProfileScreen
    try {
        const user = await getUser(username);
        let res = {};
        for (let i = 0; i < attributes.length; i ++) {
            const key = attributes[i];
            res[key] = getField(user, key);
        }
        res["username"] = username;
        return res;
    }
    catch (err) {
        console.log(err);
        return [];
    }
}

async function getUserFriends(username) {
    // return list of friends' usernames
    try {
        const user = await getUser(username);
        return getField(user, "friends");
    }
    catch (err) {
        console.log(err);
        return [];
    }
}

async function getFriends(username) {
    // for CommunityScreen Friends List
    // return list of friends' info
    try {
        const friendsUsernames = await getUserFriends(username);
        const attributes = ["name", "profileImg", "city", "isOnline"];
        let friendInfos = [];
        for (let i = 0; i < friendsUsernames.length; i ++){
            friendInfos.push(await getUserInfo(friendsUsernames[i], attributes));
        }
        return friendInfos;
    }
    catch (err) {
        console.log(err);
        return [];
    }
}

export {getUser, getUserFriends, getUserInfo, getFriends};
