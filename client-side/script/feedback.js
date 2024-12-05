import { showNews } from "./news.js";
import { showBusRoute } from "./location.js";
import { toogle } from "./main.js";
import { db } from "./firestore.js";
import {  collection, addDoc,serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
//firestore

let finalRating=``;
let finalComment=``;
let dataComment=''; //comment to store to database
let isFeedbackVisible=false;
export function showFeedback(openClose=isFeedbackVisible) {
  isFeedbackVisible=openClose

  function closeFeedback(){
    document.querySelector('.js-feedback-cancel').addEventListener('click',()=>{
      showFeedback(false)
    })
  }
  if(isFeedbackVisible===true){

     let feedback = `
  
    <div class="feedback">
      <img class="feedback-cancel js-feedback-cancel" src="./image/cancel-feedback.svg">
      <div class="grid-feedback">
        <div class="instruction">Please rate your experience with this website</div>
        <div class="div-star">
          <span class="star js-star" data-star-id="1">★</span>

          <span class="star js-star" data-star-id="2">★</span>

          <span class="star js-star" data-star-id="3">★</span>

          <span class="star js-star" data-star-id="4">★</span>

          <span class="star js-star" data-star-id="5">★</span>

        </div>
        <button class="submit-button js-submit-button">Submit</button>
      </div>
     </div> 
    `

    document.querySelector('.js-feedback').innerHTML = feedback;

    let stars=document.querySelectorAll('.js-star');

stars.forEach((star)=>{
  
  star.addEventListener('click',(event)=>{
    console.log('star was clicked')
    const starId=event.currentTarget.dataset.starId;
  
    ratingStars(starId);
    
    function ratingStars(starId){
      const selectedstar=document.querySelector('js.star');
      let cls=``
      remove();
      for (let i = 0; i < starId; i++) {
        if (starId == 1) cls = "one";
        else if (starId == 2) cls = "two";
        else if (starId == 3) cls = "three";
        else if (starId == 4) cls = "four";
        else if (starId == 5) cls = "five";
        stars[i].className =  "star " + cls;
        finalRating=cls;
    }
    return finalRating;
    }
    
    function remove() {
      stars.forEach(star => {
          star.className = "star"; // Reset class to default
      });
  }
  })
   
  
})

//submit star rating to show comment tab
    document.querySelector('.js-submit-button').addEventListener('click', async() => {
      if(finalRating){
        let comment = `
        <div class="feedback">
          <div class="grid-comment-feedback">
            
            <div class="instruction-2">
              Help us to provide better service to you :
            </div>
      
            <input class="textbox js-textbox" type="text" placeholder="Comment">
      
            <button class="submit-button js-submit-comment-button">Submit</button>
          </div>
        </div>
          `
        
      if (feedback) {
        document.querySelector('.js-feedback').innerHTML = comment;

        finalComment=document.querySelector('.js-textbox').innerHTML;

        console.log('finalComment: ',finalComment)
        document.querySelector('.js-submit-comment-button').addEventListener('click',()=>{

          const textbox=document.querySelector('.js-textbox');

          dataComment=textbox.value;
          console.log('comment: ',textbox.value)

          if (db){
            console.log('successfully setup firestore')
          }else{
            console.log('fail to setup firestore')
          }

          async function storeData(){
            const feedbackRef=await addDoc(collection(db,'feedback'),{
              dataComment,
              finalRating,
              timestamp:serverTimestamp()
            }) 
            if(feedbackRef){
              console.log('data store to firestore')
            }else{
              console.log('fail to store data to firestore')
            }
          } 
          storeData();

          if(textbox.value){
            const submitComment=`
            <div class="feedback">
      
            <img class="feedback-cancel-last js-feedback-cancel" src="./image/cancel-feedback.svg">   
            <div class="thanks-submit">Thanks for your feedback </div>
  
            </div>
          `
          if(comment){
            document.querySelector('.js-feedback').innerHTML = submitComment;
          }
          
          }else{
            alert('The comment box cannot be empty')
          }
   
          closeFeedback();
        })
      } 

      
      }else{
        alert('please rate us!')
      }


  //submit comment to show thank you bar

    })
    

    closeFeedback();
    return true
  }
  else if(isFeedbackVisible===false){
    document.querySelector('.js-feedback').innerHTML = ``;

    return false
  }
}

/*feedback.js*/
const clickElement=document.querySelector('.js-feedback-img');
const placeElement= document.querySelector('.js-feedback');

toogle(clickElement,placeElement,showFeedback,showBusRoute,showNews);


