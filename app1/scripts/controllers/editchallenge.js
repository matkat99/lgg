'use strict';

/**
 * @ngdoc function
 * @name lggApp.controller:EditchallengeCtrl
 * @description
 * # EditchallengeCtrl
 * Controller of the lggApp
 */
angular.module('lggApp')
  .controller('EditchallengeCtrl', function ($scope, $location, challengeRepository, _, simpleLogin, achievementRepository, userRepository, $timeout, challengeDataRepository, $routeParams) {
    var challengeId = $routeParams.challengeId;
    if(challengeId === -99) {  //new challenge
    	$scope.editLabel = 'New';
    } else {  //edit challenge
    	$scope.editLabel = 'Edit';
    	
    }
    $scope.newChallenge = {};
    $scope.newChallenge.achievements = {};
    $scope.newChallenge.users = {};
    getFormData();
    

    $scope.addChallenge = function(newChallenge) {
      if( newChallenge && $scope.editLabel === 'New' ) {
        challengeRepository.addChallenge(newChallenge).then(function(ref){
          challengeDataRepository.syncChallenge(challengeRepository.getChallenge(ref.key()));
        });
          
         
         $scope.newChallenge = {};
         $location.path('/challenges');
      } else { $scope.editChallenge(newChallenge); }
    };

    $scope.editChallenge = function(challenge) {
    	if (challenge && $scope.editLabel === 'Edit' ) {
    		challengeRepository.editChallenge(challenge);
        challengeDataRepository.syncChallenge(challenge);
    	} 
    	
    	$scope.newChallenge = {};
    	$location.path('/challenges');
    };

    $scope.cancel = function() {
    	$location.path('/challenges');
    }

    function getFormData() {
    	$scope.users = userRepository.getUsers();
    	$scope.achievements = achievementRepository.getAchieves();
    	if($scope.editLabel === 'Edit') {
    		$scope.newChallenge = challengeRepository.getChallenge(challengeId);
    	}
    	//$scope.editLabel = 'New';

    };

    

    $scope.achieveModelName = function(achieve) {

    	return 'newChallenge.achievement.'+achieve.$id;
    };

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }

    //date picker methods
 $scope.datepickers = {
        startDate: false,
        endDate: false
      }
$scope.open = function($event, which) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.datepickers[which] = true;
  };
  });
