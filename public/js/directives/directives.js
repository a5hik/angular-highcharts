var directive = angular.module('directives', [])

    .directive('plan', function () {

        var getPlanningFolderList = function () {

            return [
                    { text: "Instigators", children: [
                        { id: "plan1001", text: "Iteration 1" },
                        { id: "plan1002", text: "Iteration 2" },
                        { id: "plan1003", text: "Iteration 3" }
                    ] },
                    { text: "Titans", children: [
                        { id: "plan1005", text: "Iteration 1" },
                        { id: "plan1006", text: "Iteration 2" },
                        { id: "plan1007", text: "Iteration 3" }
                    ] },
                    { text: "Mavericks", children: [
                        { id: "plan1009", text: "Iteration 1" },
                        { id: "plan1010", text: "Iteration 2" },
                        { id: "plan1011", text: "Iteration 3" }
                    ] },
                    { text: "Spartans", children: [
                        { id: "plan1013", text: "Iteration 1" },
                        { id: "plan1014", text: "Iteration 2" },
                        { id: "plan1015", text: "Iteration 3" }
                    ] }
                ];
        };

        return {
            restrict: 'E',
            link: function (scope, elem, attrs) {
                scope.field.options = getPlanningFolderList();
            }
        };
    })

    .directive('tracker', function () {

        var getTrackerList = function () {

            return [
                {"id": "tracker1001", "text": "Epics"},
                {"id": "tracker1002", "text": "Stories"},
                {"id": "tracker1003", "text": "Tasks"},
                {"id": "tracker1004", "text": "Defects"}
            ];
        };

        return {
            restrict: 'E',
            link: function (scope, elem, attrs) {
                scope.field.options = getTrackerList();
            }
        };
    });