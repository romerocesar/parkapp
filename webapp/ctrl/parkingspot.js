angular.module('meterQuest')
.controller('parkingSpotModalCtrl',
function($log, $modalInstance, $scope, parkingSpotSvc) {
    $log.debug('entering the parking spot modal with scope: ' + angular.toJson($scope.location));

    $scope.openSpot = function () {
        parkingSpotSvc.markSpot($scope.location.lat, $scope.location.lon);
        $modalInstance.close($scope.selected);
    };

    $scope.parkInSpot = function () {
        parkingSpotSvc.parkInSpot($scope.location.lat, $scope.location.lon);
        $modalInstance.close($scope.selected);
    };

    $scope.confirmOpenSpot = function () {
        $modalInstance.close($scope.selected);
    };

    $scope.fullSpot = function () {
        parkingSpotSvc.reportFullSpot($scope.location.lat, $scope.location.lon);
        $modalInstance.close($scope.selected);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
