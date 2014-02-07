'use strict';

angular.module('form-renderer', [])

    .directive('formulate', ['$http', '$compile', '$parse', '$templateCache', function ($http, $compile, $parse, $templateCache) {
        /**
         *   renders a form field
         **/
        var getTemplateUrl = function (field) {
            var type = field.type;
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

        var linker = function (originalScope, element, attrs, ctrl) {

            var scope = originalScope.$new();

            // eval the field object to local scope
            scope.field = scope.$eval(attrs.field);

            // create the regular expression object for ng-pattern validation
            scope.field.pattern = new RegExp(scope.field.pattern);

            var type = scope.field.type;

            if (type === 'date') {
                if (!scope.field.datepickerOptions)
                    scope.field.datepickerOptions = {
                        format: 'dd/mm/yyyy',
                        endDate: new Date()
                    };
            }

            if (scope.field.pattern) {
                if (!scope.field.patternMsg) {
                    scope.field.patternMsg = 'This field should contain only digits';
                }
            }

            if (scope.field.onChange) {
                scope.onChange = $parse(scope.field.onChange);
            }

            // parse the model string and perform two way binding with parent scope
            scope.parentModel = $parse(scope.field.model);

            scope.disabled = $parse(scope.field.disabled)(originalScope) || false;
            scope.isvisible = $parse(scope.field.isvisible)(originalScope) || true;

            scope.$watch(function () {
                return $parse(scope.field.model)(originalScope);
            }, function (newVal) {
                scope.localModel = scope.parentModel(originalScope);

            });

            scope.$watch(function () {
                return $parse(scope.field.isvisible)(originalScope);
            }, function (newVal) {
                if (angular.isDefined(newVal)) {
                    scope.isvisible = newVal;
                }

            });

            scope.$watch(function () {
                return $parse(scope.field.disabled)(originalScope);
            }, function (newVal) {
                if (angular.isDefined(newVal)) {
                    scope.disabled = newVal;
                }
            });

            var initialValue = null;

            if (scope.parentModel) {

                // get the value of model and set it to a local property
                scope.localModel = scope.parentModel(originalScope);
                initialValue = scope.localModel;

                // watch for changes in local object
                if (angular.isDefined(scope.configuration)) {
                    if (scope.configuration.updateOnChange) {
                        scope.$watch('localModel', function () {
                            // assign changes to parent scope
                            if (typeof scope.parentModel.assign === 'function') scope.parentModel.assign(originalScope, scope.localModel);
                            if (angular.isDefined(scope.onChange)) scope.onChange();
                        });
                    }
                }
            }

            // GET template content according to field type
            var templateUrl = getTemplateUrl(scope.field);
            $http.get(templateUrl, { cache: $templateCache }).success(function (data) {
                element.html(data);
                $compile(element.contents())(scope);

                if (scope.$last) {
                    scope.$emit('form:ready');
                }
            });

            scope.$on('form:reset', function () {
                scope.localModel = initialValue;
                if (typeof scope.parentModel.assign === 'function') scope.parentModel.assign(originalScope, scope.localModel);

            });

            scope.$on('form:submit', function () {
                if (typeof scope.parentModel.assign === 'function') scope.parentModel.assign(originalScope, scope.localModel);
            });

            originalScope.$on('$destroy', function () {
                scope.$destroy();
            });

        };

        return {
            template: '<div></div>',
            restrict: 'E',
            //link: linker,
            replace: true,
            require: 'ngModel',
            compile: function () {
                return {
                    pre: linker,
                    post: function (originalScope, element, attrs, ctrl) {
                        var scope = originalScope.$new();
                        scope.field = scope.$eval(attrs.field);
                    }
                }
            }
        };
    }]);