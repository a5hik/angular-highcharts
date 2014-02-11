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

        var seriesId = 0;
        var ensureIds = function (series) {
            angular.forEach(series, function(s) {
                if (!angular.isDefined(s.id)) {
                    s.id = 'series-' + seriesId++;
                }
            });
        };

        var chartOptionsWithoutEasyOptions = function (options) {
            return angular.extend({}, options, {data: null, visible: null});
        };

        var prevOptions = {};

        var processSeries = function(chart, series) {
            var ids = [];
            if(series) {
                ensureIds(series);

                //Find series to add or update
                angular.forEach(series, function(s) {
                    ids.push(s.id);
                    var chartSeries = chart.get(s.id);
                    if (chartSeries) {
                        if (!angular.equals(prevOptions[s.id], chartOptionsWithoutEasyOptions(s))) {
                            chartSeries.update(angular.copy(s), false);
                        } else {
                            if (s.visible !== undefined && chartSeries.visible !== s.visible) {
                                chartSeries.setVisible(s.visible, false);
                            }
                            if (chartSeries.options.data !== s.data) {
                                chartSeries.setData(angular.copy(s.data), false);
                            }
                        }
                    } else {
                        chart.addSeries(angular.copy(s), false);
                    }
                    prevOptions[s.id] = chartOptionsWithoutEasyOptions(s);
                });
            }

            //Now remove any missing series
            for(var i = chart.series.length - 1; i >= 0; i--) {
                var s = chart.series[i];
                if (indexOf(ids, s.options.id) < 0) {
                    s.remove(false);
                }
            }

        };

        //IE8 support
        var indexOf = function(arr, find, i /*opt*/) {
            if (i===undefined) i= 0;
            if (i<0) i+= arr.length;
            if (i<0) i= 0;
            for (var n= arr.length; i<n; i++)
                if (i in arr && arr[i]===find)
                    return i;
            return -1;
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