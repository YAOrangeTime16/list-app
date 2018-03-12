import firebase from "firebase";
const config = {
  apiKey: "AIzaSyC3Z9ZIsiIdoKi-YXVniEQ5vljwqeG_MFk",
  authDomain: "list-app-f6838.firebaseapp.com",
  databaseURL: "https://list-app-f6838.firebaseio.com",
  projectId: "list-app-f6838",
  storageBucket: "list-app-f6838.appspot.com",
  messagingSenderId: "189177939471"
};
  firebase.initializeApp(config);

  export default firebase;