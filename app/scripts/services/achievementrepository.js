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
        return achieves.$add({name: newAchieve.name, type: newAchieve.type, criteria: newAchieve.criteria, active: true});
      },
      editAchieve: function (achieve) {
        return achieves.$save(achieve);

      }
    };
  });
