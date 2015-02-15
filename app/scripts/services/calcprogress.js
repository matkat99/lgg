'use strict';

/**
 * @ngdoc service
 * @name lggApp.calcProgress
 * @description
 * # calcProgress
 * Service in the lggApp.
 */
angular.module('lggApp')
  .factory('calcProgress', function (_) {
  	
    return {
    	calcForOne: function(userId, challenge, logs) {
    		return calcProgress(userId, challenge, logs);
    	},
    	calcForAll: function(challenge, logs) {
    		
    		var progressAll = {};
    		_.each(challenge.users, function(val, key, obj){
    				progressAll[key] = calcProgress(key, challenge, logs);
                    progressAll[key].name = val;
    		});
    		return progressAll;

    	}


    };



    function calcProgress(userId, challenge, logs) {
    		var progress = {};
    		var count = _.size(challenge.users)-1;
    		//find highest criteria achiement of each type.
    		_.each(challenge.achievements, function(val) {
    			if(val){
          if(!progress[val.type]) { 
    				progress[val.type] = {}; 
    				progress[val.type].total = 0;
    			}

    			if(progress[val.type].total < parseInt(val.criteria,10)) {
    					progress[val.type].total = parseInt(val.criteria, 10);
    					
    			} 
        }
    		});

    		//set percents
    		_.each(progress, function(val, key, obj) {
    			//get totals for current type
    			obj[key].group = 0;
    			obj[key].user = 0;
    			obj[key].userPercent = 0;
    			obj[key].groupPercent = 0;

    			_.each(logs, function(log) {
    			
    				if(key === log.type) { 

		    			if(log.userId === userId) {
		    				obj[key].user +=  parseInt(log.count, 10);
		    			}
		    			obj[key].group +=  log.count ?  parseInt(log.count, 10) : 1;
    				}
    			});
    			
    			obj[key].userPercent = obj[key].user > 0 ? (obj[key].user/ obj[key].total)*100 : 0;
    			obj[key].groupPercent = obj[key].group > 0 ? (obj[key].group/ (obj[key].total*count))*100 : 0;
    		});
    		return progress;
    }


  });
