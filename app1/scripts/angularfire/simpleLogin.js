(function() {
  'use strict';
  angular.module('simpleLogin', ['firebase', 'firebase.utils', 'firebase.config'])

    // a simple wrapper that rejects the promise
    // if the user does not exists (i.e. makes user required), useful for
    // setting up secure routes that require authentication
    .factory('authRequired', function(simpleLogin, $q) {
      return function() {
        return simpleLogin.auth.$requireAuth().then(function (user) {
          return user ? simpleLogin.getUser() : $q.reject({ authRequired: true });
        });
      };
    })

    .factory('simpleLogin', function($firebaseAuth, fbutil, $q, $rootScope, createProfile) {
      var auth = $firebaseAuth(fbutil.ref());
      var listeners = [];
      var currentUser = null;
      function statusChange() {
        fns.initialized = true;
        fns.user = fns.getUser() || null;
        angular.forEach(listeners, function(fn) {
          fn(fns.user);
        });
      }
      /*
      $rootScope.$on('$firebaseAuth:authWithPassword', function(e, user) {
        angular.copy(user, simpleLogin.user);
        simpleLogin.user.profile = $firebase(ref.child('users').child(user.uid)).$asObject();

        console.log(simpleLogin.user);
      }); */

      var fns = {
        auth: auth,

        getProfile: function() {
          if(currentUser == null && auth.$getAuth()) {
              return currentUser = fbutil.syncObject('users/'+auth.$getAuth().uid);
           /* return
              currentUser = currentUser.$loaded().then(function(data) {
              console.log('data:'+data);
              return data;
          }, function(err) { console.log(err); return err;});
         */
          }
          //console.log(currentUser);
          return currentUser;
          
        }, //todo use getUser() and remove this var

        initialized: false,
        
        getUser: function() {
          var user = auth.$getAuth();
          if(user) {
              var profile = fbutil.syncObject('users/'+user.uid);
          profile.$loaded().then( function() { 
            user.profile = profile;
          });
          }
          
          return user;
        },

        login: function(provider, opts) {
          return auth.$authWithOAuthPopup(provider, opts);
        },

        anonymousLogin: function(opts) {
          return auth.$authAnonymously(opts);
        },

        passwordLogin: function(creds, opts) {
          return auth.$authWithPassword(creds, opts);
        },

        logout: function() {
          auth.$unauth();
          currentUser = null;
        },

        createAccount: function(email, pass, opts) {
          return auth.$createUser({email: email, password: pass})
            .then(function() {
              // authenticate so we have permission to write to Firebase
              return fns.passwordLogin({email: email, password: pass}, opts);
            })
            .then(function(user) {
              // store user data in Firebase after creating account
              return createProfile(user.uid, email/*, name*/).then(function() {
                return user;
              });
            });
        },

        changePassword: function(email, oldpass, newpass) {
          return auth.$changePassword({email: email, oldPassword: oldpass, newPassword: newpass});
        },

        changeEmail: function(password, newEmail, oldEmail) {
          return auth.$changeEmail({password: password, oldEmail: oldEmail, newEmail: newEmail});
        },

        removeUser: function(email, pass) {
          return auth.$removeUser({email: email, password: pass});
        },
        resetPassword: function(email) {
            fbutil.ref().resetPassword({
              email : email
            }, function(error) {
            if (error === null) {
              console.log("Password reset email sent successfully");
            } else {
              console.log("Error sending password reset email:", error);
            }
          });

        },

        watch: function(cb, $scope) {
          listeners.push(cb);
          auth.$waitForAuth(cb);
          var unbind = function() {
            var i = listeners.indexOf(cb);
            if( i > -1 ) { listeners.splice(i, 1); }
          };
          if( $scope ) {
            $scope.$on('$destroy', unbind);
          }
          return unbind;
        }
      };

      auth.$onAuth(statusChange);

      return fns;
    })

    .factory('createProfile', function(fbutil, $q, $timeout) {
      return function(id, email, name) {
        var ref = fbutil.ref('users', id), def = $q.defer();
        ref.set({email: email, name: name||firstPartOfEmail(email)}, function(err) {
          $timeout(function() {
            if( err ) {
              def.reject(err);
            }
            else {
              def.resolve(ref);
            }
          });
        });

        function firstPartOfEmail(email) {
          return ucfirst(email.substr(0, email.indexOf('@'))||'');
        }

        function ucfirst (str) {
          // credits: http://kevin.vanzonneveld.net
          str += '';
          var f = str.charAt(0).toUpperCase();
          return f + str.substr(1);
        }

        return def.promise;
      };
    });
})();
