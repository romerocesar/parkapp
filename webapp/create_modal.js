angular.module('meterQuest').controller('CreateModalCtrl', function ($scope, $modal, $log) {

  $scope.open = function () {

    var modalInstance = $modal.open({
      templateUrl: 'markOpenModal.html',
      controller: 'CreateModalInstanceCtrl'
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});

angular.module('meterQuest').controller('CreateModalInstanceCtrl', function ($scope, $modalInstance) {

  $scope.openSpot = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});