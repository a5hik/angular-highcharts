angular.module('controllers', [])

    .controller('ListReportsCtrl', ['$scope', '$location', '$state', '$stateParams', 'Reports', 'DataSharingService', function ($scope, $location, $state, $stateParams, Reports, DataSharingService) {
        $scope.orderProp = 'order';
        $scope.reportsList = Reports.query(function (data) {
            if (DataSharingService.selectedReport) {
                $location.path('/list/' + DataSharingService.selectedReport);
                $scope.selectedItem = DataSharingService.selectedReport;
            } else {
                $location.path('/list/' + _.first(data).id);
                $scope.selectedItem = _.first(data).id;
            }
        });

        $scope.selectItem = function (listId) {
            _($scope.reportsList).each(function (item) {
                if (listId === item.id) {
                    $scope.selectedItem = listId;
                }
            });
        };

        $scope.reload = function () {
            DataSharingService.selectedReport = null;
            $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
        }
    }])

    .controller('ReportsDetailCtrl', ['$scope', '$stateParams', 'ReportService', 'DataSharingService', function ($scope, $stateParams, ReportService, DataSharingService) {

        $scope.report = ReportService.get({reportId: $stateParams.report}, function (reportData) {
            $scope.reportId = $stateParams.report;
            $scope.chartConfig = reportData.chartConfig;
            DataSharingService.selectedReport = $stateParams.report;
        });

    }])

    .controller('ReportsConfigCtrl', ['$scope', '$stateParams', '$location', 'ChartService', 'ReportService', 'DataSharingService',
        function ($scope, $stateParams, $location, ChartService, ReportService, DataSharingService) {

            $scope.generateReport = function () {
                //Get the form Config params and execute sql to get the result in JSON
                //and update the chart config series.
                console.log(angular.toJson($scope.chartConfig, 'pretty'));
                console.log(angular.toJson($scope.formConfig, 'pretty'));
                $scope.chartConfig.series = ChartService.randomSeries();

            };

            $scope.saveReport = function () {
                ReportService.update($scope.report, function (reportData) {
                    $scope.submissionSuccess = true;
                });
            };

            $scope.saveFinishReport = function () {
                $scope.saveReport();
                $scope.go('/list/' + $stateParams.report);
            };

            $scope.report = ReportService.get({reportId: $stateParams.report}, function (reportData) {
                $scope.chartConfig = reportData.chartConfig;
                $scope.formConfig = reportData.formConfig;
            });

            $scope.go = function (path) {
                $location.path(path);
            };

        }]);


