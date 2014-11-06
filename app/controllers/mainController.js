/**
 * Created by santiago on 11/6/14.
 */


app.controller('MainController', function ($scope, $http, $location) {

    $scope.filter = {value: ''}; //init the filter

    $scope.search = function (keyEvent) {
        if (keyEvent.which === 13) {//enter is pressed
            var value = $scope.filter.value;
            if (value == '') {
                getAllEmployees();
            } else {
                getEmployesByNameLike(value);
            }
        }
    };

    var getEmployesByNameLike = function (name) {
        var url = URL + '/find?name=' + name;
        console.log('url to find ' + url);
        $http.get(url).
            success(function (data) {
                console.log("getting data from server ");
                console.log(data);
                $scope.employees = data.data;
            });
    };

    var getAllEmployees = function () {
        $http.get(URL).
            success(function (data) {
                console.log("getting data from server ");
                console.log(data);
                $scope.employees = data.data;
            });
    };

    // -- init the employee
    $scope.employee = {};

    $scope.addNewEmployee = function () {

        if (tmpFile == null) {
            alert("Please, choose a image");
            return;
        }

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
                var url = data.data[0].url;
                //now we call the service, posting the employee
                $scope.employee.medium = url;
                console.log($scope.employee);
                console.log(URL);
                $http.post(URL, $scope.employee).
                    success(function (data, status, headers, config) {
                        console.log("final response")
                        getAllEmployees();
                        tmpFile=null; //reset thte file
                        $scope.employee = {};
                        $location.path("/");
                    }).
                    error(function (data, status, headers, config) {
                        alert(status);
                    });
            })
            .error(function (e) {
                alert(e);
            });
    };

    getAllEmployees(); //call this in in the first time
});