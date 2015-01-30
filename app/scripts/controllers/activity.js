'use strict';

/**
 * @ngdoc function
 * @name lggApp.controller:ActivityCtrl
 * @description
 * # ActivityCtrl
 * Controller of the lggApp
 */
angular.module('lggApp')
  .controller('ActivityCtrl', function ($scope, activityLogRepository, _, simpleLogin, $routeParams) {
  	$scope.challenge = $routeParams.challengeId;
    $scope.logs = activityLogRepository.getUserLogs(simpleLogin.user.uid, $scope.challenge);

    // provide a method for adding a log
    $scope.addLog = function(newLog) {
      if( newLog ) {
          
         
         newLog.userId = simpleLogin.user.uid;
         activityLogRepository.addLog(newLog, $scope.challenge);
         
      }
    };

    $scope.editActivity = function(log) {
    	if (log) {
    		activityLogRepository.editLog(log);
    	}

    };
  });
