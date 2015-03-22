angular.module('meterQuest')
.controller('parkingSpotModalCtrl',
function($log, $modalInstance, $scope) {
    $log.debug('entering the parking spot modal with scope: ' + angular.toJson($scope.location));

    $scope.openSpot = function () {
        $modalInstance.close($scope.selected);
    };

    $scope.parkInSpot = function () {
        $modalInstance.close($scope.selected);
    };

    $scope.confirmOpenSpot = function () {
        $modalInstance.close($scope.selected);
    };

    $scope.fullSpot = function () {
        $modalInstance.close($scope.selected);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
