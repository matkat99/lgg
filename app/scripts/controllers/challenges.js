'use strict';

/**
 * @ngdoc function
 * @name lggApp.controller:ChallengesCtrl
 * @description
 * # ChallengesCtrl
 * Controller of the lggApp
 */
angular.module('lggApp')
  .controller('ChallengesCtrl', function ($scope, challengeRepository, _, simpleLogin, achievementRepository, userRepository, $timeout, challengeDataRepository) {
    $scope.challenges = challengeRepository.getChallenges();
    $scope.newChallenge = {};
    $scope.newChallenge.achievements = {};
    $scope.newChallenge.users = {};
    $scope.editLabel = 'New';

    $scope.addChallenge = function(newChallenge) {
      if( newChallenge && $scope.editLabel === 'New' ) {
        challengeRepository.addChallenge(newChallenge).then(function(ref){
          challengeDataRepository.syncChallenge(challengeRepository.getChallenge(ref.key()));
        });
          
         $('#newModal').modal('hide');
         $scope.newChallenge = {};
         
      } else { $scope.editChallenge(newChallenge); }
    };

    $scope.editChallenge = function(challenge) {
    	if (challenge && $scope.editLabel === 'Edit' ) {
    		challengeRepository.editChallenge(challenge);
        challengeDataRepository.syncChallenge(challenge);
    	} 
    	$('#newModal').modal('hide');
    	$scope.newChallenge = {};
    };

    $scope.getFormData = function() {
    	$scope.users = userRepository.getUsers();
    	$scope.achievements = achievementRepository.getAchieves();
    	$scope.editLabel = 'New';

    };

    $scope.getChallenge = function(item) {
    	$scope.users = userRepository.getUsers();
    	$scope.achievements = achievementRepository.getAchieves();
    		$scope.newChallenge = challengeRepository.getChallenge(item.$id);
    		$scope.editLabel = 'Edit';
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
