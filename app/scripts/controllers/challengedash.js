'use strict';

/**
 * @ngdoc function
 * @name lggApp.controller:ChallengedashCtrl
 * @description
 * # ChallengedashCtrl
 * Controller of the lggApp
 */
angular.module('lggApp')
  .controller('ChallengedashCtrl', function ($scope, challengeRepository, simpleLogin, $routeParams, activityLogRepository, _) {
  	$scope.progress = {};
  	$scope.user = simpleLogin.user;
  	$scope.challenge = challengeRepository.getChallenge($routeParams.challengeId);
  	$scope.challenges = challengeRepository.getUserChallenges(simpleLogin.user.uid);
  	$scope.logs = activityLogRepository.getChallengeLogs($scope.challenge.$id);
  	$scope.logs.$loaded().then(function() {
  		calcProgress();
  	});
    
  	$scope.addLog = function(newLog) {
      if( newLog ) {
        	
         newLog.userId = simpleLogin.user.uid;
         activityLogRepository.addLog(newLog, $scope.challenge.$id).then(function() {
         	calcProgress();
         });
         
      }
    };

    function calcProgress() {
    		$scope.progress = {};
    		var count = _.size($scope.challenge.users)-1;
    		//find highest criteria achiement of each type.
    		_.each($scope.challenge.achievements, function(val) {
    			if(!$scope.progress[val.type]) { 
    				$scope.progress[val.type] = {}; 
    				$scope.progress[val.type].total = 0;
    			}

    			if($scope.progress[val.type].total < parseInt(val.criteria,10)) {
    					$scope.progress[val.type].total = parseInt(val.criteria, 10);
    					
    			} 
    		});

    		//set percents
    		_.each($scope.progress, function(val, key, obj) {
    			//get totals for current type
    			obj[key].group = 0;
    			obj[key].user = 0;
    			obj[key].userPercent = 0;
    			obj[key].groupPercent = 0;

    			_.each($scope.logs, function(log) {
    			
    				if(key === log.type) { 

		    			if(log.userId === $scope.user.uid) {
		    				obj[key].user +=  parseInt(log.count, 10);
		    			}
		    			obj[key].group +=  parseInt(log.count, 10);
    				}
    			});
    			obj[key].userPercent = obj[key].user > 0 ? (obj[key].user/ obj[key].total)*100 : 0;
    			obj[key].groupPercent = obj[key].group > 0 ? (obj[key].group/ (obj[key].total*count))*100 : 0;
    		});
    		
    }


  });
