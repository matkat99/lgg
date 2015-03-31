'use strict';

/**
 * @ngdoc service
 * @name lggApp.userRepository
 * @description
 * # userRepository
 * Factory in the lggApp.
 */
angular.module('lggApp')
  .factory('userRepository', function (fbutil, achievementRepository, _) {
   // var users = fbutil.syncArray('users');
    var ref = fbutil.ref('users');

    // display any errors
    //users.$loaded().catch(alert);

    // Public API here
    return {
      getUser: function(userId) {
          return fbutil.syncObject('users/'+userId);
      },
      getUsers: function () {
        return fbutil.syncArray('users');
      },
      addUser: function (user) {
        return fbutil.sync(ref).$push({name: user.name, type: user.type, criteria: user.criteria, active: true}).then(function(){ return 1;});
      },
      editUser: function (user) {
        return user.$save();

      }, 
      isAdmin: function (user) {
          user = fbutil.syncObject('users/'+user.uid);
          user.$loaded().then(function(){
              return user.isAdmin ? user.isAdmin : false;
          });
      },
      editAllUsers: function (users) {

      },
      syncAchieves: function (user) {
          var achieves = achievementRepository.getAchieves();
          user.$loaded().then(function(){
            if(user.achieves === null) { user.achieves = []; }
          _.each(achieves, function (val) {
              
            if(_.where(user.achieves, { name: val.name}).length <= 0) {
                 user.achieves.push(val);
          
             }
          });
          user.$save().then(function () {return 1;});
        });
          
      },
      addChallenge: function(user, challenge) {
          user.challenges[challenge.$id] = { name: challenge.name, startDate: challenge.startDate, endDate: challenge.endDate };

          return user.$save();

      }
    };
  });
