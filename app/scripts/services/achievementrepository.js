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
    var ref = fbutil.ref('achievements');

    // display any errors
    //achieves.$loaded().catch(alert);

    

    // Public API here
    return {
      getAchieves: function () {
        return fbutil.syncArray('achievements');
      },
      addAchieve: function (newAchieve) {
        var achieves = fbutil.syncArray('achievements');
        return achieves.$add({name: newAchieve.name, type: newAchieve.type, criteria: newAchieve.criteria, active: true});
      },
      editAchieve: function (achieve) {
        var achieves = fbutil.syncArray('achievements');
        return achieves.$save(achieve);

      }
    };
  });
