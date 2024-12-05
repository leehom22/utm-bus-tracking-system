import { db } from "../firestore.js";
import {   collection, query, where, getDocs, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

export const busNews=[{
  id:"01",
  title:'UTM Shutle Bus will be provided during convo week',
  date:'6 November 2024',
  time:'4:29pm',
  content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
},{
  id:"02",
  title:'UTM Bus route CP-Stadium',
  date:'11 November 2024',
  time:'10:44am',
  content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
},{
  id:"03",
  title:'Lingkaran Ilmu road maintenance',
  date:'17 November 2024',
  time:'12:34pm',
  content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
}]

async function storeData(news){
  try{
    const newsUpdateRef = collection(db, 'trafficUpdate');

    // Check if the document already exists
    const q = query(newsUpdateRef, where('news', '==', news));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.log('Data already exists in Firestore:', news);
      return; // Exit the function if data exists
    }

    // Add the new data if it doesn't exist
    const newsRef = await addDoc(newsUpdateRef, {
      news,
      timestamp: serverTimestamp(),
    });
    console.log('Data stored to Firestore:', newsRef.id);
  }catch(error){
    console.error('Error storing data to Firestore:', error);
  }
} 
busNews.forEach((news)=>{

  storeData(news);
})
