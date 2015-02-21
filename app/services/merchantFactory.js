var modaApp = angular.module('modaApp');

//This is the search implementation. MUST REFACT... al menos el nombre de la clase
modaApp.factory('FlightDataService', function($q, $timeout) {
    var searchAirlines = function($scope, searchFilter) {
        //console.log('Searching airlines for ' + searchFilter);
        var deferred = $q.defer();
        var matches = [];
        if (searchFilter){
            matches = $scope.merchants.filter( function(merchant) {
                if(merchant.name.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1 ) return true;
            })
        }
        $timeout( function(){
           deferred.resolve( matches );
        }, 100);
        return deferred.promise;
    };
    return {
        searchAirlines : searchAirlines
    }
});


/**
 * NOT IN USE. It should make a refactoring from .services to .factory on Merchants
 * A simple example service that returns some data.
 */
//merchantFactoies.factory('Merchants', function (){
//
//  // Might use a resource here that returns a JSON array
//  // Some fake testing data
//  var merchants = [
//    { id: 0, name: 'Scruff McGruff' },
//    { id: 1, name: 'G.I. Joe' },
//    { id: 2, name: 'Miss Frizzle' },
//    { id: 3, name: 'Ash Ketchum' }
//  ];
//
//  return {
//    all: function($scope) {
//      return $scope.data.merchants;
//    },
//    get: function($scope, merchantId) {
//      return $scope.merchants[merchantId];
//    }
//  }
//});
