'use strict';

/**
 * @ngdoc directive
 * @name lggApp.directive:award
 * @description
 * # award
 */
angular.module('lggApp')
.controller('ModalAwardCtrl', function ($scope, $modal, $log) {

  $scope.award = {};
  $scope.$on('achieveEarned', function(event, data){
        		
        		var msg = 'Congratulations! You have earned the '+data.name+' award!';
        		$scope.award = msg;
        		$scope.open();
        		
        	});

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'awardModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        award: function () {
          return $scope.award;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
})
.controller('ModalInstanceCtrl', function ($scope, $modalInstance, award) {

  $scope.award = award;
  

  $scope.ok = function () {
    $modalInstance.close($scope.award);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});



/*
  .directive('award', function () {
    return {
      template: '<alert ng-repeat="alert in alerts" type="{{alert.type}}" close="closeAlert($index)">{{alert.msg}}</alert>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      	scope.alerts = [];
        	scope.$on('achieveEarned', function(event, data){
        		
        		var msg = "Congratulations! You have earned the "+data.name+" award!";
        		scope.alerts.push({type:'success', msg: msg });
        		
        	});
        	scope.closeAlert = function(index) {
    			scope.alerts.splice(index, 1);
 			 };
      }
    };
  }); */