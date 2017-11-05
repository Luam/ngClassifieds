(function() {

  "use strict";

  angular
    .module('ngClassifieds')
    .controller('newClassifiedsController', function($state, $scope, $mdSidenav, $mdDialog, $timeout, classifiedsFactory) {

      var vm = this;

      vm.closeSidebar = closeSidebar;
      vm.saveClassified = saveClassified;

      vm.sidebarTitle = 'Add a Classifed';

      // We need a watcher to trigger the sidenav
      // opening and closing
      $scope.$watch('sidenavOpen', function(sidenavOpen) {
        if(sidenavOpen === false) {
          $mdSidenav('left')
            .close()
            .then(function() {
              $state.go('classifieds');
          });
        }
      });

      $timeout(function() {
        $mdSidenav('left').open();     
      });
      
      function closeSidebar() {
        vm.classified = {};
        $scope.sidenavOpen = false;        
      }

      function saveClassified(classified) {
        if(classified) {

          classified.contact = {
            name: "Luam Yemane", 
            phone: "(952) 555-5555",
            email: "ly@gmail.com"
          }

          $scope.$emit('newClassified', classified)          
          $scope.sidenavOpen = false;
        }
      }


    });

})();