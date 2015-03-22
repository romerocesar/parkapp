angular.module('meterQuest')
.directive('meterQuestMap', function($log, parkingSpotSvc) {

    var map;
    var mapOptions = {
        zoom: 16,
        center: new google.maps.LatLng(47.6097, -122.3331),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    return {
        link: function(scope, elem, attr) {
            map = new google.maps.Map(document.getElementById('map'), mapOptions);
            google.maps.event.addListener(map, "click", function(event) {
                var lat = event.latLng.lat();
                var lng = event.latLng.lng();
                parkingSpotSvc.foo(lat, lng).then(function(result) {
                  $log.debug(result);
                });
            });
        },
        restrict: 'E',
        template: '<div id="map" style="width: 700px; height: 700px; margin: 50px;"/>'
    };
});
