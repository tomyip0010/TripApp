var map, counter = 0, resultObj = {},
domObj = {}, transferOption = {BUS: 'directions_bus', TRAIN: 'train', WALK: 'directions_walk', SUBWAY: 'subway', TRAM: 'tram', BOAT: 'directions_boat'};

//initialize the map
function initMap() {
    // Create the map with no initial style specified.
    // It therefore has default styling.
    let map1 = document.getElementsByClassName('map')[0];
    
    map = new google.maps.Map(map1, {
        center: {lat: -33.86, lng: 151.209},
        zoom: 13,
        mapTypeControl: false
    });

    //get the location input
    let from_locat = document.getElementById('from-locat');
    let to_locat = document.getElementById('to-locat');
    let autocomplete = new google.maps.places.Autocomplete(from_locat);
    let autocomplete2 = new google.maps.places.Autocomplete(to_locat);
    autocomplete.bindTo('bounds', map);
    autocomplete2.bindTo('bounds', map);

    //google autocomplete
    let infowindow = new google.maps.InfoWindow();
    let infowindow2 = new google.maps.InfoWindow();
    let marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });
    let marker2 = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function() {
        fillInAddress(autocomplete, map, infowindow, marker)  
    });

    autocomplete2.addListener('place_changed', function() {
        fillInAddress(autocomplete2, map, infowindow2, marker2)  
    });

    //Direction service
    var directionsDisplay = new google.maps.DirectionsRenderer({
        polylineOptions: {
            strokeColor: 'IndianRed',
            geodesic: true,
            strokeWeight: 5
        }
    });
    var directionsService = new google.maps.DirectionsService();

    $(document).on('click', '#trans-add', function() {
        //Self driving request
        counter = 0,
        domObj = {};
        let drive_request = {
            origin: from_locat.value,
            destination: to_locat.value,
            travelMode: 'DRIVING',
            provideRouteAlternatives: true
        };
        let public_request = {
            origin: from_locat.value,
            destination: to_locat.value,
            travelMode: 'TRANSIT',
            transitOptions: {
                modes: ['BUS','RAIL','SUBWAY','TRAIN','TRAM'],
                routingPreference: 'LESS_WALKING'
            },
            provideRouteAlternatives: true
        }
        let walk_request = {
            origin: from_locat.value,
            destination: to_locat.value,
            travelMode: 'WALKING',
            provideRouteAlternatives: true
        }
        calcRoute(drive_request, directionsDisplay, directionsService)
        calcRoute(public_request, directionsDisplay, directionsService)
        calcRoute(walk_request, directionsDisplay, directionsService)
    })

    //Show routes when hovering/click the description
    //driving
    $(document).on('click', '.drive', function() {
        let route_num = parseInt($(this).attr("num"));
        directionsDisplay.setDirections(resultObj.DRIVING);
        directionsDisplay.setRouteIndex(route_num);
        
        //show details
        $('#transport-detail-list-group').addClass('show-detail');
        let dom = document.getElementsByClassName('transport-detail');
        let toBeReomve = document.getElementById('my-detail')

        dom[0].removeChild(toBeReomve);
        dom[0].appendChild(domObj.DRIVING[route_num]);
    })
    $(document).on('mouseover', '.drive', function() {
        let route_num = parseInt($(this).attr("num"));
        directionsDisplay.setDirections(resultObj.DRIVING);
        directionsDisplay.setRouteIndex(route_num);
    })

    //public transport
    $(document).on('click', '.public', function() {
        let route_num = parseInt($(this).attr("num"));
        directionsDisplay.setDirections(resultObj.TRANSIT);
        directionsDisplay.setRouteIndex(route_num);

        //show details
        $('#transport-detail-list-group').addClass('show-detail');
        let dom = document.getElementsByClassName('transport-detail');
        let toBeReomve = document.getElementById('my-detail')

        dom[0].removeChild(toBeReomve);
        dom[0].appendChild(domObj.TRANSIT[route_num]);
    })
    $(document).on('mouseover', '.public', function() {
        let route_num = parseInt($(this).attr("num"));
        directionsDisplay.setDirections(resultObj.TRANSIT);
        directionsDisplay.setRouteIndex(route_num);
    })

    //walking
    $(document).on('click', '.walk', function() {
        let route_num = parseInt($(this).attr("num"));
        directionsDisplay.setDirections(resultObj.WALKING);
        directionsDisplay.setRouteIndex(route_num);

        //show details
        $('#transport-detail-list-group').addClass('show-detail');
        let dom = document.getElementsByClassName('transport-detail');
        let toBeReomve = document.getElementById('my-detail')

        dom[0].removeChild(toBeReomve);
        dom[0].appendChild(domObj.WALKING[route_num]);
    })
    $(document).on('mouseover', '.walk', function() {
        let route_num = parseInt($(this).attr("num"));
        directionsDisplay.setDirections(resultObj.WALKING);
        directionsDisplay.setRouteIndex(route_num);
    })

    //Close detail
    $(document).on('click', '.detail-close', function() {
        console.log($('#transport-list-group'));
        $('#transport-detail-list-group').removeClass('show-detail')
    })

    //set google map style
    map.setOptions({styles: styles['retro']});
}
