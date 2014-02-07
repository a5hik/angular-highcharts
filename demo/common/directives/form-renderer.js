'use strict';

angular.module('form-renderer', [])

    .directive('formulate', ['$http', '$compile', '$templateCache', function ($http, $compile, $templateCache) {
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
                case 'single-select':
                    templateUrl = 'common/directives/partials/field/single-select.html';
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

        var linker = function(scope, element, attrs) {

            // GET template content according to field type

            $http.get(getTemplateUrl(scope.field.type), { cache: $templateCache }).success(function (fieldHtml) {
                element.html(fieldHtml);
                $compile(element.contents())(scope);

            });
        }


        return {
            restrict: "E",
            rep1ace: true,
            link: linker,
            scope: {
                field:'='
            }
        };

    }]);