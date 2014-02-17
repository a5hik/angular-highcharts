angular.module('controllers', [])

    .controller('ListReportsCtrl', ['$scope', '$location', '$state', '$stateParams', 'ReportTemplateService', 'ReportService', 'DataSharingService',
        function ($scope, $location, $state, $stateParams, ReportTemplateService, ReportService, DataSharingService) {
            $scope.orderProp = 'order';
            $scope.reportsList = ReportTemplateService.query(function (data) {
                if (DataSharingService.selectedReportType) {
                    $location.path('/list/admin/' + DataSharingService.selectedReportType);
                    $scope.selectedItem = DataSharingService.selectedReportType;
                } else {
                    $location.path('/list/admin/' + _.first(data).id);
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

            /*$scope.reload = function () {
             DataSharingService.selectedReportType = null;
             $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
             }*/
        }])

    .controller('ReportsDashboardCtrl', ['$scope', '$location', '$state', '$stateParams', 'ReportTemplateService', 'ReportService', 'DataSharingService',
        function ($scope, $location, $state, $stateParams, ReportTemplateService, ReportService, DataSharingService) {
            $scope.reports = ReportService.reportsCount.get({count: 4});
        }])

    .controller('ReportsManageCtrl', ['$scope', '$location', '$state', '$stateParams', 'ReportTemplateService', 'ReportService', 'DataSharingService',
        function ($scope, $location, $state, $stateParams, ReportTemplateService, ReportService, DataSharingService) {
            $scope.reportType = $stateParams.reportType;
            $scope.reports = ReportService.reportsType.get({type: $stateParams.reportType}, function (reportData) {
            });

            DataSharingService.selectedReportType = $stateParams.reportType;

            $scope.deleteReport = function (reportId) {
                console.log(reportId);
                var deleteReport = confirm('Are you absolutely sure you want to delete?');
                if (deleteReport) {
                    ReportService.reports.delete({reportId: reportId});
                    $scope.reports.splice(reportId, 1);
                }
            };
        }])


    .controller('ReportsDetailCtrl', ['$scope', '$stateParams', 'ReportService', 'DataSharingService', function ($scope, $stateParams, ReportService, DataSharingService) {

        $scope.report = ReportService.reports.get({reportId: $stateParams.report}, function (reportData) {

            $scope.reportId = $stateParams.report;
            $scope.chartConfig = reportData.chartConfig;
        });

    }])

    .controller('ReportsConfigCtrl', ['$scope', '$stateParams', '$location', 'ChartService', 'ReportService', 'ReportTemplateService', 'DataSharingService',
        function ($scope, $stateParams, $location, ChartService, ReportService, ReportTemplateService, DataSharingService) {

            $scope.generateReport = function () {
                //Get the form Config params and execute sql to get the result in JSON
                //and update the chart config series.
                $scope.chartConfig.series = ChartService.randomSeries(DataSharingService.selectedReportType);

            };

            $scope.saveReport = function () {
                //Add
                if (!$scope.report.type) {
                    $scope.report.type = $stateParams.report;
                    ReportService.reportsList.add($scope.report, function (reportData) {
                        $scope.submissionSuccess = true;
                    });
                } else { //update
                    ReportService.reports.update($scope.report, function (reportData) {
                        $scope.submissionSuccess = true;
                    });
                }
            };

            $scope.saveFinishReport = function () {
                $scope.saveReport();
                $scope.go('/list');
            };

            $scope.cancel = function () {
                $scope.go('/list');
            };

            $scope.report = ReportService.reports.get({reportId: $stateParams.report}, function (reportData) {
                $scope.chartConfig = reportData.chartConfig;
                $scope.formConfig = reportData.formConfig;
            }, function () {
                $scope.report = ReportTemplateService.get({reportId: $stateParams.report}, function (reportData) {
                    $scope.chartConfig = reportData.chartConfig;
                    $scope.formConfig = reportData.formConfig;
                });
            });

            $scope.go = function (path) {
                $location.path(path);
            };

        }]);


