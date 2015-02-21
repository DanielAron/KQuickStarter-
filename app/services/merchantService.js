var modaApp = angular.module('modaApp');

modaApp.service("MerchantREST2", ["$http", "$log", MerchantREST2]);
function MerchantREST2($http, $log){
    this.getMerchantsById = function ($scope, merchantId) {
            var url = MERCHANT_URL_WithDefaultLink + '?id=' + merchantId;
            console.log('url to find ' + url);
            $http.get(url).
                success(function (data) {
                    console.log("getting data from server ");
                    console.log(data);
                    $scope.merchant = data.data;
                });
        };
    
    this.getMerchantsByNameLike = function (name, $scope) {
            var url = MERCHANT_URL + '/find?name=' + name;
            console.log('url to find ' + url);
            $http.get(url).
                success(function (data) {
                    console.log("getting data from server ");
                    console.log(data);
                    $scope.merchants = data.data;
                });
        };

    this.getMerchantsByCategory = function ($scope, filter) {
            var url = MERCHANT_URL + '/searchByCat?filter=' + filter;
            console.log('url to find ' + url);
            $http.get(url).
                success(function (data) {
                    console.log("getting data from server ");
                    console.log(data);
                    $scope.merchants = data.data;
                    for (var i = 0; i < $scope.merchants.length; i++) {
                        if(i/2 == Math.round(i/2)){
                            $scope.rigthMerchants[$scope.rigthMerchants.length] = $scope.merchants[i];
                        }else{
                            $scope.leftMerchants[$scope.leftMerchants.length] = $scope.merchants[i];
                        }
                    }
                });
        };
    
    this.getAllMerchants = function ($scope) {
            $http.get(MERCHANT_URL).
                success(function (data) {
                    console.log("getting data from server ");
                    console.log(data);
                    $scope.merchants = data.data;
                    //Set the rigth and left columns for render -- refactoring pending...---
                    for (var i = 0; i < $scope.merchants.length; i++) {
                        if(i/2 == Math.round(i/2)){
                            $scope.rigthMerchants[$scope.rigthMerchants.length] = $scope.merchants[i];
                        }else{
                            $scope.leftMerchants[$scope.leftMerchants.length] = $scope.merchants[i];
                        }
                    }
                });
        };
}