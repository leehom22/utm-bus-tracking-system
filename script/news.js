import { showBusRoute } from "./location.js";
import { showFeedback } from "./feedback.js";
import { toogle } from "./main.js";
import {busNews} from "./data/newsDB.js"

let isNewsVisible=false
export function showNews(openClose=isNewsVisible) {
  isNewsVisible=openClose
  if(isNewsVisible===true){
    let theNews=``;
    const fixedNews=`
    <div class="news">
      <div class="news-header">
        What's Happening
      <img class="news-cancel js-cancel-news" src="/image/x-cancel.svg" alt="cancel">
      </div>
      <div class="main-grid-news">
       

      </div>
    </div>
    `
    busNews.forEach((busNews)=>{
      theNews+=`
        <div class="grid-news"> 
          <div class="news-title">${busNews.title} </div>
          <div class="news-time">${busNews.date} ${busNews.time} GMT+8</div>
          <div class="news-content">${busNews.content}
          </div>
          <svg width="500" height="10" xmlns="http://www.w3.org/2000/svg">
            <path d="M -5 10 L 450 10" stroke="black" stroke-width="0.5" fill="none" />
          </svg>
        </div>
      `
      console.log(busNews.id)
    })


    document.querySelector('.js-news').innerHTML = fixedNews;
    document.querySelector('.main-grid-news').innerHTML=theNews;
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

