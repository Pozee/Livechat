import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';



var firebaseConfig = {
    apiKey: "AIzaSyALWG_9jb3mn5r-L1p7WBkFaF-HN-VMbj4",
    authDomain: "chatter-88217.firebaseapp.com",
    databaseURL: "https://chatter-88217.firebaseio.com",
    projectId: "chatter-88217",
    storageBucket: "chatter-88217.appspot.com",
    messagingSenderId: "39212651554",
    appId: "1:39212651554:web:b6cdf9d502b3a86568267b"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);


export default firebaseApp;
