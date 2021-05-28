// import firebase from "@react-native-firebase/app";
import database from "@react-native-firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyDc7mjHk0bCKlR2pO6g9iDJiwyyC1HjWPo",
//   authDomain: "profennador.firebaseapp.com",
//   databaseURL:
//     "https://profennador-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "profennador",
//   storageBucket: "profennador.appspot.com",
//   messagingSenderId: "900444052581",
//   appId: "1:900444052581:web:bbd58a75a65d8721b37a8c",
//   measurementId: "G-9YXFCG9DTD",
// };

// Initialize Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

export const db = database();
