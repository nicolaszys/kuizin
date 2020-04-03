import firebase from 'firebase';


const firebaseConfig = {
  apiKey: 'AIzaSyDKBIk3vbmBfejAHcCItcke4_C6BZsa1vA',
  authDomain: 'kuizin-1c07f.firebaseapp.com',
  databaseURL: 'https://kuizin-1c07f.firebaseio.com',
  projectId: 'kuizin-1c07f',
  storageBucket: 'kuizin-1c07f.appspot.com',
  messagingSenderId: '432368744105',
  appId: '1:432368744105:web:02d87ab50c24988cc91bb8',
  measurementId: 'G-EVSVY65ESR',
};

firebase.initializeApp(firebaseConfig);
export const { auth } = firebase;
export const db = firebase.database();
