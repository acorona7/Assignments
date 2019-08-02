/*                             */
/* Initialize the maps objects */
/*                             */

// Configurations => API keys, etc
let apiKey = "pk.eyJ1IjoiZHJpdmVyYTUzNyIsImEiOiJjanZlZTJieWcwbmlsNDRwbDV1ZHRxdmxnIn0.eZ3XMovyBxLUPfWtg0VPuw";

// Create map
let map = L.map('mapid').setView([51.505, -0.09], 2);

// Add base layer
let graymap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: apiKey
}).addTo(map);

// Use d3 to get earthquake geoJSON data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {

  // Customize colors based on eq magnitude
  function colorByMagnitude(mag) {
    if (mag > 5) {
      return "#ea2c2c";
    } else if (mag > 4) {
      return "#ee9c00";
    } else if (mag > 3) {
      return "#eecc00";
    } else if (mag > 2) {
      return "#33FF99";
    } else if (mag > 1) {
      return "#99CCFF";
    } else {
      return "#98ee00";
    }
  }

  // Function to scale circle radius
  function calculateRadius(mag) {
    if (mag === 0) {
      return 1;
    } else {
      return mag * 3;
    }
  }

  // Geo layer
  L.geoJson(data, {
    // add circles to map
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    // Style circles
    style: function(item) {
      return {
        opacity: 0.5,
        fillOpacity: 0.5,
        fillColor: colorByMagnitude(item.properties.mag),
        color: "#000000",
        radius: calculateRadius(item.properties.mag),
        stroke: true,
        weight: 0.5
      };
    },
    // Add markers with labels to layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Earthquake Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(map);

  // create legend object
  let mapLegend = L.control({ position: "bottomright" });

  // configure legend
  mapLegend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");

    let grades = [0, 1, 2, 3, 4, 5];
    let colors = ["#ea2c2c", "#ee9c00", "#eecc00", "#33FF99", "#99CCFF", "#98ee00"];

    // Looping through our intervals to generate a label with a colored square for each interval.
    for (let i = 0; i < grades.length; i++) {
      div.innerHTML +=
        "<i style='background: " + colors[i] + "'></i> " +
        grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
    }
    return div;
  };

  // Add to map
  mapLegend.addTo(map);
});
