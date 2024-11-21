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
    let busArrivalTime1=``;
    let busArrivalTime2=``;


    schedule.forEach((schdules)=>{ /*forEach() */
      route+=`
        <button class="bus-route js-bus js-bus-${schdules.name}" data-bus-id="${schdules.id}">${schdules.name}</button>
    `
    })

    function showBusStop(matchingBus){
      return busSchedule=`
      <div class="schedule">
          <div class="direct-route">${matchingBus.route}</div>
          <div class="estimated-arrival-time js-estimated-1">Estimated arrival time at ${matchingBus.startingPoint1}:</div>
          <div class="estimated-arrival-time js-estimated-2">Estimated arrival time at ${matchingBus.startingPoint2}:</div>
          <div class="main-schedule">
          <div class="grid-schdule">
            <div class="arrival-time">
              <img class="circle" src="/image/no-fill-circle.svg" >
              <svg class="line" width="800" height="100">
                <line x1="0" y1="50" x2="800" y2="50" stroke="black" stroke-width="2" />
              </svg>          
              <div class="bus-stop">${matchingBus.busStop1}</div>
            </div>
          </div>
          <div class="grid-schdule">
            <div class="arrival-time">
              <img class="circle" src="/image/no-fill-circle.svg" >
              <svg class="line" width="800" height="100">
                <line x1="0" y1="50" x2="800" y2="50" stroke="black" stroke-width="2" />
              </svg>          
              <div class="bus-stop">${matchingBus.busStop2}</div>
            </div>
          </div>
          <div class="grid-schdule">
            <div class="arrival-time">
              <img class="circle" src="/image/no-fill-circle.svg" >
              <svg class="line" width="800" height="100">
                <line x1="0" y1="50" x2="800" y2="50" stroke="black" stroke-width="2" />
              </svg>          
              <div class="bus-stop">${matchingBus.busStop3}</div>
            </div>
          </div>
          <div class="grid-schdule">
            <div class="arrival-time">
              <img class="circle" src="/image/no-fill-circle.svg" >
              <svg class="line" width="800" height="100">
                <line x1="0" y1="50" x2="800" y2="50" stroke="black" stroke-width="2" />
              </svg>          
              <div class="bus-stop">${matchingBus.busStop4}</div>
            </div>
          </div>
          <div class="grid-schdule">
            <div class="arrival-time">
              <img class="circle" src="/image/no-fill-circle.svg" >
              <svg class="line" width="800" height="100">
                <line x1="0" y1="50" x2="800" y2="50" stroke="black" stroke-width="2" />
              </svg>          
              <div class="bus-stop">${matchingBus.busStop5}</div>
            </div>
          </div>
          <div class="grid-schdule">
            <div class="arrival-time">
              <img class="circle" src="/image/no-fill-circle.svg" >
              <svg class="line" width="800" height="100">
                <line x1="0" y1="50" x2="800" y2="50" stroke="black" stroke-width="2" />
              </svg>          
              <div class="bus-stop">${matchingBus.busStop6}</div>
            </div>
          </div>
          <div class="grid-schdule">
            <div class="arrival-time">
              <img class="circle" src="/image/no-fill-circle.svg" >
              <svg class="line" width="800" height="100">
                <line x1="0" y1="50" x2="800" y2="50" stroke="black" stroke-width="2" />
              </svg>          
              <div class="bus-stop">${matchingBus.busStop7}</div>
            </div>
          </div>
          <div class="grid-schdule">
            <div class="arrival-time">
              <img class="circle" src="/image/no-fill-circle.svg" >
              <svg class="line" width="800" height="100">
                <line x1="0" y1="50" x2="800" y2="50" stroke="black" stroke-width="2" />
              </svg>          
              <div class="bus-stop">${matchingBus.busStop8}</div>
            </div>
          </div>
          <div class="schedule-bottom">bottom</div>
          </div>
      </div>  
      <button class="cancel-schedule-button js-cancel-schedule-button">Cancel</button>   
      `    
    }

    function showArrivalTime1(matchingBus){
    return busArrivalTime1=`
    <div class=" js-bus-time-table-1">${matchingBus.point1Time}</div>`
    }
    
    function showArrivalTime2(matchingBus){
     return busArrivalTime2=`<div class="bus-time-table js-bus-time-table-2">${matchingBus.point2Time}</div>`
    }
  

  isLocationVisible=openClose

  if(isLocationVisible===true){
    const location=document.querySelector('.js-dropout-location');
    location.innerHTML=mainRoute;
    document.querySelector('.grid-route').innerHTML=route

      document.querySelector('.js-cancel-route').addEventListener('click',()=>{
        showBusRoute(false)
      })


      document.querySelectorAll(`.js-bus`).forEach((button)=>{
        button.addEventListener('click',(event)=>{
          const busId = event.currentTarget.dataset.busId;
          let matchingBus=``;
          
          schedule.forEach((schdules)=>{
            if(busId===schdules.id){
              matchingBus=schdules;
            }
          })
  
          let busStop=showBusStop(matchingBus);
          let arrivalTime1=showArrivalTime1(matchingBus);
          let arrivalTime2=showArrivalTime2(matchingBus);
  
          location.innerHTML=``
          location.innerHTML=busStop;
          console.log(`this is the the bus id: ${busId}`)
          
            function cancelSchdule(){
            document.querySelector('.js-cancel-schedule-button').addEventListener('click',()=>{
              console.log('cancel-button was clicked')
              location.innerHTML=``
              console.log('tab was closed')
            })}
          
          cancelSchdule();

          const estimated1 = document.querySelector('.js-estimated-1');
          const estimated2 = document.querySelector('.js-estimated-2');
      
          let isTimetable1Visible = false;
          let isTimetable2Visible = false;
                    
          function toggleTimeTable(isTimetable1Visible,isTimetable2Visible) {
            if (isTimetable1Visible) {
                location.innerHTML = busStop + arrivalTime1;
                cancelSchdule();
                console.log('bus stop 1');
            } else if (isTimetable2Visible) {
                location.innerHTML = busStop + arrivalTime2;
                cancelSchdule();
                console.log('bus stop 2');
            } else {
                location.innerHTML = ''; // Clear content if no tab is visible
            }
          }

          estimated1.addEventListener('click', () => {
            console.log('timetable 1 clicked');
            console.log('isTimetable1Visible:', isTimetable1Visible);
            console.log('isTimetable2Visible:', isTimetable2Visible);
            
            isTimetable1Visible = !isTimetable1Visible;
            isTimetable2Visible = false;
            toggleTimeTable(isTimetable1Visible,isTimetable2Visible);
            console.log('isTimetable1Visible:', isTimetable1Visible);
            console.log('isTimetable2Visible:', isTimetable2Visible);
        });
        
        estimated2.addEventListener('click', () => {
            console.log('timetable 2 clicked');
            console.log('isTimetable1Visible:', isTimetable1Visible);
            console.log('isTimetable2Visible:', isTimetable2Visible);
            
            isTimetable2Visible = !isTimetable2Visible;
            isTimetable1Visible = false;
            toggleTimeTable(isTimetable1Visible,isTimetable2Visible);
        });

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

toogle(clickElement,placeElement,showBusRoute,showFeedback,showNews)