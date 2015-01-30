'use strict';

/**
 * @ngdoc service
 * @name lggApp.achievementRepository
 * @description
 * # achievementRepository
 * Factory in the lggApp.
 */
angular.module('lggApp')
  .factory('achievementRepository', function (fbutil) {
    var achieves = fbutil.syncArray('achievements');

    // display any errors
    //achieves.$loaded().catch(alert);

    

    // Public API here
    return {
      getAchieves: function () {
        return achieves;
      },
      addAchieve: function (newAchieve) {
        achieves.$add({name: newAchieve.name, type: newAchieve.type, criteria: newAchieve.criteria, active: true}).then(function(){ return 1;});
      },
      editAchieve: function (achieve) {
        achieves.$save(achieve).then(function () { return 1;});

      }
    };
  });
