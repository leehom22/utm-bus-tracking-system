import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, addDoc,getDoc,doc,setDoc,updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
//import { setLogLevel } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { GoogleMap } from "./maps.js";

//setLogLevel("debug");
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


const parser = new DOMParser();

const busSvgString=`
<svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9436 1.25H12.0564C13.8942 1.24998 15.3498 1.24997 16.489 1.40314C17.6614 1.56076 18.6104 1.89288 19.3588 2.64124C20.1071 3.38961 20.4392 4.33856 20.5969 5.51098C20.6996 6.27504 20.7334 7.18144 20.7445 8.25H21C21.9665 8.25 22.75 9.0335 22.75 10V11C22.75 11.5508 22.4907 12.0695 22.05 12.4L20.7475 13.3768C20.7402 14.6093 20.7113 15.6375 20.5969 16.489C20.4392 17.6614 20.1071 18.6104 19.3588 19.3588C19.1689 19.5486 18.9661 19.7117 18.75 19.852V21C18.75 21.9665 17.9665 22.75 17 22.75H15.5C14.5335 22.75 13.75 21.9665 13.75 21V20.7445C13.2253 20.75 12.6616 20.75 12.0564 20.75H11.9436C11.3384 20.75 10.7747 20.75 10.25 20.7445V21C10.25 21.9665 9.4665 22.75 8.5 22.75H7C6.0335 22.75 5.25 21.9665 5.25 21V19.852C5.03392 19.7117 4.83112 19.5486 4.64124 19.3588C3.89288 18.6104 3.56076 17.6614 3.40313 16.489C3.28866 15.6375 3.25975 14.6093 3.25246 13.3768L1.95 12.4C1.50934 12.0695 1.25 11.5508 1.25 11V10C1.25 9.0335 2.0335 8.25 3 8.25H3.25546C3.26659 7.18144 3.30041 6.27504 3.40313 5.51098C3.56076 4.33856 3.89288 3.38961 4.64124 2.64124C5.38961 1.89288 6.33855 1.56076 7.51098 1.40314C8.65019 1.24997 10.1058 1.24998 11.9436 1.25ZM3.25 9.75H3C2.86193 9.75 2.75 9.86193 2.75 10V11C2.75 11.0787 2.78705 11.1528 2.85 11.2L3.25 11.5L3.25 9.94359C3.25 9.87858 3.25 9.81405 3.25 9.75ZM4.75573 13.75C4.76662 14.7836 4.79821 15.6082 4.88976 16.2892C5.02502 17.2952 5.27869 17.8749 5.7019 18.2981C6.12511 18.7213 6.70476 18.975 7.71085 19.1102C8.73851 19.2484 10.0932 19.25 12 19.25C13.9068 19.25 15.2615 19.2484 16.2892 19.1102C17.2952 18.975 17.8749 18.7213 18.2981 18.2981C18.7213 17.8749 18.975 17.2952 19.1102 16.2892C19.2018 15.6082 19.2334 14.7836 19.2443 13.75H4.75573ZM19.25 12.25H4.75002C4.75 12.1677 4.75 12.0844 4.75 12V10C4.75 8.1173 4.75155 6.77287 4.88458 5.75H19.1154C19.2484 6.77287 19.25 8.1173 19.25 10V12C19.25 12.0844 19.25 12.1677 19.25 12.25ZM20.75 11.5L21.15 11.2C21.213 11.1528 21.25 11.0787 21.25 11V10C21.25 9.86193 21.1381 9.75 21 9.75H20.75C20.75 9.81405 20.75 9.87858 20.75 9.94359V11.5ZM18.701 4.25C18.5882 4.03672 18.4548 3.85859 18.2981 3.7019C17.8749 3.27869 17.2952 3.02502 16.2892 2.88976C15.2615 2.75159 13.9068 2.75 12 2.75C10.0932 2.75 8.73851 2.75159 7.71085 2.88976C6.70476 3.02502 6.12511 3.27869 5.7019 3.7019C5.54522 3.85859 5.41177 4.03672 5.29896 4.25H18.701ZM6.75 20.4605V21C6.75 21.1381 6.86193 21.25 7 21.25H8.5C8.63807 21.25 8.75 21.1381 8.75 21V20.7042C8.30066 20.6815 7.88845 20.6476 7.51098 20.5969C7.24599 20.5612 6.99242 20.5167 6.75 20.4605ZM15.25 20.7042V21C15.25 21.1381 15.3619 21.25 15.5 21.25H17C17.1381 21.25 17.25 21.1381 17.25 21V20.4605C17.0076 20.5167 16.754 20.5612 16.489 20.5969C16.1116 20.6476 15.6993 20.6815 15.25 20.7042ZM6.25 16C6.25 15.5858 6.58579 15.25 7 15.25H8.5C8.91421 15.25 9.25 15.5858 9.25 16C9.25 16.4142 8.91421 16.75 8.5 16.75H7C6.58579 16.75 6.25 16.4142 6.25 16ZM14.75 16C14.75 15.5858 15.0858 15.25 15.5 15.25H17C17.4142 15.25 17.75 15.5858 17.75 16C17.75 16.4142 17.4142 16.75 17 16.75H15.5C15.0858 16.75 14.75 16.4142 14.75 16Z" fill="#d11515"/> </g>

</svg>
`;

const busSvg=parser.parseFromString(
  busSvgString,
  "image/svg+xml",
).documentElement;


let dynamicCurrentLocation=``;

let map;
// Declare watchID outside the function scope to persist across calls
let watchID = null; 

export function currentLocation(openClose) {
  if (openClose === true) {
    if (watchID !== null) {
      console.log("Already watching position.");
      return; // Prevent multiple watchPosition calls if already active
    }
    function showPosition(position) {
      return position;
    }
    let currentLocation=navigator.geolocation.getCurrentPosition(showPosition)
    GoogleMap(currentLocation,17);

setInterval(() => {
      // Function to handle location updates
      async function handlePosition(position) {
        try {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
  
          dynamicCurrentLocation = pos;
          console.log(`Latitude: ${pos.lat}, Longitude: ${pos.lng}`);
  
          // Update Firestore
          //const locationRef = doc(db, 'location', 'currentLocation');
          //await setDoc(locationRef, pos);
  
          //const locationData = await getDoc(locationRef);
          //console.log('User Current Position from Firestore: ', locationData.data());
  
          // Update map with current location
          async function location() {
            const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  
            let marker = new AdvancedMarkerElement({
              map: GoogleMap(dynamicCurrentLocation,17),
              position: dynamicCurrentLocation,
              content: busSvg,
              title: "Current Location",
            });
          }
          location();
        } catch (error) {
          console.error('Error updating Firestore or map: ', error);
        }
      }
  
      // Start watching position
      watchID = navigator.geolocation.watchPosition(
        handlePosition,
        (error) => {
          console.error(`Error watching position: ${error.message}`);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
        }
      );
}, 5000);

    console.log("Started watching position.");
  } else if (openClose === false) {
    // Stop watching position
    if (watchID !== null) {
      navigator.geolocation.clearWatch(watchID);
      console.log("Stopped watching position.");
      watchID = null; // Reset watchID to null
    } else {
      console.log("No active position watcher to stop.");
    }
  }
}

currentLocation(false);