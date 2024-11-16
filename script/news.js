import { showBusRoute } from "./location.js";
import { showFeedback } from "./feedback.js";
import { toogle } from "./main.js";

let isNewsVisible=false
export function showNews(openClose=isNewsVisible) {
  isNewsVisible=openClose
  if(isNewsVisible===true){
    let theNews = `
    <div class="news">
      <div class="news-header">
        What's Happening
      <img class="news-cancel js-cancel-news" src="/image/x-cancel.svg" alt="cancel">
      </div>
      <div class="main-grid-news">
        <div class="grid-news"> 
          <div class="news-title">UTM Shutle will be provided during convo week </div>
          <div class="news-time">6 November 2024 4:29pm GMT+8</div>
          <div class="news-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
          <svg width="500" height="10" xmlns="http://www.w3.org/2000/svg">
            <path d="M -5 10 L 450 10" stroke="black" stroke-width="0.5" fill="none" />
          </svg>
        </div>
  
        <div class="grid-news"> 
          <div class="news-title">UTM Shutle will be provided during convo week </div>
          <div class="news-time">6 November 2024 4:29pm GMT+8</div>
          <div class="news-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
          <svg width="500" height="10" xmlns="http://www.w3.org/2000/svg">
            <path d="M -5 10 L 450 10" stroke="black" stroke-width="0.5" fill="none" />
          </svg>
        </div>
  
        <div class="grid-news"> 
          <div class="news-title">UTM Shutle will be provided during convo week </div>
          <div class="news-time">6 November 2024 4:29pm GMT+8</div>
          <div class="news-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
          <svg width="500" height="10" xmlns="http://www.w3.org/2000/svg">
            <path d="M -5 10 L 450 10" stroke="black" stroke-width="0.5" fill="none" />
          </svg>
        </div>
  
        <div class="grid-news"> 
          <div class="news-title">UTM Shutle will be provided during convo week </div>
          <div class="news-time">6 November 2024 4:29pm GMT+8</div>
          <div class="news-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
          <svg width="500" height="10" xmlns="http://www.w3.org/2000/svg">
            <path d="M -5 10 L 450 10" stroke="black" stroke-width="0.5" fill="none" />
          </svg>
        </div>
  
        <div class="grid-news"> 
          <div class="news-title">UTM Shutle will be provided during convo week </div>
          <div class="news-time">6 November 2024 4:29pm GMT+8</div>
          <div class="news-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
          <svg width="500" height="10" xmlns="http://www.w3.org/2000/svg">
            <path d="M -5 10 L 450 10" stroke="black" stroke-width="0.5" fill="none" />
          </svg>
        </div>
  
        <div class="news-bottom">You reached the bottom</div>
      </div>
    </div>
    `
    document.querySelector('.js-news').innerHTML = theNews;
    document.querySelector('.js-cancel-news').addEventListener('click',()=>{
      showNews(false)
    })
    


    return true;
  }else if(isNewsVisible===false){
    document.querySelector('.js-news').innerHTML = ''

    return false;
  }
  

}


/*News.js*/ 
const clickElement=document.querySelector('.js-news-img');
const placeElement= document.querySelector('.js-news')



toogle(clickElement,placeElement,showNews,showBusRoute,showFeedback);

