

/* Controllers */

angular.module('controllers', [])

    .controller('ListReportsCtrl', ['$scope', 'Reports', function($scope, Reports) {
        $scope.reportsList = Reports.query();
        $scope.orderProp = 'order';

        $scope.selectItem = function(selectedItem) {
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
            $scope.reportId = $stateParams.report;
            $scope.chartConfig = reportData.chartConfig;
        });

    }])

    .controller('ReportsConfigCtrl', ['$scope', '$stateParams', 'Reports', 'ChartService', function($scope, $stateParams, Reports, ChartService) {

        $scope.print = function() {
            //console.log(angular.toJson($scope.formConfig, 'pretty'));
            console.log(angular.toJson($scope.chartConfig, 'pretty'));
        };

        $scope.generateReport = function() {
          //Get the form Config params and execute sql to get the result in JSON
            //and update the chart config series.
            $scope.chartConfig.series = ChartService.randomSeries();

        };

        $scope.report = Reports.get({reportId: $stateParams.report}, function(reportData) {
            $scope.chartConfig = reportData.chartConfig;
            $scope.formConfig = reportData.formConfig;
        });

    }]);


