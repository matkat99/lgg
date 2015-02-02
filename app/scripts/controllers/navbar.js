'use strict';

/**
 * @ngdoc function
 * @name lggApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the lggApp
 */
angular.module('lggApp')
  .controller('NavbarCtrl', function ($scope, simpleLogin, userRepository) {
    $scope.user = simpleLogin.getUser();
    $scope.logout = simpleLogin.logout;
    $scope.challenges = {};
    if($scope.user) {
    $scope.user = userRepository.getUser($scope.user.uid);
    $scope.user.$loaded().then(function() {
    	$scope.challenges = $scope.user.challenges;


    });
}

    $scope.showExpired = function(challenge) {
    	
    	var today = new Date();
    	//console.log(challenge.endDate+'<'+ today.getTime());
    	//console.log(challenge.enddate < today.getTime());

    	return challenge.endDate < today.getTime(); 
    };
  });
