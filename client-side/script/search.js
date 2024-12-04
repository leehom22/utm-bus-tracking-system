
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

// Function to initialize autocomplete and map
export function initAutocomplete(map) {
  console.log('Places API executed')
  //const input = document.getElementById("autocomplete");
  if (!input) {
    console.error("Autocomplete input element not found.");
    return;
  }

  // Initialize autocomplete with options
  autocomplete = new google.maps.places.Autocomplete(input, {
    bounds: defaultBounds,
    strictBounds: true,
    componentRestrictions: { country: ["my"] },
    fields: ["address_components", "geometry", "name", "icon"],
  });



  // Add listener for place selection
  autocomplete.addListener("place_changed", () => fillInAddress(map));
}

// Function to handle place selection and fill in address
async function fillInAddress(map) {
  if(!autocomplete){
    console.log('Places API not trigger')
  }
  const place = autocomplete.getPlace();
  if (!place.geometry || !place.geometry.location) {
    console.log("Returned place contains no geometry");
    return;
  }

  // Clear out old markers
  markers.forEach((marker) => marker.setMap(null));
  markers = [];

  // Add a new marker for the selected place
  if(map){
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    const markerContent = document.createElement("div");
  markerContent.innerHTML = `<img src="${place.icon}" alt="${place.name}" style="width:25px; height:25px;">`;

    const icon = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25),
    };

    let marker = new AdvancedMarkerElement({
      map,
      position: place.geometry.location,
      //content:markerContent,
      title: place.name,
    });
    markers.push(marker);
  }else{
    console.log('map is not initialized, marker cannot load   ')
  }


  // Adjust map bounds to fit the new place
  const bounds = new google.maps.LatLngBounds();
  if (place.geometry.viewport) {
    bounds.union(place.geometry.viewport);
  } else {
    bounds.extend(place.geometry.location);
  }
  map.fitBounds(bounds);

  // Fill the input field with the selected address
  let address = "";
  let postcode = "";

  place.address_components.forEach((component) => {
    const componentType = component.types[0];
    switch (componentType) {
      case "street_number":
        address = `${component.long_name} ${address}`;
        break;
      case "route":
        address += component.short_name;
        break;
      case "postal_code":
        postcode = `${component.long_name}${postcode}`;
        break;
    }
  });

  input.value = address;
}

export function search(map){
// Initialize autocomplete after DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  if (!map) {
    console.error("Map is not initialized yet.");
    return;
  }
  initAutocomplete(map);
});

}
