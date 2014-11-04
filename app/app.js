'use strict';

var BASE_URL = 'http://localhost:8080/KONAConsole/api/';
var USER_APP = 'taio/quickstarter/';

var app = angular.module('MobileAngularUiExamples', [
    "ngRoute",
    "ngTouch",
    "mobile-angular-ui"
]);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {templateUrl: "templates/listEmployee.html"})
});

app.controller('MainController', function ($scope, $http) {

    $scope.filter = {value: ''}; //init the filter

    $scope.search = function(keyEvent) {
        if (keyEvent.which === 13) {//enter is pressed
            var value = $scope.filter.value;
            if (value == '') {
                getAllEmployees();
            } else {
                getEmployesByNameLike(value);
            }
        }
    }

    var getEmployesByNameLike = function(name) {
        $http.get(BASE_URL + USER_APP + 'mr_Employee/find?name='+name).
            success(function (data) {
                console.log("getting data from server ");
                console.log(data);
                $scope.employees = data.data;
            });
    }

    var getAllEmployees = function() {
        $http.get(BASE_URL + USER_APP + 'mr_Employee').
            success(function (data) {
                console.log("getting data from server " + data);
                $scope.employees = data.data;
            });
    }

    getAllEmployees(); //call this in in the first time
});