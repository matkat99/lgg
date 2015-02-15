'use strict';

/**
 * @ngdoc function
 * @name lggApp.controller:ChallengedashCtrl
 * @description
 * # ChallengedashCtrl
 * Controller of the lggApp
 */
angular.module('lggApp')
  .controller('ChallengedashCtrl', function ($scope, challengeRepository, simpleLogin, $routeParams, activityLogRepository, checkAchievements, calcProgress, _) {
  	$scope.progress = {};
  	$scope.user = simpleLogin.getProfile();
    $scope.newLog= { count: 1 , date: "", type:""};
    var reset = angular.copy($scope.newLog);
  	$scope.challenge = challengeRepository.getChallenge($routeParams.challengeId);
  	//$scope.challenges = challengeRepository.getUserChallenges($scope.user.uid);
  	$scope.logs = activityLogRepository.getChallengeLogs($scope.challenge.$id);
  	$scope.user.$loaded().then(function(){
        $scope.logs.$loaded().then(function() {
          $scope.progress = calcProgress.calcForOne($scope.user.$id, $scope.challenge, $scope.logs);
          $scope.count = _.size($scope.challenge.users)-1;

        });

    });

    
    
  	$scope.addLog = function(isValid, newLog) {
      if( isValid && newLog ) {
        	
         newLog.userId = simpleLogin.user.uid;
         activityLogRepository.addLog(newLog, $scope.challenge.$id).then(function() {
         	$scope.progess = calcProgress.calcForOne($scope.user.$id, $scope.challenge, $scope.logs);
          checkAchievements.check($scope.challenge,$scope.user, newLog.type);
          $scope.newLog = angular.copy(reset);
         $scope.actForm.$setPristine();
         $scope.actForm.$setValidity();

         });
         //$scope.emit('logAdded', simpleLogin.user.uid);
         


      }
    };


//date picker methods
 
$scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  });
