(function(){
    "use strict";
    angular
        .module("ngClassifieds")
        .controller("classifiedsController", function($state, $scope, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog){
        
        var vm = this;
        
        vm.classifieds;
        vm.categories;
        vm.classified;
        vm.closeSidebar = closeSidebar;
        vm.deleteClassified = deleteClassified;
        vm.editing;
        vm.editClassified = editClassified;
        vm.openSidebar = openSidebar;
        vm.saveClassified = saveClassified;
        vm.saveEdit = saveEdit;
        vm.showToast = showToast;
        

        classifiedsFactory.getClassifieds().then(function(classifieds){
           vm.classifieds = classifieds.data; 
           vm.categories = getCategories(vm.classifieds);
        });
        
        $scope.$on('newClassified', function(event, classified){
            classified.id = vm.classifieds.length + 1;
            vm.classifieds.push(classified);
            showToast('Classified saved!');
        });
        $scope.$on('editSaved', function(event, message){
            showToast(message);
        });
        
        var contact = {
            name: "Luam Yemane",
            phone: "(952) 212-5555",
            email: "ly@gmail.com"
        }
        
        function openSidebar (){
            $state.go('classifieds.new');
        }
        function closeSidebar (){
            $mdSidenav('left').close();
        }
        function saveClassified (classified){
            if(classified){
                classified.contact = contact;
                vm.classifieds.push(classified); 
                vm.classified = {};
                closeSidebar();
                showToast("Classified Saved!");
            }
            
        }
        
        function editClassified (classified){
            $state.go('classifieds.edit', {
                id: classified.id,
                classified: classified
            });
        }
        function saveEdit (){
            vm.editing = false;
            vm.classified = {};
            closeSidebar();
            showToast("Edit saved!");
            
        }
        
        function deleteClassified (event, classified){
            var index = vm.classifieds.indexOf(classified);
            
            var confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete ' + classified.title + '?')
                .ok('Yes')
                .cancel('No')
                .targetEvent(event);
             
            $mdDialog.show(confirm).then(function(){
                vm.classifieds.splice(index, 1);
            }, function(){
                
            });
        }
        function showToast (message){
            $mdToast.show(
                $mdToast.simple()
                    .content(message)
                    .position('top, right')
                    .hideDelay(3000)
            );
        }
        function getCategories(classifieds){
            var categories = [];
            angular.forEach(classifieds, function(item){
                angular.forEach(item.categories, function(category){
                    vm.categories.push(category);
                });
            });
            
            return _.uniq(categories);
        }
    });
})();