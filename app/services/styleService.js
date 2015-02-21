var modaApp = angular.module('modaApp');

modaApp.service("StyleREST", ["$http", "$log", StyleREST]);
function StyleREST($http, $log){
    this.getAllStyles = function ($scope) {
        console.log(STYLE_URL);
        $http.get(STYLE_URL).
            success(function (data) {
                console.log("getting data from server @styleServices ");
                console.log(data);
                $scope.styles = data.data;
                //Set the rigth and left columns for render -- refactoring pending...---
                for (var i = 0; i < $scope.styles.length; i++) {
                    if(i/2 == Math.round(i/2)){
                        $scope.rigthCol[$scope.rigthCol.length] = $scope.styles[i];
                    }else{
                        $scope.leftCol[$scope.leftCol.length] = $scope.styles[i];
                    }
                }
        });
    };
}
