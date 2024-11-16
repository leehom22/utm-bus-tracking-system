import { showNews } from "./news.js";
import { showBusRoute } from "./location.js";
import { toogle } from "./main.js";

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
      <img class="feedback-cancel js-feedback-cancel" src="/image/cancel-feedback.svg">
      <div class="grid-feedback">
        <div class="instruction">Please rate your experience with this website</div>
        <div class="div-star">
          <img class="star" src="/image/yellow-star.svg">
          <img class="star" src="/image/yellow-star.svg">
          <img class="star" src="/image/yellow-star.svg">
          <img class="star" src="/image/yellow-star.svg">
          <img class="star" src="/image/white-star.svg">
        </div>
        <button class="submit-button js-submit-button">Submit</button>
      </div>
     </div> 
    `

    document.querySelector('.js-feedback').innerHTML = feedback;

    document.querySelector('.js-submit-button').addEventListener('click', () => {
      let comment = `
    <div class="feedback">
      <div class="grid-comment-feedback">
        
        <div class="instruction-2">
          Help us to provide better service to you :
        </div>
  
        <input class="textbox" type="text" placeholder="Comment">
  
        <button class="submit-button js-submit-comment-button">Submit</button>
      </div>
    </div>
      `
      if (feedback) {
        document.querySelector('.js-feedback').innerHTML = comment;
      }
  
      document.querySelector('.js-submit-comment-button').addEventListener('click',()=>{
        let submitComment=`
          <div class="feedback">
    
          <img class="feedback-cancel-last js-feedback-cancel" src="/image/cancel-feedback.svg">   
          <div class="thanks-submit">Thanks for your feedback </div>

          </div>
        `
        if(comment){
          document.querySelector('.js-feedback').innerHTML = submitComment;
        }
        

        closeFeedback();
      })
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



