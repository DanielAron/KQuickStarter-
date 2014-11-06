/**
 * Created by santiago on 11/6/14.
 */


/*
 -- Directive to handle file input
 */

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    console.log(element[0].files[0]);
                    modelSetter(scope, element[0].files[0]);
                    tmpFile = scope.myFile;

                });
            });
        }
    };
}]);