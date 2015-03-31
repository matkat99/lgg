'use strict';

/**
 * @ngdoc function
 * @name lggApp.controller:AchievementsCtrl
 * @description
 * # AchievementsCtrl
 * Controller of the lggApp
 */
angular.module('lggApp')
  .controller('AchievementsCtrl', function ($scope,fbutil, $timeout, achievementRepository, userRepository, _) {
    
  	$scope.achieves = achievementRepository.getAchieves(); //fbutil.syncArray('achievements');

    // display any errors
    $scope.achieves.$loaded().catch(alert);

    // provide a method for adding a message
    $scope.addAchieve = function(newAchieve) {
      if( newAchieve ) {
        // push a message to the end of the array
        //$scope.achieves.$add({name: newAchieve.name, type: newAchieve.type, criteria: newAchieve.criteria, active: true})
          // display any errors
         // .catch(alert);
         achievementRepository.addAchieve(newAchieve);
         //update users with new achievement
         updateUsers(newAchieve);
      }
    };

    $scope.editAchieve = function(achieve) {
    	if (achieve) {
    		//$scope.achieves.$save(achieve).catch(alert);
    		achievementRepository.editAchieve(achieve);
    		updateUsers(achieve);
    	}

    };

    //update users with new achievement
    var updateUsers = function (newAchieve) {
    	var users = userRepository.getUsers();
    	_.each(users, function (val) {
    		if(!val.achieves) {
    			val.achieves = [];
    		}
    		if(_.where(val.achieves, { name: newAchieve.name}).length <= 0) {
    			
    			val.achieves.push(newAchieve);
    			//console.log(val);
    		}
    		userRepository.editUser(val);
    	});

    };

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }

  });
