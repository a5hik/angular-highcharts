var services = angular.module('services', ['ngResource']);

services.factory('ReportTemplateService', ['$resource',
    function ($resource) {
        return $resource('./data/reports/:reportType.json', {}, {
            query: {method: 'GET', params: {reportType: 'reports'}, isArray: true}
        });
    }]);

services.factory('DataSharingService', function () {
    return {};
});

services.factory('ReportService', ['$resource', function ($resource) {

    return {
        reports: $resource('/api/reports/:reportId', {}, {
            get: {method: 'GET', params: {reportId: '@_id'}},
            update: {method: 'PUT', params: {reportId: '@_id'}},
            delete: {method: 'DELETE', params: {reportId: '@_id'}}
        }),
        reportsList: $resource('/api/reports', {}, {
            add: {method: 'POST'},
            get: {method: 'GET', params: {}, isArray:true}
        }),
        reportsType: $resource('/api/reportsList/:type', {}, {
            get: {method: 'GET', params: {type: '@type'}, isArray:true}
        })
    };
}]);

services.factory('ChartService', function () {
    return {
        randomSeries: function () {
            return getRandomSeries();
        }
    };
});

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