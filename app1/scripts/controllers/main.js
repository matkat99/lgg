'use strict';

/**
 * @ngdoc function
 * @name lggApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the lggApp
 */
angular.module('lggApp')
  .controller('MainCtrl', function ($scope, $rootScope, $location, $anchorScroll, contactFormRepository, userRepository, simpleLogin, _) {

    $scope.contactSent = false;
  	if(simpleLogin.user) {
  	 simpleLogin.getProfile().$loaded().then(function(data) {
  	 	$scope.user = data;
  		
  	 });
  	}
  	
    $scope.sendContact = function(isValid, contact) {
      if( isValid && contact ) {
        contact.closed = false;
        contact.entryDate = new Date();
        contactFormRepository.addContactForm(contact);
        $scope.contactSent = true;
        $scope.contact = {};
        $scope.contactForm.$setPristine();
      }
    }
    /*
  	$scope.challenges = challengeRepository.getChallenges();

  	$scope.challenges.$loaded().then(function(){
  		$scope.challenges = _.filter($scope.challenges, function(val)
  		{ 
			var today = new Date();
			return val.endDate > today.getTime(); 
	 	});
    //console.log($scope.challenges);

  	});
  	$scope.belongsTo = function(challengeId) {
  		
  		if($scope.user) {
  		return _.find($scope.user.challenges, function(val, key) {
  			return key === challengeId;
  		});
  	} else { return true; }
  	};

  	$scope.joinChallenge = function(challenge) {
  		
  		challengeRepository.addUser(challenge, $scope.user).then(function() {
        challengeDataRepository.syncChallenge(challenge);
          $rootScope.$broadcast('challengeAdded');
          $location.path('/challengeDash/'+challenge.$id);
          ;

      });
      
      

  	};
 */

 $scope.scrollTo = function(id) {
    $location.hash(id);
      $anchorScroll();

 }


  });
