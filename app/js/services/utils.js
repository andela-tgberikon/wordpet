angular.module('wordpet.services')
.factory('Utils',['$rootScope', '$mdToast', function($rootScope, $mdToast) {

  return {
    toast: function(text, hideDelay, position) {
      text = text || 'No Message to display';
      hideDelay = hideDelay || 3000;
      position = position || 'top right';

      return $mdToast.show({
        template: '<md-toast>'+text+'</md-toast>',
        hideDelay: hideDelay,
        position: position
      });
    }
  };

}]);