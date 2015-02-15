'use strict';
/**
 * @ngdoc function
 * @name lggApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('lggApp')
  .controller('LoginCtrl', function ($scope, simpleLogin, $location) {
    $scope.oauthLogin = function(provider) {
      $scope.err = null;
      simpleLogin.login(provider, {rememberMe: true}).then(redirect, showError);
    };

    $scope.anonymousLogin = function() {
      $scope.err = null;
      simpleLogin.anonymousLogin({rememberMe: true}).then(redirect, showError);
    };

    $scope.passwordLogin = function(email, pass) {
      $scope.err = null;
      simpleLogin.passwordLogin({email: email, password: pass}, {rememberMe: true}).then(
        redirect, showError
      );
    };

    $scope.createAccount = function(email, pass, confirm) {
      $scope.err = null;
      if( !pass ) {
        $scope.err = 'Please enter a password';
      }
      else if( pass !== confirm ) {
        $scope.err = 'Passwords do not match';
      }
      else {
        simpleLogin.createAccount(email, pass, {rememberMe: true})
          .then(redirectAccount, showError);
      }
    };

    $scope.resetPassword = function(email){
       simpleLogin.resetPassword(email);  
          
      $scope.reset = false;


    };
    

    function redirect() {
      $location.path('/');
    }
    function redirectAccount() {
      $location.path('/account');
    }

    function showError(err) {
      $scope.err = err;
    }


  });
