'use strict';

angular.module('ng-highcharts',[])

    .directive('chart', function () {

        function deepExtend(destination, source) {
            for (var property in source) {
                if (source[property] && source[property].constructor &&
                    source[property].constructor === Object) {
                    destination[property] = destination[property] || {};
                    deepExtend(destination[property], source[property]);
                } else {
                    destination[property] = source[property];
                }
            }
            return destination;
        }

        var getMergedOptions = function (scope, element, config) {
            var mergedOptions = {};

            var defaultOptions = {
                chart: {
                    events: {}
                },
                title: {},
                subtitle: {},
                credits: {},
                series: [],
                plotOptions: {},
                navigator: {enabled: false}
            };

            if (config.options) {
                mergedOptions = deepExtend(defaultOptions, config.options);
            } else {
                mergedOptions = defaultOptions;
            }
            mergedOptions.chart.renderTo = element[0];

            if(config.title) {
                mergedOptions.title = config.title;
            }
            if (config.subtitle) {
                mergedOptions.subtitle = config.subtitle;
            }
            if (config.credits) {
                mergedOptions.credits = config.credits;
            }
            return mergedOptions;
        };

        var processSeries = function(chart, series) {
            if(series) {
                //add series
                angular.forEach(series, function(s) {
                    chart.addSeries(angular.copy(s), false);
                });
            }
        };

        var initialiseChart = function(scope, element, config) {
            config = config || {};
            var mergedOptions = getMergedOptions(scope, element, config);

            var chart = new Highcharts.Chart(mergedOptions);
            processSeries(chart, config.series);

            chart.redraw();
            return chart;
        };

        return {
            restrict: 'EAC',
            template: '<div></div>',
            scope: {
                config: "=config"
            },
            replace: true,

            link: function (scope, element, attrs) {

                var chart = false;
                function initChart() {
                    if (chart) chart.destroy();
                    chart = initialiseChart(scope, element, scope.config);
                }
                initChart();

                scope.$watch('config.title', function (newTitle) {
                    chart.setTitle(newTitle, true);
                }, true);

                scope.$watch('config.subtitle', function (newSubtitle) {
                    chart.setTitle(true, newSubtitle);
                }, true);

                scope.$watch('config.options', function (newOptions, oldOptions, scope) {
                    //do nothing when called on registration
                    if (newOptions === oldOptions) return;
                    initChart();
                }, true);

                scope.$watch('config.credits.enabled', function (enabled) {
                    if (enabled) {
                        chart.credits.show();
                    } else if (chart.credits) {
                        chart.credits.hide();
                    }
                });

                scope.$on('$destroy', function() {
                    if (chart) chart.destroy();
                    element.remove();
                });

            }

        };

    });