// 1 import the plugin
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// This here is for the search bar in the map
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';


// 2 create the function
const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 });
};

const initMapboxgl = () => {
  const mapElement = document.getElementById('map');

  if (mapElement) { // only build a map if there's a div#map to inject into

    // CREATE THE MAP ITSELF
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/pdunleav/cjofefl7u3j3e2sp0ylex3cyb'
    });

    // ADD A SEARCH BAR TO THE MAP
    map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl }));

    
    // CREATE MARKERS
    const markers = JSON.parse(mapElement.dataset.markers);
    markers.forEach((marker) => {
      const popup = new mapboxgl.Popup().setHTML(marker.info_window); // add this to add a pop up
      
      // Create a HTML element for your custom marker
      const element = document.createElement('div');
      element.className = 'marker';
      element.style.backgroundImage = `url('${marker.image_url}')`;
      element.style.backgroundSize = 'contain';
      element.style.width = '25px';
      element.style.height = '25px';

      // Pass the element as an argument to the new marker
      new mapboxgl.Marker(element)
        .setLngLat([marker.lng, marker.lat])
        .setPopup(popup) // add this to add a pop up
        .addTo(map);
    });

    fitMapToMarkers(map, markers)
  }
}

// 3 export the function
export { initMapboxgl }
