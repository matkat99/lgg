'use strict';

/**
 * @ngdoc service
 * @name lggApp.checkAchievements
 * @description
 * # checkAchievements
 * When an activity is logged check to see if any achievments have been completed.
 */
angular.module('lggApp')
  .factory('checkAchievements', function ($rootScope, challengeDataRepository, eventRepository, activityLogRepository,_) {
   
             
             
    // Public API here
    return {
      check: function (challenge, user, logType) {
        var logs = activityLogRepository.getUserLogs(user.$id, challenge.$id);
        var cData = challengeDataRepository.getDataByChallenge(challenge.$id);
        logs.$loaded().then(function(){
          logs = _.where(logs, { type : logType});  //reduce list to just those of the type of the addition
          var count = 0;
          //get count for the activity type
           _.each(logs, function(val){ 
              count += parseInt(val.count, 10);
          });
           //reduce list of challengeData by userId and logType
         cData.$loaded().then(function(){
             //cData = _.where(cData, {userId: userId, type: logType});
         var today = new Date();
         today = today.getTime();
         //check to see if any of the achievements are completed
         _.each(cData, function(val){
          if(val.userId === user.$id && val.type === logType){
              if(val.criteria <= count && !val.complete ) {  //complete!
                  val.complete = true;
                  
                  val.date = today;

                 $rootScope.$broadcast('achieveEarned', val);
                  // enter event

                cData.$save(val).then(function(){
                      eventRepository.addEvent({
                        achieveName: val.name, 
                        challengeName: challenge.name,
                        date: val.date,
                        user: {name: user.name, userId: user.$id} });
                });
              }

            }
         });

         });

        });
        
         
       
      }
    };
  });
