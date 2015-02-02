'use strict';

/**
 * @ngdoc directive
 * @name lggApp.directive:nav
 * @description
 * # nav
 */
angular.module('lggApp')
  .directive('challengeNav', function (simpleLogin) {
  	
    return {
    scope: {},	
      template: '<div>test: {{challenges}}</div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        //element.text(scope.challenges);
        var user = simpleLogin.user;
        user.$loaded().then(function(){
        	scope.challenges = user;
        });
        
      }
    };
  });