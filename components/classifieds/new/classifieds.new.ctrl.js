(function() {

  "use strict";

  angular
    .module('ngClassifieds')
    .controller('newClassifiedsController', function($state, $scope, $mdSidenav, $mdDialog, $timeout, classifiedsFactory) {

      var vm = this;
      vm.closeSidebar = closeSidebar;
      vm.saveClassified = saveClassified;

      $timeout(function(){
         $mdSidenav('left').open();  
      });
      
      $scope.$watch('vm.sidenavOpen', function(sidenav){
          if(sidenav === false){
              $mdSidenav('left')
                .close()
                .then(function(){
                  $state.go('classifieds');
                });
          }
      });
      
      function closeSidebar(){
          vm.sidenavOpen = false;
      }
      
      function saveClassified(classified){
          if(classified){
              classified.contact = {
                  name: "Luam Yemane",
                  phone: "(952) 212-5555",
                  email: "ly@gmail.com"
              }
              
              $scope.$emit('newClassified', classified);
              vm.sidenavOpen = false;
          }
      } 
      
    });

})();