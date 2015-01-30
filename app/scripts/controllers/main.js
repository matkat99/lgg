'use strict';

/**
 * @ngdoc function
 * @name lggApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the lggApp
 */
angular.module('lggApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
