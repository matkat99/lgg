'use strict';

/**
 * @ngdoc function
 * @name lggApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the lggApp
 */
angular.module('lggApp')
  .controller('UsersCtrl', function ($scope,fbutil,userRepository, $timeout) {
    $scope.users = userRepository.getUsers(); //fbutil.syncArray('users');

    // display any errors
    $scope.users.$loaded().catch(alert);

    // provide a method for adding a message
    $scope.addUser = function(newUser) {
      if( newUser ) {
        // push a message to the end of the array
        userRepository.addUser(newUser)
          
          // display any errors
          .catch(alert);
      }
    };

    $scope.editUser = function(user) {
    	if (user) {
    		$scope.users.$save(user)
    		.catch(alert);
    	}

    };

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  });
