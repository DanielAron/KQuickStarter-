/**
 * Created by santiago on 11/6/14.
 */

function EditController($rootScope,$scope, $route, $http, $location, EmployeesContextState) {
    tmpFile = null;
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

    $scope.editEmployee = function () {

        var fileUrl = $scope.employee.medium;
        if (tmpFile != null) {
            //update the URL
            var file = tmpFile;
            var uploadUrl = URL_BUCKET;
            var fd = new FormData();
            fd.append('file', file);
            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
                .success(function (data) {

                    if (data.data.length == 0) {
                        alert("some error posting image :(");
                        return;
                    }
                    fileUrl = data.data[0].url;
                    saveEmployee(fileUrl);
                })
                .error(function (e) {
                    alert(e);
                });
        } else {
            saveEmployee(fileUrl);
        }
    };

    saveEmployee = function (url) {
        //now we call the service, posting the employee
        $scope.employee.medium = url;
        console.log($scope.employee);
        console.log(URL);
        $http.put(URL, $scope.employee).
            success(function (data, status, headers, config) {
                console.log("final response")
                tmpFile = null; //reset thte file
                $scope.employee = {};
                $location.path("/");
                //location.reload();
                updateEmployees();
            }).
            error(function (data, status, headers, config) {
                alert(status);
            });
    }

    $scope.deleteEmployee = function () {
        console.log("deleteEmployee");
        $http.delete(URL + "?id=" + $scope.employee._id).
            success(function (data) {
                console.log("deleteEmployee response");
                console.log(data);
                tmpFile = null; //reset thte file
                $scope.employee = {};
                $location.path("/");
                //location.reload();
                updateEmployees();
            });
    }

    var updateEmployees = function () {
        $http.get(URL).
            success(function (data) {
                console.log("getting data from server ");
                console.log(data);
                $rootScope.employees = data.data;
            });
    }
}
//
app.controller('EditController', function ($scope, $http, $location) {
    console.log("Hi from EditController");
    console.log("*scope.epl");
    console.log($scope.employee);

});

