const APIKEY="https://maps.googleapis.com/maps/api/js?key=AIzaSyBbZGFRbee76UzQiNFn6cSA0Hcyb7K2uh8&loading=async&libraries=places&callback=initMap"
import { search } from "./search.js";
let map;

export function GoogleMap(position,zoom){
  if (!window.google || !google.maps) {
    throw new Error("Google Maps API not loaded");
  }
  if(!map){
     map = new google.maps.Map(document.getElementById("map"), {
      zoom: zoom,
      center: position,
      mapId: "DEMO_MAP_ID",
      });
  }else{
    map.setCenter(position);
    map.setZoom(zoom);
  }
return map
}



export function dynamicMap(bus,openClose){ //show bus route 

  let slatitude =bus.slat;
  let slongitude =bus.slong;
  let elatitude=bus.elat;
  let elongitude=bus.elong;
  
  var start=new google.maps.LatLng(slatitude,slongitude)
  var end =new google.maps.LatLng( elatitude,elongitude ) 
  
  const locations = [{
    title: bus.startingPoint1,
    latitude: slatitude,
    longitude: slongitude
  }, {
    title: bus.startingPoint2,
    latitude: elatitude,
    longitude: elongitude
  }];
  
  if(openClose===true){
    async function initMap() { //Direction: Same in different mode
      let position = start;

      GoogleMap(position,18) 
      map=GoogleMap(position,18);
  
      //Direction API 
      var directionsService = new google.maps.DirectionsService();
      var directionsRenderer = new google.maps.DirectionsRenderer({
        draggable:false,
        map,
      }); //handles display of the polyline and any associated marker Display direction result
    
      directionsRenderer.setMap(map); //Bind with map 

        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    
    
      locations.forEach((location) => {
        // The marker position at the location
        position = { lat: location.latitude, lng: location.longitude };
    
        let marker = new AdvancedMarkerElement({
          map: map,
          position: position,
          title: location.title,
        });
        console.log(position);
      });
      calculateAndDisplayRoute(directionsService, directionsRenderer);
    }
    
    
    function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    //calculate distance and show polyline 
    
    const waypts = [];
    const checkboxArray =
    [bus.wp1, bus.wp2, bus.wp3, bus.wp4, bus.wp5, bus.wp6, bus.wp7, bus.wp8, bus.wp9, bus.wp10, bus.wp11, bus.wp12, bus.wp13, bus.wp14];
    
    for (let i = 0; i < checkboxArray.length; i++) {
        waypts.push({
          location: checkboxArray[i],
          stopover: false,
        });
      
    }
    
    
    directionsService
      .route({
        origin: start,
        destination: end,
        waypoints: waypts,
        optimizeWaypoints: false,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        const status=response.status || "UNKNOWN";
        if(status==="OK"){
          directionsRenderer.setDirections(response);
    
          const route = response.routes[0];
          const summaryPanel = document.getElementById("summary-panel");
      
          summaryPanel.innerHTML = "";
      
          // For each route, display summary information.
          for (let i = 0; i < route.legs.length; i++) {
            const routeSegment = i + 1;
      
            summaryPanel.innerHTML +=
              "<b>Route Segment: " + routeSegment + "</b><br>";
            summaryPanel.innerHTML += route.legs[i].start_address + " to ";
            summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
            summaryPanel.innerHTML += route.legs[i].distance.text + "<br><br>";
          }
        }else{
          console.warn(`Directions request returned status: ${status}`);
          alert(`Route calculation returned status: ${status}`);
        }
  
  
      })
      .catch((e) => window.alert("Directions request failed due to " + e.message));
    }
    
    initMap();
  }
  else if(openClose===false){
    map='';
  }

}

export function initMap(openClose){ //show current location marker (fixed) 

if(openClose===true){

async function initializeMap() {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Initialize the map with the correct center
        GoogleMap(pos,18);
        search(map)

        // Request needed library)

        const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

        // Create and place the marker
        let marker = new AdvancedMarkerElement({
          map:  GoogleMap(pos,18),
          position: pos, // Use the calculated position
          title: "Current Location",
        });

        // Set additional map settings
        marker.setMap(map);
        map.setCenter(pos); // Center the map correctly
        map.setZoom(18);

      },
      (error) => {
        console.error("Error getting current position:", error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
    search(map)

  }
}
initializeMap()
}else if(openClose===false){
map='';
}

}
// Call the function
initMap(true);


