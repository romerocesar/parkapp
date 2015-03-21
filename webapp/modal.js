angular.module('meterQuest').controller('ModalCtrl', function ($scope, $modal, $log) {

  $scope.open = function () {

    var modalInstance = $modal.open({
      templateUrl: 'markOpenModal.html',
      controller: 'ModalInstanceCtrl'
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});

angular.module('meterQuest').controller('ModalInstanceCtrl', function ($scope, $modalInstance) {

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.openSpot = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});