(function() {

  "use strict";

  angular
    .module('ngClassifieds')
    .factory('classifiedsFactory', function($http, $firebaseArray) {

      var ref = new Firebase('https://ngclassfieds-437c9.firebaseio.com/');

      return {
        ref: $firebaseArray(ref)
      }
      
    });
    
})();