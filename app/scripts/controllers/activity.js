'use strict';

/**
 * @ngdoc function
 * @name lggApp.controller:ActivityCtrl
 * @description
 * # ActivityCtrl
 * Controller of the lggApp
 */
angular.module('lggApp')
  .controller('ActivityCtrl', function ($scope, activityLogRepository, _, challengeRepository, simpleLogin, $routeParams, checkAchievements) {
  	$scope.challenge = challengeRepository.getChallenge($routeParams.challengeId);
    $scope.log = {};
    var user = simpleLogin.getProfile();
    $scope.newLog= { count: 1 , date: "", type:""};
    var reset = angular.copy($scope.newLog);
    
        $scope.logs = activityLogRepository.getUserLogs(user.$id, $scope.challenge.$id);
    
   

    // provide a method for adding a log
    $scope.addLog = function(isValid, newLog) {
      if( isValid && newLog ) {
          
         
         newLog.userId = user.$id;
         activityLogRepository.addLog(newLog, $scope.challenge.$id);
         $scope.$emit('logAdded', user.$id); 
         checkAchievements.check($scope.challenge,user, newLog.type);
         $scope.newLog = angular.copy(reset);
         $scope.actForm.$setPristine();
         $scope.actForm.$setValidity();
         
      }
    };

    $scope.editLog = function(log) {
    	if (log) {
    		activityLogRepository.editLog(log);
    	}
      $scope.log = {};
      $('#newModal').modal('hide');
    };

    $scope.getLog = function(item) {
      
        $scope.log = activityLogRepository.getLog(item.$id, $scope.challenge.$id);
        $scope.editLabel = 'Edit';
    }; 

    //date picker methods
 
$scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };
  });
