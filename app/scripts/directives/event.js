'use strict';

/**
 * @ngdoc directive
 * @name lggApp.directive:event
 * @description
 * # event
 */
angular.module('lggApp')
  .directive('event', function (eventRepository) {
    return {
      template: '<div class="small" data-ng-repeat="event in events">{{event.user.name}} has earned the <b>{{event.achieveName}}'
      			+' award</b> as part of the {{event.challengeName}} challenge.</div>',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
      	var events = eventRepository.getEvents(6);
      	events.$loaded().then(function(){
      		scope.events = events;
      		//console.log(events);
      	});
      	events.$watch(function(){
      		events.$loaded().then(function(){
      			scope.events = events;
      		
      		});
      	});
      	
        //element.text('this is the event directive');
      }
    };
  });