(function() {

  "use strict";

  angular
    .module("ngClassifieds")
    .directive("classifiedCard", function() {
      return {
        templateUrl: "components/classifieds/card/classified-card.tpl.html",
        scope: {
          classifieds: "=",
          classifiedsFilter: "=searchFilter",
          category: "=categoryFilter"
        },
        controller: classifiedCardController,
        controllerAs: 'vm'
      }

      function classifiedCardController($scope, $state, $mdDialog) {

        var vm = this;

        vm.editClassified = editClassified;
        vm.deleteClassified = deleteClassified;

        function editClassified(classified) {
          vm.editing = true;
          vm.sidebarTitle = 'Edit Classified';
          $state.go('classifieds.edit', { id: classified.$id });
        }

        function deleteClassified(event, classified) {
          var confirm = $mdDialog.confirm()
              .title('Are you sure you want to delete ' + classified.title + '?')
              .targetEvent(event)
              .ok('Yes')
              .cancel('No');
          $mdDialog.show(confirm).then(function() {
            $scope.classifieds.$remove(classified);
          }, function() {

          });
        }

        function showToast(message) {
          $mdToast.show(
            $mdToast.simple()
              .content(message)
              .position('top, right')
              .hideDelay(3000)
          );
        }

      }
    });
})();