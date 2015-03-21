angular.module('meterQuest', [])
.controller('meterQuestMap', function($log) {

    var map;
    var mapOptions = {
            zoom: 16,
            center: new google.maps.LatLng(47.6097, -122.3331),
            mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    function initialize() {
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
        google.maps.event.addListener(map, "click", function(event) {
            $log.info(event.latLng.lat());
            $log.info(event.latLng.lng());
        });
    };

    initialize();

});
