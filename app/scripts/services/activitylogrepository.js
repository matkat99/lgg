'use strict';

/**
 * @ngdoc service
 * @name lggApp.activityLogRepository
 * @description
 * # activityLogRepository
 * Factory in the lggApp.
 */
angular.module('lggApp')
  .factory('activityLogRepository', function (fbutil) {
  //var logs = fbutil.syncArray('activitylogs');
   var ref = fbutil.ref('activitylogs');
    // display any errors
   // logs.$loaded().catch(alert);

    // Public API here
    return {
      getLogs: function () {
        return fbutil.syncArray('activitylogs');
      },
      getUserLogs: function (userId, challengeId) {
        //return fbutil.syncArray('activitylogs/'+challengeId+'/'+userId);
        return fbutil.sync(ref.child(challengeId).orderByChild('userId').equalTo(userId)).$asArray();
      },
      addLog: function (newLog, challengeId) {
        return fbutil.sync(ref.child(challengeId)).$push(newLog);
      // var logs = fbutil.syncArray('activitylogs/'+challengeId+'/'+newLog.userId);
       //     logs.$add({date: newLog.date, type: newLog.type, count: newLog.count, description: newLog.description}).then(function(){ return 1;});
      },
      getChallengeLogs : function(challengeId) {
          return fbutil.syncArray('activitylogs/'+challengeId);
            
      }
    };
  });
