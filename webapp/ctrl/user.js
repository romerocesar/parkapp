angular.module('meterQuest')
  .controller('userCtrl', function($log, $scope, userSvc) {
    $scope.currentUser = userSvc.getUser();
    $scope.toggleUser = function() {
      userSvc.toggleUser();
      $scope.currentUser = userSvc.getUser();
    };
  });
