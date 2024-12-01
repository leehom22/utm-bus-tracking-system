import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { setLogLevel } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

setLogLevel("debug");

const firebaseConfig = {
  apiKey: "AIzaSyCboB1zkwOfNWQkkRqi8l9A9HoNhMBHTgY",
  authDomain: "lofty-chemist-442412-f9.firebaseapp.com",
  projectId: "lofty-chemist-442412-f9",
  storageBucket: "lofty-chemist-442412-f9.firebasestorage.app",
  messagingSenderId: "672389647219",
  appId: "1:672389647219:web:391489d3967ea780edd306",
  measurementId: "G-GY87RY7G96"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//Initialize Firebase Authentication

const auth = getAuth(app);



try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}

try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Alan",
    middle: "Mathison",
    last: "Turing",
    born: 1912
  });

  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}

const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});


