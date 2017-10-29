angular
    .module('ngClassifieds', ['ngMaterial', 'ui.router'])
    .config(['$stateProvider', '$urlRouterProvider',
        function($mdThemingProvider, $stateProvider, $locationProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/');
    
        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('orange');
        $stateProvider
            .state('classifieds', {
                url: '/classifieds',
                template: 'components/classifieds/classifieds.tpl.html',
                controller: 'classifiedsCtrl as vm'
            });
        $locationProvider.html5Mode(true);
    }]);
