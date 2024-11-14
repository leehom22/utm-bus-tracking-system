import { showNews } from "./news.js";
import { showFeedback } from "./feedback.js";
import { toogle } from "./news.js";

let isLocationVisible=false;

export function showBusRoute(openClose=isLocationVisible){

  isLocationVisible=openClose

  if(isLocationVisible===true){
    let route=`
    <div class="dropout-location">
      <div class="grid-title">Bus</div>
        <div class="grid-route">
          <div class="bus-route">A1</div>
          <div class="bus-route">A2</div>
          <div class="bus-route">B1</div>
          <div class="bus-route">B2</div>
          <div class="bus-route">B3</div>
          <div class="bus-route">C1</div>
          <div class="bus-route">C2</div>
          <div class="bus-route">C3</div>
          <div class="bus-route">D1</div>
          <div class="bus-route">D2</div>
          <div class="bus-route">E1</div>
          <div class="bus-route">E2</div>
          <div class="bus-route">E3</div>
          <div class="bus-route">F1</div>
          <div class="bus-route">F2</div>
          <div class="bus-route">G1</div>
          <div class="bus-route">G2</div>
          <div class="bus-route">G3</div>
          <div class="bus-route">H</div>
        </div>
    </div>
      `
    
      document.querySelector('.js-dropout-location').innerHTML=route;

      return true;
  }else if(isLocationVisible===false){
    document.querySelector('.js-dropout-location').innerHTML=``;
    return false
  }
}




/* location.js*/
const clickElement=document.querySelector('.js-dropout-img');
const placeElement=document.querySelector('.js-dropout-location')
let isVisible = false;

toogle(clickElement,placeElement,showBusRoute,showFeedback,showNews)