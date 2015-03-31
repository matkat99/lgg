'use strict';

/**
 * @ngdoc function
 * @name lggApp.controller:ChallengedetailsCtrl
 * @description
 * # ChallengedetailsCtrl
 * Controller of the lggApp
 */
angular.module('lggApp')
  .controller('ChallengedetailsCtrl', function ($scope, calcProgress, activityLogRepository, challengeRepository, $routeParams, _) {
  	$scope.challenge = challengeRepository.getChallenge($routeParams.challengeId);
  	$scope.challenge.$loaded(function(){
  			$scope.activities = activityLogRepository.getChallengeLogs($routeParams.challengeId);
   			 $scope.activities.$loaded(function(){
    			$scope.detailData = calcProgress.calcForAll($scope.challenge, $scope.activities);
    		});
  	});
    
    


   

  });
