import * as firebase from 'firebase';
import 'firebase/firebase-firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAZCVgFdt8mz0vThWgDiDxE-Ays1hcxs1M",
    authDomain: "fluantly-62c9f.firebaseapp.com",
    databaseURL: "https://fluantly-62c9f.firebaseio.com",
    projectId: "fluantly-62c9f",
    storageBucket: "fluantly-62c9f.appspot.com",
    messagingSenderId: "835680330329",
    appId: "1:835680330329:web:79d282a5226abb80de4748"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

export default firestore;