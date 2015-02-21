var modaApp = angular.module('modaApp');

//-- GOOGLE MAP --
//ref: https://angular-ui.github.io/angular-google-maps/#!/
modaApp.controller('MapCtrl', ['$scope', 'StoresREST', function ($scope, StoresREST) {
     $scope.map = {
        center: {
            latitude: -34.90725, 
            longitude: -56.15644
        }, 
        zoom: 14,
        options : {
            scrollwheel: false
        },
        control: {}
    };
    
    $scope.stores = [];
    StoresREST.getAllStores($scope);    
    
//    $scope.marker = {
//        id: 0,
//        coords: {
//            latitude: -34.90793,
//            longitude: -56.15721
//        },
//        options: {
//            draggable: false
//        }
//    };
}]);


//IONIC AND MAP EXAMPLE
//merchantControllers.controller('MapCtrl', function($scope, $ionicLoading, $compile) {
//    function initialize() {
//        var myLatlng = new google.maps.LatLng(43.07493,-89.381388);        
//        var mapOptions = {
//          center: myLatlng,
//          zoom: 16,
//          mapTypeId: google.maps.MapTypeId.ROADMAP
//        };
//        var map = new google.maps.Map(document.getElementById("map"),
//            mapOptions);
//        
//        //Marker + infowindow + angularjs compiled ng-click
//        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
//        var compiled = $compile(contentString)($scope);
//
//        var infowindow = new google.maps.InfoWindow({
//          content: compiled[0]
//        });
//
//        var marker = new google.maps.Marker({
//          position: myLatlng,
//          map: map,
//          title: 'Uluru (Ayers Rock)'
//        });
//
//        google.maps.event.addListener(marker, 'click', function() {
//          infowindow.open(map,marker);
//        });
//
//        $scope.map = map;
//      }//End initialize
//    
//    
//    google.maps.event.addDomListener(window, 'load', initialize);
//    $scope.centerOnMe = function() {
//        if(!$scope.map) {
//            return;
//        }
//        $scope.loading = $ionicLoading.show({
//          content: 'Getting current location...',
//          showBackdrop: false
//        });
//        navigator.geolocation.getCurrentPosition(function(pos) {
//          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
//          $scope.loading.hide();
//        }, function(error) {
//          alert('Unable to get location: ' + error.message);
//        });
//    };
//    $scope.clickTest = function() {
//        alert('Example of infowindow with ng-click')
//    };
//});
