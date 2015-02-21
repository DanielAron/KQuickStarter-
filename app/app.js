'use strict';

var BASE_URL = 'https://app.konacloud.io/api/';

//TestAngularAPP URLs
var USER_APP_ANGULAR = 'daniel/TestAngularTemp/';
var URL_ANGULAR = BASE_URL + USER_APP_ANGULAR + 'mr_Employee';

var URL_BUCKET = "https://bucket.konacloud.io/external/api/bucket/daniel/TestAngularTemp/images"
var tmpFile;


//Moda URLs
var USER_APP_MODA = 'daniel/moda/';

var USER_URL_MODA = BASE_URL + USER_APP_MODA + 'mr_User';
var MERCHANT_URL = BASE_URL + USER_APP_MODA + 'mr_Merchant';
var MERCHANT_URL_WithDefaultLink = BASE_URL + USER_APP_MODA + 'mr_Merchant/getWithDefaultLink';
var STORE_URL = BASE_URL + USER_APP_MODA + 'mr_Store';
var STYLE_URL = BASE_URL + USER_APP_MODA + 'mr_Style';



var app = angular.module('MobileAngularUiExamples', [
    "ngRoute",
    "ngTouch",
    "mobile-angular-ui"
]);

/*
 -- Route provider
 */

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {templateUrl: "templates/listMerchants.html"});
//    $routeProvider.when('/', {templateUrl: "templates/listemployee.html"});
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


