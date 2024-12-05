const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
const input = document.getElementById("autocomplete");
let autocomplete;
let markers = []; // Move markers outside to avoid scope issues

// Center location for default bounds
const center = { lat: 1.5597497526704713, lng: 103.6347404049601 };

// Create a bounding box with sides ~7km away from the center point
const defaultBounds = {
  north: center.lat + 0.07,
  south: center.lat - 0.07,
  east: center.lng + 0.07,
  west: center.lng - 0.07,
};



export function initAutocomplete() {
  console.log('Places API executed')
  
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 1.5597497526704713, lng: 103.6347404049601 },
    zoom: 13,
    mapTypeId: "roadmap",
  });
  
  // Create the search box and link it to the UI element.
  const input = document.getElementById("autocomplete");
  const searchBox = new google.maps.places.SearchBox(input,{
    bounds: defaultBounds,
    componentRestrictions: { country: "my" },

  });


  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }



      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          title: place.name,
          position: place.geometry.location,
        }),
      );
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

window.initAutocomplete = initAutocomplete;

initAutocomplete()