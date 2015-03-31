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
   var userLogs = null;
   var challengeLogs = null;
   var currentUser = null;
   var currentUserChallenge = null;
   var currentChallenge = null;
    // display any errors
   // logs.$loaded().catch(alert);

    // Public API here
    return {
      getLog: function(logId, challengeId) {
          return fbutil.syncObject('activitylogs/'+challengeId+'/'+logId);
      },
      getLogs: function () {
        return fbutil.syncArray('activitylogs');
      },
      getUserLogs: function (userId, challengeId) {
        if(userLogs === null || (currentUser !== userId || currentUserChallenge !== challengeId)) {
          currentUserChallenge = challengeId;
          currentUser = userId;
        return userLogs = fbutil.sync(ref.child(challengeId).orderByChild('userId').equalTo(userId)).$asArray();
        } else { return userLogs; }
      },
      addLog: function (newLog, challengeId) {
        newLog.date = newLog.date.getTime();
        return fbutil.sync(ref.child(challengeId)).$push(newLog);
      // var logs = fbutil.syncArray('activitylogs/'+challengeId+'/'+newLog.userId);
       //     logs.$add({date: newLog.date, type: newLog.type, count: newLog.count, description: newLog.description}).then(function(){ return 1;});
      },
      getChallengeLogs : function(challengeId) {
        if(challengeLogs === null || currentChallenge!== challengeId) {
          currentChallenge = challengeId;
          return challengeLogs = fbutil.syncArray('activitylogs/'+challengeId);
        } else { return challengeLogs; }
            
      },
      editLog: function(log) {
        if(log.date.getTime) { log.date = log.date.getTime(); }
          
          return log.$save();
      }
    };
  });
