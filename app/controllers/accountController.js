var modaApp = angular.module('modaApp');

//This is not been used. The Search tab uses the AppCtrl controller
//merchantControllers.controller('SearchCtrl', function($scope) {
//});
modaApp.controller('AccountCtrl', function($scope) {
});

modaApp.controller('LoginController', function ($rootScope, $scope, $http,$location) {
    $rootScope.user = {};
    $rootScope.loginData = {};

    $rootScope.addNewUser = function () {
      $http.post(USER_URL, $scope.user).
          success(function (data, status, headers, config) {
              $scope.user = {};
              window.history.back();
          }).
          error(function (data, status, headers, config) {
              alert(status);
          });
    };

    $rootScope.login = function () {
      console.log($scope.loginData);
      $http.post(USER_URL + "/login", $scope.loginData).
          success(function (data, status, headers, config) {
              $scope.login = {};
              console.log(data);
              if (!data.success) {
                alert(data.errorMsg);
                location.reload();
              }else if (!data.data.success) {
                alert('User or password incorrect');
                location.reload();
              }else {
                $location.path("/tab/merchants");
              }
              $scope.loginData = {};
          }).
          error(function (data, status, headers, config) {
              alert(status);
          });
    };
});
