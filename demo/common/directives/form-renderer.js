'use strict';

angular.module('form-renderer', [])

    .directive('formulate', ['$http', '$compile', '$templateCache', '$parse', function ($http, $compile, $templateCache, $parse) {
        /**
         *   renders a form field
         **/
        var getTemplateUrl = function (type) {

            var templateUrl = '';
            switch (type) {
                case 'text':
                    templateUrl = 'common/directives/partials/field/textfield.html'
                    break;
                case 'checkbox':
                    templateUrl = 'common/directives/partials/field/checkbox.html';
                    break;
                case 'select':
                    templateUrl = 'common/directives/partials/field/select.html';
                    break;
                case 'multi-select':
                    templateUrl = 'common/directives/partials/field/multi-select.html';
                    break;
                case 'radio':
                    templateUrl = 'common/directives/partials/field/radio.html';
                    break;
                default:
                    templateUrl = 'common/directives/partials/field/textfield.html';
                    break;
            }
            return templateUrl;
        };

        var getOptionsData = function (objectType) {

            var optionsData = '';
            switch (objectType) {
                case 'plan':
                    optionsData = [
                        {"id": "plan1001", "title": "plan1001"},
                        {"id": "plan1002", "title": "plan1002"},
                        {"id": "plan1003", "title": "plan1003"},
                        {"id": "plan1004", "title": "plan1004"},
                        {"id": "plan1005", "title": "plan1005"},
                        {"id": "plan1006", "title": "plan1006"},
                        {"id": "plan1007", "title": "plan1007"},
                        {"id": "plan1008", "title": "plan1008"},
                        {"id": "plan1009", "title": "plan1009"},
                        {"id": "plan1010", "title": "plan1010"}
                    ];
                    break;
                case 'tracker':
                    optionsData = optionsData = [
                        {"id": "tracker1001", "title": "tracker1001"},
                        {"id": "tracker1002", "title": "tracker1002"},
                        {"id": "tracker1003", "title": "tracker1003"},
                        {"id": "tracker1004", "title": "tracker1004"},
                        {"id": "tracker1005", "title": "tracker1005"},
                        {"id": "tracker1006", "title": "tracker1006"},
                        {"id": "tracker1007", "title": "tracker1007"},
                        {"id": "tracker1008", "title": "tracker1008"},
                        {"id": "tracker1009", "title": "tracker1009"},
                        {"id": "tracker1010", "title": "tracker1010"}
                    ];
                    break;
            }
            return optionsData;
        };


        var linker = function (scope, element, attrs) {

            // GET template content according to field type
            $http.get(getTemplateUrl(scope.field.type), { cache: $templateCache }).success(function (fieldHtml) {
                element.html(fieldHtml);
                $compile(element.contents())(scope);

            });

            // Process the model
            if (scope.field.model) {
                var modelExpression = $parse(scope.field.model);
                scope.$parent.$watch(modelExpression, function (value) {
                    scope.myModel = value;
                });
                scope.$watch("myModel", function (value) {
                    modelExpression.assign(scope.$parent, value);
                });
            }

            //process business objects.
            if (scope.field.object) {
                scope.field.options = getOptionsData(scope.field.object)
            }

        }


        return {
            restrict: "E",
            rep1ace: true,
            link: linker,
            scope: {
                field: '='
            }
        };

    }]);