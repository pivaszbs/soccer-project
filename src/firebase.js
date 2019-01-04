import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyCAzl_qgJBO9cdaoeJwvXzAsNGphivLBEA",
    authDomain: "m-city-6be54.firebaseapp.com",
    databaseURL: "https://m-city-6be54.firebaseio.com",
    projectId: "m-city-6be54",
    storageBucket: "m-city-6be54.appspot.com",
    messagingSenderId: "191556744242"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();

firebaseDB.ref('matches').once('value').then((snapshot)=>{
    console.log(snapshot.val());
})