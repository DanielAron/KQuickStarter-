var app = angular.module('modaApp');

app.directive('lazy', function($timeout) {
    return {
      restrict: 'C',
      link: function (scope, elm) {
        $timeout(function() {
          $(elm).lazyload({
            effect: 'fadeIn',
            failure_limit : 100,
            threshold : 200,
            effectspeed: 1000,
            skip_invisible: false
          });
//        $scope.$apply();
        }, 0);
      }
    };
  });


//app.directive('lazy', function($timeout) {
//    return {
//      restrict: 'C',
//      link: function (scope, elm) {
//        $timeout(function() {
//          $(elm).lazyload({
//            effect: 'fadeIn',
//            failure_limit : 100,
//            threshold : 200,
//            effectspeed: 1000,
//            skip_invisible: false
//          });
//        $scope.$apply();
//        }, 0);
//      }
//    };
//  });
