'use strict';

var BASE_URL = 'http://app.konacloud.io/api/';
var USER_APP = 'santiago/CSV2Backend/';
var URL = BASE_URL + USER_APP + 'mr_employee';
var URL_BUCKET = "http://bucket.konacloud.io/external/api/bucket/taio/quickstarter/b1"
var tmpFile;

var app = angular.module('MobileAngularUiExamples', [
    "ngRoute",
    "ngTouch",
    "mobile-angular-ui"
]);

/*
 -- Route provider
 */

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {templateUrl: "templates/listemployee.html"});
    $routeProvider.when('/addnew', {templateUrl: "templates/addemployee.html"});
    $routeProvider.when('/edit/:id', {
        templateUrl: "templates/editemployee.html",
        controller: EditController
    });
    $routeProvider.when('/about', {templateUrl: "templates/about.html"});
});

/*
 -- Running, UI Changes on page changes
 THe button add new at the index has ng-hide = currentPath!=/
 */

app.run(['$rootScope', '$location', '$routeParams', function ($rootScope, $location, $routeParams) {
    $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
        $rootScope.currentPath = $location.path();
    })
}]);


