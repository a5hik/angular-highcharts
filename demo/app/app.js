
// Declare app level module which depends on filters, and services
angular.module('ngDynaForm', [
    'ui.router',
    'controllers',
    'services'
    ]);

angular.module('ngDynaForm').config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'views/home.html'
        })
        .state('list', {
            url: '/list',
            templateUrl: 'views/reports-list.html',
            controller: 'ListReportsCtrl'
        })
   });


