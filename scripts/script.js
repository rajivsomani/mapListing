var app = (function(){
	var markers = [], infoWindows = [];
// First, create an object containing LatLng and population for each city.
var citymap = {
  delhi: {
    center: {lat: 28.6, lng: 77.2},
    population: 11000000
  },
  mumbai: {
    center: {lat: 19.07, lng: 72.87},
    population: 13000000
  },
  chennai: {
    center: {lat: 13.08, lng: 80.27},
    population: 6500000
  },
  kolkatta: {
    center: {lat: 22.57, lng: 88.36},
    population: 6000000
  }
};
var selectedCity;

function initMap() {
  selectedCity = document.querySelector("#city").value;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: citymap[selectedCity].center
  });
  setMarkers(map);
  document.getElementById('submit').addEventListener('click', function() {
	selectedCity = document.querySelector("#city").value;
    map.setCenter(citymap[selectedCity].center);
	
	setMarkers(map);
  });
  
}

// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
var localListing = {"delhi":[
  ['Loc 1', 28.6, 77.274856, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et diam suscipit, accumsan erat ac, ultrices odio. Suspendisse tempor ante non risus varius, at blandit neque lobortis. Donec sollicitudin sapien et scelerisque ornare. Proin tristique elementum nisl, at tincidunt magna ornare et.', 4],
  ['Loc 2', 28.62, 77.259052, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et diam suscipit, accumsan erat ac, ultrices odio. Suspendisse tempor ante non risus varius, at blandit neque lobortis. Donec sollicitudin sapien et scelerisque ornare. Proin tristique elementum nisl, at tincidunt magna ornare et.' , 5],
  ['Loc 3', 28.63, 77.157507, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et diam suscipit, accumsan erat ac, ultrices odio. Suspendisse tempor ante non risus varius, at blandit neque lobortis. Donec sollicitudin sapien et scelerisque ornare. Proin tristique elementum nisl, at tincidunt magna ornare et.' , 3],
  ['Loc 4', 28.64, 77.28747820854187, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et diam suscipit, accumsan erat ac, ultrices odio. Suspendisse tempor ante non risus varius, at blandit neque lobortis. Donec sollicitudin sapien et scelerisque ornare. Proin tristique elementum nisl, at tincidunt magna ornare et.' , 2],
  ['loc 5', 28.65, 77.259302, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et diam suscipit, accumsan erat ac, ultrices odio. Suspendisse tempor ante non risus varius, at blandit neque lobortis. Donec sollicitudin sapien et scelerisque ornare. Proin tristique elementum nisl, at tincidunt magna ornare et.' , 1]
],
"mumbai":[
  ['Loc 1', 19.06, 72.874856, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et diam suscipit, accumsan erat ac, ultrices odio. Suspendisse tempor ante non risus varius, at blandit neque lobortis. Donec sollicitudin sapien et scelerisque ornare. Proin tristique elementum nisl, at tincidunt magna ornare et.' , 4],
  ['Loc 2', 19.062, 72.859052, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et diam suscipit, accumsan erat ac, ultrices odio. Suspendisse tempor ante non risus varius, at blandit neque lobortis. Donec sollicitudin sapien et scelerisque ornare. Proin tristique elementum nisl, at tincidunt magna ornare et.' , 5],
  ['Loc 3', 19.063, 72.857507, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et diam suscipit, accumsan erat ac, ultrices odio. Suspendisse tempor ante non risus varius, at blandit neque lobortis. Donec sollicitudin sapien et scelerisque ornare. Proin tristique elementum nisl, at tincidunt magna ornare et.' , 3],
  ['Loc 4', 19.064, 72.89747820854187, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et diam suscipit, accumsan erat ac, ultrices odio. Suspendisse tempor ante non risus varius, at blandit neque lobortis. Donec sollicitudin sapien et scelerisque ornare. Proin tristique elementum nisl, at tincidunt magna ornare et.' , 2],
  ['loc 5', 19.065, 72.859302, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et diam suscipit, accumsan erat ac, ultrices odio. Suspendisse tempor ante non risus varius, at blandit neque lobortis. Donec sollicitudin sapien et scelerisque ornare. Proin tristique elementum nisl, at tincidunt magna ornare et.' , 1]
],
"chennai":[
  ['Loc 1', 13.06, 80.274856, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et diam suscipit, accumsan erat ac, ultrices odio. Suspendisse tempor ante non risus varius, at blandit neque lobortis. Donec sollicitudin sapien et scelerisque ornare. Proin tristique elementum nisl, at tincidunt magna ornare et.' , 4],
  ['Loc 2', 13.062, 80.259052, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et diam suscipit, accumsan erat ac, ultrices odio. Suspendisse tempor ante non risus varius, at blandit neque lobortis. Donec sollicitudin sapien et scelerisque ornare. Proin tristique elementum nisl, at tincidunt magna ornare et.' , 5],
  ['Loc 3', 13.063, 80.157507, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et diam suscipit, accumsan erat ac, ultrices odio. Suspendisse tempor ante non risus varius, at blandit neque lobortis. Donec sollicitudin sapien et scelerisque ornare. Proin tristique elementum nisl, at tincidunt magna ornare et.' , 3],
  ['Loc 4', 13.064, 80.28747820854187, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et diam suscipit, accumsan erat ac, ultrices odio. Suspendisse tempor ante non risus varius, at blandit neque lobortis. Donec sollicitudin sapien et scelerisque ornare. Proin tristique elementum nisl, at tincidunt magna ornare et.' , 2],
  ['loc 5', 13.065, 80.259302, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et diam suscipit, accumsan erat ac, ultrices odio. Suspendisse tempor ante non risus varius, at blandit neque lobortis. Donec sollicitudin sapien et scelerisque ornare. Proin tristique elementum nisl, at tincidunt magna ornare et.' , 1]
],
"kolkatta":[
  ['Loc 1', 22.6, 88.274856, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et diam suscipit, accumsan erat ac, ultrices odio. Suspendisse tempor ante non risus varius, at blandit neque lobortis. Donec sollicitudin sapien et scelerisque ornare. Proin tristique elementum nisl, at tincidunt magna ornare et.' , 4],
  ['Loc 2', 22.62, 88.259052, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et diam suscipit, accumsan erat ac, ultrices odio. Suspendisse tempor ante non risus varius, at blandit neque lobortis. Donec sollicitudin sapien et scelerisque ornare. Proin tristique elementum nisl, at tincidunt magna ornare et.' , 5],
  ['Loc 3', 22.63, 88.157507, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et diam suscipit, accumsan erat ac, ultrices odio. Suspendisse tempor ante non risus varius, at blandit neque lobortis. Donec sollicitudin sapien et scelerisque ornare. Proin tristique elementum nisl, at tincidunt magna ornare et.' , 3],
  ['Loc 4', 22.64, 88.28747820854187, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et diam suscipit, accumsan erat ac, ultrices odio. Suspendisse tempor ante non risus varius, at blandit neque lobortis. Donec sollicitudin sapien et scelerisque ornare. Proin tristique elementum nisl, at tincidunt magna ornare et.' , 2],
  ['loc 5', 22.65, 88.259302, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et diam suscipit, accumsan erat ac, ultrices odio. Suspendisse tempor ante non risus varius, at blandit neque lobortis. Donec sollicitudin sapien et scelerisque ornare. Proin tristique elementum nisl, at tincidunt magna ornare et.' , 1]
]};


function setMarkers(map) {
  // Adds markers to the map.

  // Marker sizes are expressed as a Size of X,Y where the origin of the image
  // (0,0) is located in the top left of the image.

  // Origins, anchor positions and coordinates of the marker increase in the X
  // direction to the right and in the Y direction down.
  var image = {
    url: 'https://google-developers.appspot.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32)
  };
  // Shapes define the clickable region of the icon. The type defines an HTML
  // <area> element 'poly' which traces out a polygon as a series of X,Y points.
  // The final coordinate closes the poly by connecting to the first coordinate.
  var shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
  };
  for (var i = 0; i < localListing[selectedCity].length; i++) {
    var localList = localListing[selectedCity][i];
	var infoWindow = new google.maps.InfoWindow({
    content: localList[3],
    maxWidth: 200
  });
    var marker = new google.maps.Marker({
      position: {lat: localList[1], lng: localList[2]},
      map: map,
      icon: image,
      shape: shape,
      title: localList[0],
      zIndex: localList[4]
    });
	
	infoWindows.push(infoWindow)
	markers.push(marker);
	
	marker.addListener('click', function() {
    infoWindow.open(map, marker);
  });
  }
}

        return {
            start: initMap
        };
})();
