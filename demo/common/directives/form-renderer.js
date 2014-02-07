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
                case 'textarea':
                    templateUrl = 'common/directives/partials/field/textarea.html';
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