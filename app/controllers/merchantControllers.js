var modaApp = angular.module('modaApp');

//Style list
//Working on this...
modaApp.controller('StyleCtrl', ["$scope", "StyleREST", function($scope, StyleREST) {
    $scope.style = [];
    $scope.rows = [];
    $scope.rigthCol = [];
    $scope.leftCol = [];
    StyleREST.getAllStyles($scope);
}]);

//Merchant mujer
modaApp.controller('MujerREST', ["$scope", "MerchantREST2", function($scope, MerchantREST2) {
    $scope.merchants = [];
    $scope.rows = [];
    $scope.rigthMerchants = [];
    $scope.leftMerchants = [];
    MerchantREST2.getMerchantsByCategory($scope, "mujer");
}]);

//Merchant hombre
modaApp.controller('HombreREST', ["$scope", "MerchantREST2", function($scope, MerchantREST2) {
    $scope.merchants = [];
    $scope.rows = [];
    $scope.rigthMerchants = [];
    $scope.leftMerchants = [];
    MerchantREST2.getMerchantsByCategory($scope, "hombre");
}]);

//Merchant deco
modaApp.controller('DecoREST', ["$scope", "MerchantREST2", function($scope, MerchantREST2) {
    $scope.merchants = [];
    $scope.rows = [];
    $scope.rigthMerchants = [];
    $scope.leftMerchants = [];
    MerchantREST2.getMerchantsByCategory($scope, "deco");
}]);


//Merchant list & Search
modaApp.controller('CtrlREST', ["$scope", "FlightDataService", "MerchantREST2", function($scope, FlightDataService, MerchantREST2) {
    $scope.merchants = [];
    $scope.rows = [];
    $scope.rigthMerchants = [];
    $scope.leftMerchants = [];
    MerchantREST2.getAllMerchants($scope);

    //
    $scope.mujer = [];
    MerchantREST2.getMerchantsByCategory($scope, "mujer");
    
    //$scope.merchant = Merchants.get($scope, $stateParams.merchantId);  //Use this after refactoring in order to use .factory in sted of .service
    //--- SEARCH ---
    $scope.data = { "merchants" : [], "search" : '' };
    $scope.cleanSearch = function(){
        $scope.data.search = '';
        $scope.data.merchants = [];
    };
    $scope.search = function() {
    	FlightDataService.searchAirlines($scope, $scope.data.search).then(
    		function(matches) {
    			$scope.data.merchants = matches;
    		}
            ),function(error) {
                console.log("An error happened -> " + error);
            };
    };
}]);

modaApp.controller('DetailCtrlREST', ["$scope", "$stateParams", "MerchantREST2", function($scope, $stateParams, MerchantREST2) {
    $scope.merchant = "";
    MerchantREST2.getMerchantsById($scope, $stateParams.merchantId);
}]);


//------------------Deprecated---------------
//Copy from here to make the 2 columns show
//and ngBarCode the Barcode scanner button
//modaApp.controller("merchantControllers", ["$scope", "FreshlyPressed", "FlightDataService", "$cordovaBarcodeScanner", "Merchants", "$log", AppCtrl]);
//function AppCtrl($scope, FreshlyPressed, FlightDataService, $cordovaBarcodeScanner, $log){
//    $scope.merchants = [];
//    $scope.rows = [];
//    $scope.rigthMerchants = [];
//    $scope.leftMerchants = [];
//    FreshlyPressed.getMerchants($scope);
//    //$scope.refresh = function(){
//    //    FreshlyPressed.getMerchants($scope);
//    //};
//    //--- SEARCH ---
//    $scope.data = { "merchants" : [], "search" : '' };
//    $scope.cleanSearch = function(){
//        $scope.data.search = '';
//        $scope.data.merchants = [];
//    };
//    $scope.search = function() {
//    	FlightDataService.searchAirlines($scope, $scope.data.search).then(
//    		function(matches) {
//    			$scope.data.merchants = matches;
//    		}
//            ),function(error) {
//                console.log("An error happened -> " + error);
//            };
//    };
//    //--- BARCODE SCANNER
//    $scope.scanBarcode = function() {
//        $cordovaBarcodeScanner.scan().then(function(imageData) {
//            alert(imageData.text);
//            console.log("Barcode Format -> " + imageData.format);
//            console.log("Cancelled -> " + imageData.cancelled);
//        }, function(error) {
//            console.log("An error happened -> " + error);
//        });
//    };
//}