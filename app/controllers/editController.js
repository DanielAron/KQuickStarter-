/**
 * Created by santiago on 11/6/14.
 */

function EditController($scope, $route, $http) {
    console.log("id=" + $route.current.params.id);
    var url = URL + "?id=" + $route.current.params.id;
    console.log(url);
    $http.get(url).
        success(function (data) {
            console.log("EditController getting data from server ");
            console.log(data);
            $scope.employee = data.data;
            console.log($scope.employee);
        });
}
//
app.controller('EditController', function ($scope, $http, $location) {
    console.log("Hi from EditController");
    console.log("*scope.epl");
    console.log($scope.employee);

});

