angular.module('meterQuest')
.directive('meterQuestMap', function($log, $modal, parkingSpotSvc) {

    // Gets the user's position
    function getUserPosition(success) {

      navigator.geolocation.getCurrentPosition(

        // Success
        function(position) {
          success(position.coords.latitude, position.coords.longitude);
        },

        // Error
        function(err) {

          // Use the default coordinates of Moz
          success(47.6061287, -122.335073);

        }

      );

    }

    var map;

    function reverseGeocode(lat, lng) {
      var latlng = new google.maps.LatLng(lat, lng);
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                element.text(results[1].formatted_address);
            } else {
                element.text('Location not found');
            }
        } else {
            element.text('Geocoder failed due to: ' + status);
        }
      });
    }

    function openModal(scope, lat, lng) {
        $log.debug('Going to open modal with ' + angular.toJson({lat: lat , lng: lng}));
        scope.location = {
            lat: lat,
            lng: lng
        };
        $modal.open({
            templateUrl: 'parkingSpotModal.html',
            controller: 'parkingSpotModalCtrl',
            scope: scope
        }).result.then(function (selectedItem) {
            scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }

    function openNoParkingFoundModal() {
      $modal.open({
        templateUrl: 'noParkingFoundModal.html'
      });
    }

    return {
        link: function(scope, elem, attr) {

            getUserPosition(function(lat, lon) {

              // Define options for the map
              var mapOptions = {
                zoom: 20,
                center: new google.maps.LatLng(lat, lon),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                panControl: false,
                zoomControl: false,
                scaleControl: false
              };

              // Create the map
              map = new google.maps.Map(document.getElementById('map'), mapOptions);

              // Set up the event listener for new parking spots
              google.maps.event.addListener(map, "click", function(event) {
                  var lat = event.latLng.lat();
                  var lng = event.latLng.lng();

                  parkingSpotSvc.getCurbData(lat, lng).then(function(curbs) {

                    if(curbs.length === 0) {
                      openNoParkingFoundModal();
                      return;
                    }

                    var curb = curbs[0];

                    if(curb.category === "No Parking Allowed"
                        || curb.category === "Restricted Parking Zone")
                    {
                      openNoParkingFoundModal();
                      return;
                    }

                    openModal(scope, lat, lng);
                  });

              });

              // Populate the map with markers
              parkingSpotSvc.getMarkedSpots().then(function(response) {
                console.log(response.data[0].lat);

                response.data.forEach(function(spot) {
                  var point = new google.maps.LatLng(spot.lat, spot.lon);
                  var marker = new google.maps.Marker({
                    position: point,
                    map: map,
                    icon: '/images/parky_marker.png'
                  });
                  google.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(map,marker);
                  });

                });

              });

/*
              var kmlUrl = "https://raw.githubusercontent.com/Piera/KML-for-parkapp/master/head.kml";
              var kmlOptions = {
                suppressInfoWindows: true,
                preserveViewport: true,
                map: map
              };

              var kmlLayer = new google.maps.KmlLayer(kmlUrl, kmlOptions);
              kmlLayer.setMap(map);
              console.log(kmlLayer);
              console.log(kmlLayer.url);

              var myLatlng = new google.maps.LatLng(47.6097, -122.3331);
              var marker = new google.maps.Marker({
                  position: myLatlng,
                  map: map,
                  title: 'Hello World!'
              });

              contentString = 'test marker text!'

              var infowindow = new google.maps.InfoWindow({
                  content: contentString
              });

              google.maps.event.addListener(marker, 'click', function() {
                  infowindow.open(map,marker);
              });
              */

          });

        },
        restrict: 'E',
        template: '<div id="map" />'
    };
});
