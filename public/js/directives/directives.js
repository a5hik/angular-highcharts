var directive = angular.module('directives', [])

.directive('plan', function() {

        var getPlanningFolderList = function () {

            return  [   {"id": "plan1001", "title": "plan1001"},
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
        };

        return {
            restrict: 'E',
            link: function(scope, elem, attrs) {
                scope.field.options = getPlanningFolderList();
            }
        };

})

.directive('tracker', function() {

    var getTrackerList = function () {

        return [
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
    };

    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            scope.field.options = getTrackerList();
        }
    };

});