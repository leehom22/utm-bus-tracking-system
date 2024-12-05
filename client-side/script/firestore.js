import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection,query,orderBy,limit,getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { GoogleMap } from "./maps.js";
import { initMap } from "./maps.js";
import {  updateMarkerPositionDis } from "./distance.js";
import { busStop_G } from "./data/scheduleDB.js";

//setLogLevel("debug");
  const firebaseConfig = {
//firebaseConfig
  };
 

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

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


let map;
// Declare watchID outside the function scope to persist across calls
let watchID = null; // To store the watchPosition ID
let marker = null; // To store the marker instance
let updateInterval = null; // To store the interval ID for manual refresh
let firestoreData=null;
let locationData=null



export async function currentLocation(openClose) {
 
  if (openClose === true) {

    if (watchID !== null || updateInterval !== null) {
      console.log("Already watching position or interval is active.");
      return; // Prevent multiple calls if already active
    }

    async function initializeMap(position) { //keep
      const map = GoogleMap(position, 17); // Initialize or reuse the map
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
      
      if (!marker) {
        // Create the marker only once
        marker = new AdvancedMarkerElement({
          map: map,
          position: position,
          title: location.title,
          content: busSvg,
        });
      }
    }

    
    function updateMarkerPosition(position) {

      if (!map) {
        // Initialize the map and marker on the first position update
        initializeMap(position);
        console.log('initialize Map')
      } else {
        // Update the marker's position without refreshing the map
        marker.setPosition(position);
        console.log('Set map to new location')
      }
    }

    async function getLatestDataFromBusG1(db) {
      // Reference to the 'BUS-G1' collection
      const collectionRef = collection(db, "BUS-G1");
    
      try {
        // Create a query to get the latest document based on a 'timestamp' field
        const latestDocQuery = query(collectionRef, orderBy("timestamp", "desc"), limit(1));
    
        // Execute the query
        const querySnapshot = await getDocs(latestDocQuery);
    
        querySnapshot.forEach((doc) => {
          console.log(`Document ID: ${doc.id}`);
          console.log(`Latest Data: ${JSON.stringify(doc.data())}`);
          firestoreData=doc.data();
          locationData=firestoreData.dynamicCurrentLocation

        });
      } catch (error) {
        console.error("Error fetching latest document: ", error);
      }
    }

    // Start a periodic log update using setInterval
    updateInterval =  setInterval(async() => {
      await getLatestDataFromBusG1(db);

      if (firestoreData) {
        console.log(
          "Current dynamic location (from database):",
          locationData
        );
        updateMarkerPosition(locationData);
        triggerIndicator(locationData,busStop_G)

        if (marker){
          marker.position=new google.maps.LatLng(locationData.lat,locationData.lng);
          marker.content=busSvg;
        }
        

          console.log("Latitude Type:", typeof locationData.lat);
          console.log("Longitude Type:", typeof locationData.lng);
      } else {
        console.log("No location data yet.");
      }
    }, 5000); // Log current position every 5 seconds

    console.log("Started watching position and interval updates.");
  } else if (openClose === false) {

    if (updateInterval !== null) {
      clearInterval(updateInterval);
      updateInterval = null; // Reset interval ID
      console.log("Stopped interval updates.");
    }
    initMap(true)
  }
}

currentLocation(false);

function triggerIndicator(data,busStop){
  if(firestoreData){
    updateMarkerPositionDis(data,busStop);
    console.log('triggerIndicator execute')
  }else{
    console.log('no data')
  }
}
