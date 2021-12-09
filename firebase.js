

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyBOFk0c2ou7xUNbdd1ogQWUX3j-EFplcws",
  authDomain: "todo-app-5b1d6.firebaseapp.com",
  projectId: "todo-app-5b1d6",
  storageBucket: "todo-app-5b1d6.appspot.com",
  messagingSenderId: "27376716362",
  appId: "1:27376716362:web:b094e85be780edc3fd34b3",
  measurementId: "${config.measurementId}"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore()
