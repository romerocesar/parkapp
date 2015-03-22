angular.module('meterQuest')
.directive('meterQuestMap', function($log, $modal, parkingSpotSvc) {

    var map;
    var mapOptions = {
        zoom: 16,
        center: new google.maps.LatLng(47.6097, -122.3331),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

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

    return {
        link: function(scope, elem, attr) {
            map = new google.maps.Map(document.getElementById('map'), mapOptions);
            google.maps.event.addListener(map, "click", function(event) {
                var lat = event.latLng.lat();
                var lng = event.latLng.lng();

                openModal(scope, lat, lng);

                parkingSpotSvc.foo(lat, lng).then(function(result) {
                  $log.debug(result);
                });

            });

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

        },
        restrict: 'E',
        template: '<div id="map" style="width: 700px; height: 700px; margin: 50px;"/>'
    };
});
