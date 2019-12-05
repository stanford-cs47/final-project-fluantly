import firestore from "../../firebase";
import {
    getField
} from "./util";

const USE_REAL_API = true; // change to `false` when needed


async function getPractice(username) {
    if (USE_REAL_API) {
        // return practice data
        try {
            let progressRef = firestore.collection('practice').doc(username);
            const doc = await progressRef.get();
            if (!doc.exists) {
                console.log('No such practice document for', username);
                return null;
            } else {
                return doc.data();
            }
        } catch (err) {
            console.log(err);
            return [];
        }
    } else {
        const data = require('../MockData/Practice');
        const users = getField(data, "practice");
        return getField(users, username);
    }
}

async function getProgress(username) {
    // for ProgressScreen
    // return list of weekly progress
    try {
        const practice = await getPractice(username);
        return getField(practice, "progress");
    } catch (err) {
        console.log(err);
        return [];
    }
}

async function getRecording(username) {
    // for HistoryScreen
    // return list of recordings
    try {
        const practice = await getPractice(username);
        return getField(practice, "recordings");
    } catch (err) {
        console.log(err);
        return [];
    }
}

export {
    getPractice,
    getProgress,
    getRecording
}
