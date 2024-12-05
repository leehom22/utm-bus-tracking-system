
//calculate distance
 function getDistance(lat1,lon1,lat2,lon2) {
  const toRad = (value) => {
    return value * Math.PI / 180;
  }
  var R = 6371; // Radius of the earth in km
  var dLat = toRad(lat2-lat1);  // deg2rad below
  var dLon = toRad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c* 1000; // Distance in m
  console.log('answer from getDistance: ',d)
  return d;
}

export function checkProximity(busPosition,busStops) {
  busStops.forEach((stop) => {
    const distance = getDistance(
      busPosition.lat,
      busPosition.lng,
      stop.position.lat,
      stop.position.lng
    );
    console.log('distance: ',distance)

    if (distance <= stop.radius) {
      // Turn the indicator yellow
      updateIndicatorColor(stop.id, "yellow");
      console.log('indicator change to yellow')

    } else {
      // Reset the indicator to its default color
      updateIndicatorColor(stop.id, "default");
      console.log('indicator change to none')
    }
  });
}

 function updateIndicatorColor(stopId, color) {
  const indicator = document.querySelector(`.bus-stop-${stopId}`);
  if (indicator) {
    if (color === "yellow") {
      indicator.style.backgroundColor = "yellow";
      console.log('indicator change to yellow')

    } else {
      indicator.style.backgroundColor = ""; // Default color
      console.log('indicator change to none')

    }
  }
}

 export function updateMarkerPositionDis(position,busStops) {

  console.log('Data from firestore: ',position)
  checkProximity(position,busStops); // Check for proximity to bus stops
}