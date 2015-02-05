'use strict';

/**
 * @ngdoc service
 * @name lggApp.eventRepository
 * @description
 * # eventRepository
 * Factory in the lggApp.
 */
angular.module('lggApp')
  .factory('eventRepository', function (fbutil) {
    var eRef = fbutil.ref('events');


    // Public API here
    return {
      getEvent: function (eventId) {
        return fbutil.sync(eRef.child(eventId)).$asObject();
      },
      getEvents: function (count) {
        return fbutil.sync(eRef.orderByChild('date').limitToLast(count)).$asArray();
      },
      getEventsByUser: function(userId) {
        return fbutil.sync(eRef.orderByChild('userId').equalTo(userId)).$asArray();
      },
      getEventsByChallenge: function(challengeId) {
          return fbutil.sync(eRef.orderByChild('challengeId').equalTo(challengeId)).$asArray();
      },
      addEvent: function(newEvent) {
          return fbutil.sync(eRef).$push(newEvent);
      }
    };
  });
