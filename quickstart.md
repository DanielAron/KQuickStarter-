
#Employee List Template

## Demo

![Running](http://i.imgur.com/ydKaSAm.gif)

## Intro

This app is one of the KONA starter templates, as you can see in the demo it is a list of employee and the crud operations.
All the info come from the

RANDOM USER GENERATOR (http://randomuser.me/)
A free API for generating random user data. Like Lorem Ipsum, but for people.


## How to build the backend

The backend it's very simple, as always ;)

We have only one model named 'Employee' with these atributes

```js
{
  "gender" : "" ,
  "title" : "" ,
  "first" : "" ,
  "last" : "" ,
  "street" : "" ,
  "city" : "" ,
  "state" : "" ,
  "zip" : "" ,
  "email" : "" , 
  "phone" : "" ,
  "medium" : ""
}
```

Now, we have the CRUD operations that KONA has created, we now want to have a filter like in the demo
The Employee has 2 attributes 'first' and 'last' and we want to search in the two of them and the search must be like the sql ‘like’.
First we open the connection with our model (employee).

```var model = kona.model.open(‘employee’);```
The client send us the text to search by a param in the URL, so we get it with

```var name = req.params.get(“name”);```

And finally we build the object to do the query, with the MongoDB format.
We have an or for each attribute, and a regex in each case (with ```.* + name + .*```).
With the ```$regex : “.*” + name + “.*”``` the function match anything that contains our name.


```js
var find = function(req) {
    var name = req.params.get("name");
    var find  = [
        {
            first : {
                $regex : ".*" + name + ".*",
                $options: 'i'
            }    
        },
        {
            last : {
                $regex : ".*" + name + ".*",
                $options: 'i'
            }    
        }
    ];
    var obj = {
        $or : find
    }
    return model.buildQuery().find(toJson(obj)).list();
    
}
```

and we can use this api like

![Filter_Example](http://i.imgur.com/8iKL6hk.png)

That's all

## How to Build the client

For this example we choose angular, because it's Awesome :)
If you fork the project (https://github.com/sjcotto/KQuickStarter-) or use it in the website (inside of KONA)

We asume that do you know Angualar,

### GET Employees (list all employees)

The Angular template looks like these

```html
<div class="list-group-item" ng-repeat="e in employees">
    <a href="#/edit/{{e._id}}" class="item-list">
    <div class="person">
        <div class="avatar"><img src="{{e.medium + '?s=150'}}"></div>
        <div class="name"> <h3> {{e.first + ' ' +e.last}} </h3> <i class="fa fa-chevron-right pull-right"></i>    </div>
       <div class="clear"></div>
    </div>
    </a>
</div>
```

Just iterate inside the list employees in the scope, the employee list came from the GET API

file controller/mainController.js
```js
var getAllEmployees = function () {
        $http.get(URL).
            success(function (data) {
                if (!data.success) {
                  alert(data.msg); //some error
                }else{
                  $rootScope.employees = data.data;
                }
            });
    };
```

### POST one Employee

Using the other API automatically created we want to create a new employee.
First of all, the employee have a profile picture, so we must upload the image to a bucket and then call the POST method to create the Employee.

#### Upload a file

for this we create one directive ```fileModel```
and from the template looks like this

```html
<span class="btn btn-default btn-file">
  <i class="fa fa-camera"></i> Choose file <input type="file" file-model="myFile " accept="image/*"/>
</span>
```

Controller

```js
 $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined} //for the multipart boundary (the browser need it)
        })
          .success(function (data) {
              var url = data.data[0].url;
              $scope.employee.medium = url;
              
              $http.post(URL, $scope.employee).
                success(function (data, status, headers, config) {
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
```

The rest of the code it is similar to these examples
