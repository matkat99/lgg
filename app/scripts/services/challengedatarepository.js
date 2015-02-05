'use strict';

/**
 * @ngdoc service
 * @name lggApp.challengeDataRepository
 * @description
 * # challengeDataRepository
 * Factory in the lggApp.
 */
angular.module('lggApp')
  .factory('challengeDataRepository', function (fbutil, _) {
    var cdRef = fbutil.ref('challengedata');

    
    // Public API here
    return {
      syncChallenge: function (challenge) {
        //get current CD records for challenge
        var cdData = fbutil.sync(cdRef.orderByChild('challengeId').equalTo(challenge.$id)).$asArray();
        cdData.$loaded().then(function(){
          if (cdData.length) { //there are some records already
            _.each(challenge.achievements, function(val, key, obj) {
                  if(val) {
                    _.each(challenge.users, function(uval, ukey, uobj){
                
                    if(_.where(cdData, {userId: ukey, achievementId: key}).length === 0) { //is this achieve/user combo there already?
                      cdData.$add({
                      achievementId : key,
                      userId: ukey, 
                      challengeId: challenge.$id, 
                      name: obj[key].name,
                      type: obj[key].type, 
                      criteria: obj[key].criteria

                    });
                    }
                    });
                  } else { //remove achievement if false
                      _.each(cdData, function(cval, ckey){
                          if(cval.achievementId === key) {
                            cdData.$remove(cval);
                          }
                      });
                  }
                
            });
        } else { //no records exist yet for this challenge...add all
            _.each(challenge.users, function(uval, ukey, uobj){
                _.each(challenge.achievements, function(val, key, obj) {
                    if(val){
                    cdData.$add({
                      achievementId : key,
                      userId: ukey, 
                      challengeId: challenge.$id, 
                      name: obj[key].name,
                      type: obj[key].type, 
                      criteria: obj[key].criteria
                    });
                  } 
                });
            });
        }
         }); //no existing records...create all
        //for each user in challenge 
        // get records
        //  check for any achieves in CD for user that are no longer in the challenge
        //_.each(challenge.user)
       // return fbutil;
      },
      syncUser: function(user) {

      },
      editData: function(data) {
        //return fbutil.sync(ref.child)
      },
      getDataByUser : function(user) {

      },
      getDataByChallenge: function(challengeId) {
          return fbutil.sync(cdRef.orderByChild('challengeId').equalTo(challengeId)).$asArray();
      }
    };
  });
