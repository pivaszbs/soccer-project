import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

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
const firebaseMatches = firebaseDB.ref('matches');
const firebasePromotiions = firebaseDB.ref('promotions');

export {
    firebase,
    firebaseMatches,
    firebasePromotiions
}