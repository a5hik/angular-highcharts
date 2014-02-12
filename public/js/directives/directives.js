'use strict';

angular.module('directives', [])

    .directive('planningfolder', ['$scope', function ($scope) {

        return {
            restrict: 'EAC',
            templateUrl: 'js/directives/partials/field/multi-select.html',
            scope: {
                config: "="
            },
            replace: true,

            link: function (scope, element, attrs) {

                scope.config.field.options = [
                    {id: 'plan0001', name: 'Scorchers Iteration 1'},
                    {id: 'plan0002', name: 'Scorchers Iteration 2'},
                    {id: 'plan0003', name: 'Scorchers Iteration 3'},
                    {id: 'plan0004', name: 'Scorchers Iteration 4'},
                    {id: 'plan0005', name: 'Scorchers Iteration 5'},
                    {id: 'plan0006', name: 'Scorchers Iteration 6'}
                ]

            }
        };

    }])

    .directive('tracker', ['$scope', function ($scope) {

        return {
            restrict: 'EAC',
            loadedTemplateUrl: 'js/directives/partials/field/multi-select.html',
            scope: {
                config: "="
            },
            replace: true,

            link: function (scope, element, attrs) {

                scope.config.field.options = [
                    {id: 'trac0001', name: 'Scorchers Tracker 1'},
                    {id: 'trac0002', name: 'Scorchers Tracker 2'},
                    {id: 'trac0003', name: 'Scorchers Tracker 3'},
                    {id: 'trac0004', name: 'Scorchers Tracker 4'},
                    {id: 'trac0005', name: 'Scorchers Tracker 5'},
                    {id: 'trac0006', name: 'Scorchers Tracker 6'}
                ]

            }
        };

    }]);


