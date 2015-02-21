var modaApp = angular.module('modaApp');

modaApp.service("StoresREST", ["$http", "$log", StoresREST]);
function StoresREST($http, $log){
    this.getStoresById = function ($scope, storeId) {
            var url = STORE_URL + '?id=' + storeId;
            console.log('url to find ' + url);
            $http.get(url).
                success(function (data) {
                    console.log("getting data from server ");
                    console.log(data);
                    $scope.store = data.data;
                });
        };
    
    this.getStoresByNameLike = function (name, $scope) {
            var url = STORE_URL + '/find?name=' + name;
            console.log('url to find ' + url);
            $http.get(url).
                success(function (data) {
                    console.log("getting data from server ");
                    console.log(data);
                    $scope.stores = data.data;
                });
        };

    this.getAllStores = function ($scope) {
        console.log(STORE_URL);
        $http.get(STORE_URL).
            success(function (data) {
                console.log("getting data from server ");
                console.log(data);
                $scope.stores = data.data;
                //Add click and close event to Markers
                angular.forEach($scope.stores, function(store){
                    store.onClick = function(){
                        console.log(store.name);
                        //            $scope.selected.show = false;
                        //            $scope.selected = value;
                        //            $scope.selected.show = !$scope.selected.show;
                        //            $scope.$apply();
                    };
                    store.CloseClick = function() {
                        //            $scope.selected.show = false;
                        //            console.log("CloseClicked");
                        //            $scope.$apply();
                    };
                });
        });
    };
}
