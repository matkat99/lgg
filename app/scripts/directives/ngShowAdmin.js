/**
 * @ngdoc function
 * @name lggApp.directive:ngShowAuth
 * @description
 * # ngShowAuthDirective
 * A directive that shows elements only when user is logged in. It also waits for simpleLogin
 * to be initialized so there is no initial flashing of incorrect state.
 */
angular.module('lggApp')
  .directive('ngShowAdmin', ['simpleLogin', '$timeout', 'userRepository', function (simpleLogin, $timeout, userRepository) {
    'use strict';
    var isLoggedIn;
    var isAdmin = false;
    simpleLogin.watch(function(user) {
      isLoggedIn = !!user;
      
      if(isLoggedIn) { 
        var u = userRepository.getUser(user.uid);
        u.$loaded().then(function() {
          isAdmin = u.isAdmin ? u.isAdmin : false;
        }); 
      }

    });

    return {
      restrict: 'A',
      link: function(scope, el) {
        el.addClass('ng-cloak'); // hide until we process it

        function update() {
          // sometimes if ngCloak exists on same element, they argue, so make sure that
          // this one always runs last for reliability
          $timeout(function () {
            el.toggleClass('ng-cloak', !isAdmin);
          }, 0);
        }

        simpleLogin.watch(update, scope);
        simpleLogin.getUser(update);
      }
    };
  }]);
