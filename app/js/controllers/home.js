angular.module("wordpet.controllers")
  .controller('Home', ['$scope', '$mdSidenav', '$location', '$state', 'Utils', '$http', 'Svc',
    function($scope, $mdSidenav, $location, $state, Utils, $http, Svc) {
      //This is being set in the backend, all calls should go to backend.
      $scope.progress = false;
      //$scope.progressSearch = true;

      //Enter key handler
      $scope.enterKeyHandler = function($event) {
        var keyCode = $event.which || $event.keyCode;
        if (keyCode === 13) {
          $scope.findWord();
        }
      };
      $scope.findWord = function() {
        //console.log('Go to back');
        $scope.progress = true;
        $scope.progressSearch = false;

        var params = {};
        //This code block posts to the backend, this is going to be useful because all API calls are going to be a backend request, only firebase would be requested and written to from here for faster client retrieval.

        //A check needs to be implemented when a user sends an empty search, the user should be informed that no value was detected so a random word would be returned. 
        if (angular.isUndefined($scope.word)) {
          params.word = '?random=true';
          Utils.toast('You did not enter a search term so a random word was searched!');
        } else {
          params.word = $scope.word;
        }
        console.log(params);

        // There should be an if statement here to first call the word from firebase, if it does exist pull it from the frontend, if it doesn't, send it to the backend.

        //Move this API call to the service, this code is going to be repeated in a number of places, code review sites would detect it as duplicate and demand refactoring.
        $http.post('/findword', params).success(function(res) {
          $scope.progress = false;
          $scope.word = '';
          Svc.holdVal(res);
          console.log(res);
          $state.go('search');
        }).error(function(res, req) {
          console.log('This is error res : ', res + ' This is error req: ', req);
          Utils.toast('Please check the spelling or enter a valid word');
        });
      };

    }
  ]);
