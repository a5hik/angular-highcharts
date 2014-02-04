

/* Controllers */

angular.module('controllers', [])

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('list.report', {
            url: '/:report',
            templateUrl: 'views/report-detail.html',
            controller: 'ReportsDetailCtrl'
        })
    })

    .controller('ListReportsCtrl', ['$scope', 'Reports', function($scope, Reports) {
        $scope.reportsList = Reports.query();
        $scope.orderProp = 'order';

        $scope.selectedItem = function(selectedItem) {
            _($scope.reportsList).each(function(item) {
                item.selected = false;
                if(selectedItem === item) {
                    selectedItem.selected = true;
                }
            });
        };
    }])

    .controller('ReportsDetailCtrl', ['$scope', '$stateParams', 'Reports', function($scope, $stateParams, Reports) {

        $scope.report = Reports.get({reportId: $stateParams.report}, function(reportData) {
            $scope.chartConfig = reportData.chartConfig;
        });

    }]);


