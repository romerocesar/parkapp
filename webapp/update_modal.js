angular.module('meterQuest').controller('UpdateModalCtrl', function ($scope, $modal, $log) {

  $scope.open = function () {

    var modalInstance = $modal.open({
      templateUrl: 'editModal.html',
      controller: 'UpdateModalInstanceCtrl'
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});

angular.module('meterQuest').controller('UpdateModalInstanceCtrl', function ($scope, $modalInstance) {

  $scope.parkInSpot = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.confirmOpenSpot = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.fullSpot = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});