'use strict';

/**
 * @ngdoc function
 * @name lggApp.controller:SampleCtrl
 * @description
 * # SampleCtrl
 * Controller of the lggApp
 */
angular.module('lggApp')
  .controller('SampleCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
