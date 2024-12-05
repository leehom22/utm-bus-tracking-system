import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, addDoc,serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCboB1zkwOfNWQkkRqi8l9A9HoNhMBHTgY",
  authDomain: "lofty-chemist-442412-f9.firebaseapp.com",
  projectId: "lofty-chemist-442412-f9",
  storageBucket: "lofty-chemist-442412-f9.firebasestorage.app",
  messagingSenderId: "672389647219",
  appId: "1:672389647219:web:e87abeaa716428d9edd306",
  measurementId: "G-BZYNWXRTY9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let lat=null;
let lng=null;
let watchID=null;
let firestoreData=null;
let dynamicCurrentLocation=``;

async function TrackingBusLocation(){

if(db){
  console.log('successfully setup firestore')
}else{
  console.log('fail to setup firestore')
}

function updateMarkerPosition(position) {
  const pos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  };

  dynamicCurrentLocation = pos;
  console.log(`Latitude: ${pos.lat}, Longitude: ${pos.lng}`);
}

watchID = 
navigator.geolocation.watchPosition(
updateMarkerPosition,
(error) => {
  console.error(`Error watching position: ${error.message}`);
},
{
  enableHighAccuracy: true,
  maximumAge: 0,
}
);

function displayLocation(){
  let location=
  `
    <div>Latitude: ${dynamicCurrentLocation.lat} </div>
    <div>Longitude: ${dynamicCurrentLocation.lng} </div>
  `

  document.querySelector('.main').innerHTML=location
}

//display current coordinate on screen
setInterval(async() => {
displayLocation()

const locationRef=await addDoc(collection(db,'BUS-G1'),{
  dynamicCurrentLocation,
  timestamp:serverTimestamp()
})
if(locationRef){
  console.log('data store to firestore')
}else{
  console.log('fail to store data to firestore')
}

}, 5000); 



}

TrackingBusLocation()