var app = app || {};
app.locationListing = (function(app) {
  "use strict";
  var markers = [],
    infoWindows = [],
    cityCircles = [],
    selectedCity, infowindow, selectedCategory;
  /* reate an object containing LatLng and population for each city. */
  var citymap = {
    delhi: {
      center: {
        lat: 28.65,
        lng: 77.1
      },
      population: 11000000
    },
    mumbai: {
      center: {
        lat: 19.07,
        lng: 72.87
      },
      population: 12000000
    },
    chennai: {
      center: {
        lat: 13.08,
        lng: 80.27
      },
      population: 7000000
    },
    kolkatta: {
      center: {
        lat: 22.57,
        lng: 88.36
      },
      population: 6500000
    }
  };

  /* Data for the markers consisting of a name, a LatLng, description and a zIndex for the
   order in which these markers should display on top of each other.*/
  var localListing = {
    "delhi": {
      "vehicles": [
        ['Loc 1', 28.6, 77.174856, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 4],
        ['Loc 2', 28.52, 77.059052, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 5],
        ['Loc 3', 28.63, 77.157507, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 3],
        ['Loc 4', 28.64, 77.08747820854187, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 2],
        ['loc 5', 28.65, 77.259302, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 1]
      ],
      "real_estate": [
        ['Loc 1', 28.5, 77.274856, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 4],
        ['Loc 2', 28.52, 77.059052, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 5],
        ['Loc 3', 28.53, 77.157507, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 3],
        ['Loc 4', 28.54, 77.18747820854187, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 2],
        ['loc 5', 28.55, 77.159302, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 1]
      ],
      "pet": [
        ['Loc 1', 28.4, 77.274856, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 4],
        ['Loc 2', 28.42, 77.259052, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 5],
        ['Loc 3', 28.53, 77.157507, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 3],
        ['Loc 4', 28.64, 77.18747820854187, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 2],
        ['loc 5', 28.45, 77.159302, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 1]
      ],
      "electronics": [
        ['Loc 1', 28.7, 77.274856, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 4],
        ['Loc 2', 28.72, 77.259052, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 5],
        ['Loc 3', 28.73, 77.157507, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 3],
        ['Loc 4', 28.74, 77.28747820854187, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 2],
        ['loc 5', 28.75, 77.259302, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 1]
      ]
    },
    "mumbai": {
      "vehicles": [
        ['Loc 1', 19.06, 72.874856, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 4],
        ['Loc 2', 19.262, 72.859052, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 5],
        ['Loc 3', 19.163, 72.857507, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 3],
        ['Loc 4', 19.264, 72.89747820854187, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 2],
        ['loc 5', 19.265, 72.859302, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 1]
      ],
      "real_estate": [
        ['Loc 1', 19.08, 72.874856, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 4],
        ['Loc 2', 19.082, 72.859052, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 5],
        ['Loc 3', 19.083, 72.857507, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 3],
        ['Loc 4', 19.084, 72.89747820854187, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 2],
        ['loc 5', 19.085, 72.859302, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 1]
      ],
      "pet": [
        ['Loc 1', 19.07, 72.874856, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 4],
        ['Loc 2', 19.072, 72.859052, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 5],
        ['Loc 3', 19.073, 72.857507, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 3],
        ['Loc 4', 19.074, 72.89747820854187, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 2],
        ['loc 5', 19.075, 72.859302, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 1]
      ],
      "electronics": [
        ['Loc 1', 19.16, 72.874856, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 4],
        ['Loc 2', 19.162, 72.859052, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 5],
        ['Loc 3', 19.163, 72.857507, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 3],
        ['Loc 4', 19.164, 72.89747820854187, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 2],
        ['loc 5', 19.165, 72.859302, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 1]
      ]

    },
    "chennai": {
      "vehicles": [
        ['Loc 1', 13.06, 80.174856, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 4],
        ['Loc 2', 13.062, 80.159052, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 5],
        ['Loc 3', 13.063, 80.257507, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 3],
        ['Loc 4', 13.064, 80.18747820854187, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 2],
        ['loc 5', 13.065, 80.209302, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 1]
      ],
      "real_estate": [
        ['Loc 1', 13.04, 80.274856, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 4],
        ['Loc 2', 13.052, 80.259052, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 5],
        ['Loc 3', 13.053, 80.157507, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 3],
        ['Loc 4', 13.054, 80.28747820854187, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 2],
        ['loc 5', 13.055, 80.259302, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 1]
      ],
      "pet": [
        ['Loc 1', 13.05, 80.274856, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 4],
        ['Loc 2', 13.052, 80.259052, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 5],
        ['Loc 3', 13.043, 80.257507, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 3],
        ['Loc 4', 13.034, 80.18747820854187, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 2],
        ['loc 5', 13.015, 80.259302, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 1]
      ],
      "electronics": [
        ['Loc 1', 13.06, 80.174856, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 4],
        ['Loc 2', 13.062, 80.159052, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 5],
        ['Loc 3', 13.063, 80.157507, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 3],
        ['Loc 4', 13.064, 80.18747820854187, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 2],
        ['loc 5', 13.065, 80.159302, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 1]
      ]
    },
    "kolkatta": {
      "vehicles": [
        ['Loc 1', 22.54, 88.474856, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 4],
        ['Loc 2', 22.59, 88.279052, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 5],
        ['Loc 3', 22.57, 88.357507, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 3],
        ['Loc 4', 22.56, 88.21747820854187, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 2],
        ['loc 5', 22.55, 88.329302, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 1]
      ],
      "real_estate": [
        ['Loc 1', 22.54, 88.274856, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 4],
        ['Loc 2', 22.53, 88.259052, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 5],
        ['Loc 3', 22.51, 88.227507, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 3],
        ['Loc 4', 22.51, 88.28747820854187, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 2],
        ['loc 5', 22.50, 88.259302, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 1]
      ],
      "pet": [
        ['Loc 1', 22.6, 88.354856, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 4],
        ['Loc 2', 22.62, 88.349052, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 5],
        ['Loc 3', 22.63, 88.337507, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 3],
        ['Loc 4', 22.64, 88.32747820854187, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 2],
        ['loc 5', 22.65, 88.319302, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 1]
      ],
      "electronics": [
        ['Loc 1', 22.61, 88.214856, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 4],
        ['Loc 2', 22.60, 88.279052, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 5],
        ['Loc 3', 22.59, 88.357507, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 3],
        ['Loc 4', 22.58, 88.28747820854187, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 2],
        ['loc 5', 22.57, 88.259302, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 1]
      ]
    }
  };


  function codeLatLng(pos) {

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      'latLng': pos
    }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          /* find city name */
          for (var i = 0; i < results[0].address_components.length; i++) {
            for (var b = 0; b < results[0].address_components[i].types.length; b++) {

              /* there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate */
              if (results[0].address_components[i].types[b] == "administrative_area_level_2") {
                /* this is the object you are looking for */
                selectedCity = results[0].address_components[i].long_name.toLowerCase();
                break;
              }
            }
          }

        } else {
          alert("No results found");
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
  }

  function initMap() {
    selectedCity = document.querySelector("#city").value;
    selectedCategory = document.querySelector("#category").value;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: citymap[selectedCity].center
    });
    /*
	if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        //map.setCenter(pos);
        codeLatLng(pos);
      }, function() {
        handleLocationError(true);
      });
    } else {
      //  Browser doesn't support Geolocation
      handleLocationError(false);
    }*/
	
    setMarkers(map);
    document.getElementById('submit').addEventListener('click', function() {
      selectedCity = document.querySelector("#city").value;
      selectedCategory = document.querySelector("#category").value;
      map.setCenter(citymap[selectedCity].center);
      clearCircle();
      clearMarkers();
      setMarkers(map);
    });

  }

  /* Alert geolocation error message*/
  function handleLocationError(browserHasGeolocation) {
      var error = browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.';
      alert(error);
    }
  /* Sets the map on all markers in the array. */
  function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  /* Removes the markers from the map, but keeps them in the array. */
  function clearMarkers() {
    setMapOnAll(null);
  }

  /* Deletes all markers in the array by removing references to them. */
  function deleteMarkers() {
    clearMarkers();
    markers = [];
  }

  /* Sets the map on all circles in the array. */
  function setCircleOnAll(map) {
    for (var i = 0; i < cityCircles.length; i++) {
      cityCircles[i].setMap(map);
    }
  }

  /* Removes the circles from the map, but keeps them in the array. */
  function clearCircle() {
    setCircleOnAll(null);
  }

  /* Adds markers to the map. */
  function setMarkers(map) {

    var image = {
      url: 'images/flag.png',
      /* This marker is 20 pixels wide by 32 pixels high. */
      size: new google.maps.Size(20, 32),
      /* The origin for this image is (0, 0). */
      origin: new google.maps.Point(0, 0),
      /* The anchor for this image is the base of the flagpole at (0, 32). */
      anchor: new google.maps.Point(0, 32)
    };
    /* Shapes define the clickable region of the icon. The type defines an HTML
     <area> element 'poly' which traces out a polygon as a series of X,Y points.
     The final coordinate closes the poly by connecting to the first coordinate. */
    var shape = {
      coords: [1, 1, 1, 20, 18, 20, 18, 1],
      type: 'poly'
    };
    for (var i = 0; i < localListing[selectedCity][selectedCategory].length; i++) {
      var localList = localListing[selectedCity][selectedCategory][i];

      /* Add the circle for this city to the map. */
      var cityCircle = new google.maps.Circle({
        strokeColor: '#00FF00',
        strokeOpacity: 0.2,
        strokeWeight: 2,
        fillColor: '#0000FF',
        fillOpacity: 0.1,
        map: map,
        center: citymap[selectedCity].center,
        radius: Math.sqrt(citymap[selectedCity].population) * 7
      });

      cityCircles.push(cityCircle);

      /* InfoWindow content */
      var content = '<div id="iw-container">' +
        '<div class="iw-title">' + localList[0] + '</div>' +
        '<div class="iw-content">' +
        '<div class="iw-subTitle">Details</div>' +
        '<img src="images/listing_image.jpg" alt="'+localList[0]+'" height="115">' +
        '<p>' + localList[3] + '</p>' +
        '<div class="iw-subTitle">Contacts</div>' +
        '<p>' + selectedCity + '<br>' +
        '<br>Phone. +91 1800 320 600<br>e-mail: mail@mail.com<br></p>' +
        '</div>' +
        '<div class="iw-bottom-gradient"></div>' +
        '</div>';


      infowindow = new google.maps.InfoWindow({
        content: content,
        maxWidth: 350
      });
      var marker = new google.maps.Marker({
        position: {
          lat: localList[1],
          lng: localList[2]
        },
        map: map,
        icon: image,
        shape: shape,
        title: localList[0],
        zIndex: localList[4]
      });

      infoWindows.push(infowindow)
      markers.push(marker);
      (function(infowindow, marker) {
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
      })(infowindow, marker);

      /*
   START INFOWINDOW CUSTOMIZE.
   The google.maps.event.addListener() event expects
  the creation of the infowindow HTML structure 'domready'
   and before the opening of the infowindow, defined styles are applied.
   */
      google.maps.event.addListener(infowindow, 'domready', function() {
        /* Reference to the DIV that wraps the bottom of infowindow */

        var iwOuter = document.getElementsByClassName("gm-style-iw");
        for (var i = 0; i < iwOuter.length; i++) {
          iwOuter[i].previousSibling.style.display = "none";
        }
      });
    }
  }

  return {
    start: initMap
  };
})(app);