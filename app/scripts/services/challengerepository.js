'use strict';

/**
 * @ngdoc service
 * @name lggApp.challengeRepository
 * @description
 * # challengeRepository
 * Factory in the lggApp.
 */
angular.module('lggApp')
  .factory('challengeRepository', function (fbutil, userRepository, _) {
      var ref = fbutil.ref('challenges');

      function syncUserChallenges(challenge) {
          _.each(challenge.users, function(val, key) {

              var user = userRepository.getUser(key);
              user.$loaded().then(function(){
                    //check to make sure val not false
              if(val) {
                    if(!user.challenges) { user.challenges = {}; }
                    user.challenges[challenge.$id] = { name: challenge.name, startDate: challenge.startDate, endDate: challenge.endDate };
                  } else { user.challenges[challenge.$id] = false; }
                  userRepository.editUser(user).then(function(data) { //console.log(data); 
                  }, 
                      function(error) { console.log('error: '+error);});
              });
        });

      }
    // Public API here
    return {
      getChallenges: function () {
        return fbutil.syncArray('challenges');
      },
      getChallenge: function(challengeId) {
          return fbutil.syncObject('challenges/'+challengeId);
      },
      addChallenge: function(newChallenge) {
          var challenges = fbutil.syncArray('challenges/');
          newChallenge.startDate = newChallenge.startDate.getTime();
          newChallenge.endDate = newChallenge.endDate.getTime();
          syncUserChallenges(challenge);
           return challenges.$add({startDate: newChallenge.startDate, endDate: newChallenge.endDate, name: newChallenge.name,
            achievements: newChallenge.achievements, users: newChallenge.users, leader: newChallenge.leader});
          //clean up the leader object
           //  newChallenge.leader.
         //    return fbutil.sync(ref).$set(newChallenge);
      },
      editChallenge: function(challenge) {
          if(!challenge.startDate) challenge.startDate = challenge.startDate.getTime();
          if(!challenge.endDate)challenge.endDate = challenge.endDate.getTime();
          syncUserChallenges(challenge);
          return challenge.$save();
      },
      removeChallenge: function(challenge) {
        return challenge.$remove(challenge);
      },
      getActiveChallenges: function(userId) {
          //return fbutil.sync(ref.orderByChild('startDate').).$toArray();
      },
      addUser: function(challenge, user) {
        syncUserChallenges(challenge);
          return fbutil.sync(ref.child(challenge.$id+'/users')).$set(user.uid, user.profile.name);
      }

    };
  });
