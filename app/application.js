require("./js/config.js");

window.Wordpet = angular.module("Wordpet", [
  'wordpet.controllers',
  'wordpet.services',
  'wordpet.directives',
  'ngAnimate',
  'ngMaterial',
  'ui.router'
   ]);

Wordpet.run(['$rootScope','Refs','$timeout','Authentication', 'Authorization', '$state', function($rootScope, Refs, $timeout, Authentication, Authorization, $state) {
  // set globals we want available in ng expressions
  $rootScope._ = window._;
  $rootScope.moment = window.moment;
  Refs.root.onAuth(function(authData) {
    if(authData) {
      console.log("auth: user is logged in");
      var user = Authentication.buildUserObjectFromGoogle(authData);
      var userRef = Refs.users.child(user.uid);
      userRef.on('value', function(snap) {
        if(!snap.val()) {
          user.created = Firebase.ServerValue.TIMESTAMP;
          userRef.set(user);
          //analytics.track('Signup');
        }
        else{
          user = snap.val();
        }

        $timeout(function(){
          $rootScope.authUser = user;
          $state.go('user/settings');
        });
      });

      // indicate to the rest of the app that we're logged in
      $rootScope.authUser = user;

      // analytics.identify(user.uid, {
      //   name: user.name,
      //   firstName: user.firstName,
      //   lastName: user.lastName,
      //   email: user.email
      // });
    }
    else {
      // user is logged out
      console.log("auth: user is logged out");
      $rootScope.authUser = null;
    }
  });

}]);

Wordpet.config(['$stateProvider', '$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);
  $stateProvider
    .state('default', {
      url: '/',
      templateUrl: 'views/home.html',
      controller: 'Home',
      data: {
        access: 'public'
      }
    })
    .state('search', {
      url: '/search',
      templateUrl: 'views/search.html',
      controller: 'Search',
      data: {
        access: 'public'
      }
    })
    .state('mysearch', {
      url: '/my-search',
      templateUrl: 'views/search.html',
      controller: 'Home',
      data: {
        access: 'private'
      }
    })
    .state('user/settings', {
      url: '/user/settings',
      templateUrl: 'views/settings.html',
      controller: 'Settings',
      data: {
        access: 'private'
      }
    });
}]);

window.escapeEmailAddress = function(email) {
  if (!email) {
    return false;
  }
  // Replace '.' (not allowed in a Firebase key) with ',' (not allowed in an email address)
  email = email.toLowerCase();
  email = email.replace(/\./g, ',');
  return email;
};
