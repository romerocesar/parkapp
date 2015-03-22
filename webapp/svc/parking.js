angular.module('meterQuest')
.service('parkingSpotSvc', function($log) {
    return {
        foo: function(lat, lng) {
            $log.debug('parking svc with params: ' + angular.toJson([lat, lng]));
        }
    }
});
