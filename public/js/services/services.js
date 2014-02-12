/* Services */

var services = angular.module('services', ['ngResource']);

services.factory('Reports', ['$resource',
    function ($resource) {
        return $resource('./data/reports/:reportId.json', {}, {
            query: {method: 'GET', params: {reportId: 'reports'}, isArray: true}
        });
    }]);

var getRandomDate = function (from, to) {
    if (!from) {
        from = new Date(1900, 0, 1).getTime();
    } else {
        from = from.getTime();
    }
    if (!to) {
        to = new Date(2100, 0, 1).getTime();
    } else {
        to = to.getTime();
    }
    return new Date(from + Math.random() * (to - from)).toDateString();
};

services.factory('ChartService', function () {
    return {
        randomSeries: function () {
            return getRandomSeries();
        }
    };
});

var getRandomSeries = function () {
    var toDate = new Date(2014, 0, 1);
    var fromDate = new Date(2013, 0, 1);
    var max = 150;
    var min = 50;
    return [
        {
            "name": "Sprint",
            "data": [
                {
                    "y": Math.round(Math.random() * (max - min) + min),
                    "name": getRandomDate(fromDate, toDate)
                },
                {
                    "y": Math.round(Math.random() * (max - min) + min),
                    "name": getRandomDate(fromDate, toDate)
                },
                {
                    "y": Math.round(Math.random() * (max - min) + min),
                    "name": getRandomDate(fromDate, toDate)
                },
                {
                    "y": Math.round(Math.random() * (max - min) + min),
                    "name": getRandomDate(fromDate, toDate)
                },
                {
                    "y": Math.round(Math.random() * (max - min) + min),
                    "name": getRandomDate(fromDate, toDate)
                }

            ]
        },
        {
            "name": "Backlog w/ un estimated items",
            "data": [
                {
                    "y": Math.round(Math.random() * (max - min) + min),
                    "name": getRandomDate(fromDate, toDate)
                },
                {
                    "y": Math.round(Math.random() * (max - min) + min),
                    "name": getRandomDate(fromDate, toDate)
                },
                {
                    "y": Math.round(Math.random() * (max - min) + min),
                    "name": getRandomDate(fromDate, toDate)
                },
                {
                    "y": Math.round(Math.random() * (max - min) + min),
                    "name": getRandomDate(fromDate, toDate)
                },
                {
                    "y": Math.round(Math.random() * (max - min) + min),
                    "name": getRandomDate(fromDate, toDate)
                }

            ]
        }
    ]
};