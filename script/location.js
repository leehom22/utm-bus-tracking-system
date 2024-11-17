import { showNews } from "./news.js";
import { showFeedback } from "./feedback.js";
import { toogle } from "./main.js";
import { schedule } from "./data/scheduleDB.js";
let isLocationVisible=false;

export function showBusRoute(openClose=isLocationVisible){
  const mainRoute=` 
      <div class="grid-title">
      <div class="title-bus">Bus</div>
      <img class="cancel-route js-cancel-route" src="/image/black-close.svg">
      </div>
    <div class="grid-route">
    </div>
    `
    let route=``;
    let busSchedule=``

    schedule.forEach((schdules)=>{ /*forEach() */
      route+=`
        <div class="bus-route js-bus-${schdules.name}" >${schdules.name}</div>
    `
    

    })

  busSchedule=`
<div class="schedule">
    <div class="direct-route">A1: KP -CP-JLN AMAL- KP</div>
    <div class="estimated-arrival-time js-estimated-1">Estimated arrival time at KP(U5):</div>
    <div class="estimated-arrival-time js-estimated-2">Estimated arrival time at CP:</div>
    <div class="main-schedule">
    <div class="grid-schdule">
      <div class="arrival-time">
        <img class="circle" src="/image/no-fill-circle.svg" >
        <svg class="line" width="800" height="100">
          <line x1="0" y1="50" x2="800" y2="50" stroke="black" stroke-width="2" />
        </svg>          
        <div class="bus-stop">Center Point</div>
      </div>
    </div>
    <div class="grid-schdule">
      <div class="arrival-time">
        <img class="circle" src="/image/no-fill-circle.svg" >
        <svg class="line" width="800" height="100">
          <line x1="0" y1="50" x2="800" y2="50" stroke="black" stroke-width="2" />
        </svg>          
        <div class="bus-stop">Center Point</div>
      </div>
    </div>
    <div class="grid-schdule">
      <div class="arrival-time">
        <img class="circle" src="/image/no-fill-circle.svg" >
        <svg class="line" width="800" height="100">
          <line x1="0" y1="50" x2="800" y2="50" stroke="black" stroke-width="2" />
        </svg>          
        <div class="bus-stop">Center Point</div>
      </div>
    </div>
    <div class="grid-schdule">
      <div class="arrival-time">
        <img class="circle" src="/image/no-fill-circle.svg" >
        <svg class="line" width="800" height="100">
          <line x1="0" y1="50" x2="800" y2="50" stroke="black" stroke-width="2" />
        </svg>          
        <div class="bus-stop">Center Point</div>
      </div>
    </div>
    <div class="grid-schdule">
      <div class="arrival-time">
        <img class="circle" src="/image/no-fill-circle.svg" >
        <svg class="line" width="800" height="100">
          <line x1="0" y1="50" x2="800" y2="50" stroke="black" stroke-width="2" />
        </svg>          
        <div class="bus-stop">Center Point</div>
      </div>
    </div>
    <div class="grid-schdule">
      <div class="arrival-time">
        <img class="circle" src="/image/no-fill-circle.svg" >
        <svg class="line" width="800" height="100">
          <line x1="0" y1="50" x2="800" y2="50" stroke="black" stroke-width="2" />
        </svg>          
        <div class="bus-stop">Center Point</div>
      </div>
    </div>
    <div class="grid-schdule">
      <div class="arrival-time">
        <img class="circle" src="/image/no-fill-circle.svg" >
        <svg class="line" width="800" height="100">
          <line x1="0" y1="50" x2="800" y2="50" stroke="black" stroke-width="2" />
        </svg>          
        <div class="bus-stop">Center Point</div>
      </div>
    </div>
    <div class="grid-schdule">
      <div class="arrival-time">
        <img class="circle" src="/image/no-fill-circle.svg" >
        <svg class="line" width="800" height="100">
          <line x1="0" y1="50" x2="800" y2="50" stroke="black" stroke-width="2" />
        </svg>          
        <div class="bus-stop">Center Point</div>
      </div>
    </div>
    <div class="schedule-bottom">bottom</div>
    </div>
</div>  
<button class="cancel-schedule-button js-cancel-schedule-button">Cancel</button>   
`    
  let busArrivalTime1=`
  <div class="bus-time-table js-bus-time-table-1">  7:15am, 7:45am, 8:15am, 8:45am, 9:15am, No Service, 11:00am, 11:40am, 12:20pm, 1:00pm, 1:40pm, 2:20pm, No Service, 4:00pm, 4:40pm, 5:20pm, 6:00pm. 6:40pm</div>`

  let busArrivalTime2=`  <div class="bus-7:30am, 8:00am, 8:30am, 9:00am, 9:30am, No Service, 11:20am, 12:00pm, 12:40pm, 1:20pm, 2:00pm, 2:40pm, No Service, 3:40pm, 4:20pm, 5:00pm, 5:40pm. 6:20pm 7:00pm</div>`

  isLocationVisible=openClose

  if(isLocationVisible===true){
    const location=document.querySelector('.js-dropout-location');
    location.innerHTML=mainRoute;
    document.querySelector('.grid-route').innerHTML=route

      document.querySelector('.js-cancel-route').addEventListener('click',()=>{
        showBusRoute(false)
      })


      document.querySelector(`.js-bus-A1`).addEventListener('click',()=>{
        location.innerHTML=``
        document.querySelector('.js-dropout-location').innerHTML=busSchedule;
  
        
          function cancelSchdule(){
          document.querySelector('.js-cancel-schedule-button').addEventListener('click',()=>{
            console.log('cancel-button was clicked')
            location.innerHTML=``
            console.log('tab was closed')
          })}
        
        cancelSchdule();
        document.querySelector('.js-estimated-1').addEventListener('click',()=>{
          location.innerHTML=busSchedule+busArrivalTime1
          cancelSchdule();
        })
  
        document.querySelector('.js-estimated-2').addEventListener('click',()=>{
          location.innerHTML=busSchedule+busArrivalTime1
           cancelSchdule();
        })
      })

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