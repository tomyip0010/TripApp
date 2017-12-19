var map, showDetails;
var markers = [];

//hover location show marker
$(document).on('mouseover', '.list-group-item', function() {
  if (!showDetails){
  clearMarkers()
  addMarker({coords:{lat:parseFloat($(this).find('input[name=lat]').val()),lng:parseFloat($(this).find('input[name=lng]').val())}});    
  };   
})

//mouseout location show all markers
$(document).on('mouseout', '.list-group-item', function() {
  if (!showDetails){showMarkers();};
})

      function initAutocomplete() {
        var item_array = [];
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.8688, lng: 151.2195},
          zoom: 13,
          mapTypeId: 'roadmap'
        });

        // Create the search box and link it to the UI element.
        var input = document.getElementById('from-locat');
        var searchBox = new google.maps.places.SearchBox(input);
        //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();

          $('.detail-controller').css('left', '0');
          
          places.forEach(function(place) {
            if (!place.geometry) {
              window.alert("No details available for input: '" + place.name + "'");
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            var item = place.geometry.location;
            var item_name = place.name;
            var item_lat= place.geometry.location.lat();
            var item_lng= place.geometry.location.lng();
            var item_location = place.formatted_address;
            item_array.push(item_name);

            //alert(item_array.join("\n"));

            $('#transport-list-group').append($(`
                        <div class="row list-group-item">
                        <div class="col-xs-9" >
                        <p>${item_array.slice(-1)[0]}</p>
                        <input type="hidden" name="lat" value=${place.geometry.location.lat()}>
                        <input type="hidden" name="lng" value=${place.geometry.location.lng()}>
                        </div>
                        </div>
                    `))

            //add search result marker to the map       
            addMarker({coords:{lat:item_lat,lng:item_lng}});
                
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

// Adds a marker to the map and push to the array.
function addMarker(props){
  var marker = new google.maps.Marker({
  position:props.coords,
  map:map,
  icon: props.iconurl,
  //icon:props.iconImage
}); 
markers.push(marker);
}
// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}