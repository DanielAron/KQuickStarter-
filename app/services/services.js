/**
 * Created by santiago on 11/6/14.
 */

app.factory('EmployeesContextState', function () {


    var shinyNewServiceInstance = {
        update: function () {
            console.log('EmployeesContextState');
        }
    };
    // factory function body that constructs shinyNewServiceInstance
    return shinyNewServiceInstance;
});