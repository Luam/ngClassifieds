(function() {

  "use strict";

  angular
    .module('ngClassifieds')
    .controller('editClassifiedsController', function($state, $scope, $mdSidenav, $mdDialog, $timeout, classifiedsFactory) {

      var vm = this;
      vm.closeSidebar = closeSidebar;
      vm.saveEdit = saveEdit;
      vm.classified = $state.params.classified;
      
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
      
      function saveEdit(){
          $scope.$emit('editSaved', 'Edit saved!')
          vm.sidenavOpen = false;
      } 
      
    });

})();