
// Declare app level module which depends on filters, and services
angular.module('ngDynaForm', [
        'ui.router'
    ])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'views/home.html'
        })
        .state('list', {
            url: '/list',
            templateUrl: 'views/list.html',
            controller: 'ListCtrl'
        })
        .state('list.item', {
            url: '/:item',
            templateUrl: 'views/list.item.html',
            controller: function($scope, $stateParams) {
                $scope.item = $stateParams.item;
            }
        })

   })


.controller('ListCtrl', function ($scope) {
      $scope.reportsList = [
        {name: 'AgileBurnDownChart'},
        {name: 'SprintBurnDownChart'},
        {name: 'ReleaseBurnDownChart'},
        {name: 'SprintBurnUpChart'},
        {name: 'DefectsBurnDownChart'}
    ];

    $scope.selectedItem = function(selectedItem) {
        _($scope.reportsList).each(function(item) {
            item.selected = false;
            if(selectedItem === item) {
                selectedItem.selected = true;
            }
        });
    };
});

