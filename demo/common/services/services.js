/* Services */

var services = angular.module('services', ['ngResource']);

services.factory('Reports', ['$resource',
    function($resource){
        return $resource('assets/reports/:reportId.json', {}, {
            query: {method:'GET', params:{reportId:'reports'}, isArray:true}
        });
    }]);