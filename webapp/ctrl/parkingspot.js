angular.module('meterQuest')
.controller('parkingSpotModalCtrl',
function($log, $modalInstance, $scope, parkingSpotSvc, userSvc, Notification) {
    $log.debug('entering the parking spot modal with scope: ' + angular.toJson($scope.location));

    $scope.openSpot = function () {
        parkingSpotSvc.markSpot($scope.location.lat, $scope.location.lon, $scope.location.category);
        $modalInstance.close();
        userSvc.addPoints(5);
        Notification.success({ message: "You got 5 points for finding an open spot!" });
    };

    $scope.parkInSpot = function () {
        parkingSpotSvc.parkInSpot($scope.location.lat, $scope.location.lon);
        $modalInstance.close();
    };

    $scope.confirmOpenSpot = function () {
        $modalInstance.close();
        userSvc.addPoints(1);
        Notification.success({ message: "You got 1 point for confirming an open spot." });
    };

    $scope.fullSpot = function () {
        parkingSpotSvc.reportFullSpot($scope.location.lat, $scope.location.lon);
        $modalInstance.close();
        userSvc.addPoints(2);
        Notification.success({ message: "You got 2 points for marking an open spot full." });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
