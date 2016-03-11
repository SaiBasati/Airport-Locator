var map;

var defaultLat = 39.0919981;
var defaultLng = -94.8593127;
var planeLat;
var planeLng;

var infoWindow = new google.maps.InfoWindow();

function loadMap() {
	var mapOptions = {
		zoom: 5,
		center: new google.maps.LatLng(defaultLat, defaultLng),
		styles: appleStyle
	};
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			airportData[0].lat = position.coords.latitude; airportData[0].lng = position.coords.longitude;
			
		});

	}

	// Get the id of the map container div
	var mapid = document.getElementById('map-container');

	// Create the map
	map = new google.maps.Map(mapid, mapOptions);

	// Create marker for each airport
	for (var i = 0; i < airportData.length; i++) {
		
		var airport = airportData[i];
	if(airport.airport=='Current'){
		airport.iconsize = new google.maps.Size(48,48);
		airport.icon = 'current';
		
		planeLat = airport.lat;
		planeLng = airport.lng;
		//alert(airport.lat);
	} else{
		// Avg percentage
		airport.totalper = (airport.aper + airport.dper) / 2;

		// Total flights
		airport.totalflights = (airport.aop + airport.dop);

		// Set icon size according to total number of flights
		if (airport.totalflights > 10000) {
			airport.iconsize = new google.maps.Size(48,48);
		} else if ((airport.totalflights >= 1000) && (airport.totalflights <=10000)) {
			airport.iconsize = new google.maps.Size(32,32);
		} else {
			airport.iconsize = new google.maps.Size(16,16);
		}

		// Set icon colour according to airport performance
		if (airport.totalper >= 80) {
			airport.icon = 'green';
		} else if ((airport.totalper >= 70) && (airport.totalper < 80)) {
			airport.icon = 'yellow';
		} else if ((airport.totalper >= 60) && (airport.totalper < 70)) {
			airport.icon = 'orange';
		} else {
			airport.icon = 'red';
		}
}
		var newMarker = this.addMarker(airport);
		/*var marker = new google.maps.Marker({
		position: new google.maps.LatLng(airport.lat, airport.lng),
		map: map,
		icon: {
			url: 'img/airplane-' + airport.icon + '.png',
			size: airport.iconsize,
			origin: new google.maps.Point(0,0),
			anchor: new google.maps.Point(16,32),
			scaledSize: airport.iconsize
		},
		title: airport.airport
	});*/
	
		newMarker.airport = airport;
		
		addInfoWindow(newMarker);
		
	var latdiff = Math.abs(Math.round(planeLat))-Math.abs(Math.round(airport.lat));
	var lngdiff = Math.abs(Math.round(planeLng))-Math.abs(Math.round(airport.lng));
	//alert("lat:"+latdiff+" "+airport.code);
	//alert("lng:"+lngdiff+" "+airport.code);
	if(airport.icon == 'green'){
	if(Math.abs(latdiff)>0 && Math.abs(latdiff)<2 && Math.abs(lngdiff)>0 && Math.abs(lngdiff)<2){
		var directionsDisplay = new google.maps.DirectionsRenderer({
                                                                map: map
                                                                        });
                                                                                                 
          // Set destination, origin and travel mode.                                                                  
         var request = {
                        destination: new google.maps.LatLng(airport.lat, airport.lng),
                        origin: new google.maps.LatLng(planeLat, planeLng),
                        travelMode: google.maps.TravelMode.DRIVING
		 };                                                                                        
                                                                                                 
         // Pass the directions request to the directions service.
         var directionsService = new google.maps.DirectionsService();
			directionsService.route(request, function(response, status) {
                                                         if (status == google.maps.DirectionsStatus.OK) {
                                                         // Display the route on the map.
                                                         directionsDisplay.setDirections(response);
                                                         }
                                                       });
		}
		}
	}
}


function addMarker(airport) {

	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(airport.lat, airport.lng),
		map: map,
		icon: {
			url: 'img/airplane-' + airport.icon + '.png',
			size: airport.iconsize,
			origin: new google.maps.Point(0,0),
			anchor: new google.maps.Point(16,32),
			scaledSize: airport.iconsize
		},
		title: airport.airport
	});
	return marker;
}

function addInfoWindow(marker) {

	var details = marker.airport;

	var contentString = '<div class="infowindowcontent">'+
		'<div class="row">' +
		'<p class="total ' + details.icon+'bk">' + Math.round(details.totalper*10)/10 + '%</p>' +
		'<p class="location">' + details.airport.split("(")[0].substring(0,19) + '</p>' +
		'<p class="code">' + details.code +'</p>' +
		'</div>' +
		'<div class="data">' +
		'<p class="tagbelow">Avg On-Time</p>' +
		'<p class="label">Arrivals</p>' +
		'<p class="details">' + details.aper + '% ('+ addCommasToNumber(details.aop) + ')</p>' +
		'<p class="label">Departures</p>' +
		'<p class="details">' + details.dper + '% (' + addCommasToNumber(details.dop) + ')</p>' +
		'<p class="coords">' + details.lat + ', ' + details.lng + '</p>' +
		'</div>' +
		'</div>';

	google.maps.event.addListener(marker, 'click', function(e) {
		infoWindow.close();
		infoWindow.setContent(contentString);
		infoWindow.open(map, marker);
	})
}

function addCommasToNumber(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Load the map triggering the google maps event
google.maps.event.addDomListener(window, 'load', loadMap());
