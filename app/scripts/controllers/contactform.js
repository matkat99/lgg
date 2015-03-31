'use strict';

/**
 * @ngdoc function
 * @name lggApp.controller:ContactformCtrl
 * @description
 * # ContactformCtrl
 * Controller of the lggApp
 */
angular.module('lggApp')
  .controller('ContactformCtrl', function ($scope, contactFormRepository) {
    $scope.forms = contactFormRepository.getContactForms();
    $scope.forms.$loaded();

    $scope.editForm = function(form) {
    	if (form) {
    		
    		contactFormRepository.editContactForm(form);
    		
    	}

    };

  });
