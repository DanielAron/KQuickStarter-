
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

# Instalation guide


## Getting Started Offline

### Prerequisites

You need git to clone the kona-employees-list repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize and test kona-employees-list. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

### Clone kona-employees-list

Clone the kona-employees-list repository using [git][git]:

```
git clone https://github.com/sjcotto/KQuickStarter-
cd kona-employees-list
```

If you just want to start a new project without the kona-employees-list commit history then you can do:

```bash
git clone --depth=1 https://github.com/angular/kona-employees-list.git <your-project-name>
```

The `depth=1` tells git to only pull down one commit worth of historical data.

### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
kona-employees-list changes this location through the `.bowerrc` file.  Putting it in the app folder makes
it easier to serve the files by a webserver.*

### Run the Application

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/app/index.html`.



## Directory Layout

```
app/                    --> all of the source files for the application
  app.css               --> default stylesheet
  bower_components/     --> dependencies
  controllers/
    mainController.js
    editController.s
  app.js                --> main application module
  index.html            --> app layout file (the main html template file of the app)
  index-async.html      --> just like index.html, but loads js files asynchronously
karma.conf.js         --> config file for running unit tests with Karma
```

## Updating Angular

Previously we recommended that you merge in changes to kona-employees-list into your own fork of the project.
Now that the angular framework library code and tools are acquired through package managers (npm and
bower) you can use these tools instead to update the dependencies.

You can update the tool dependencies by running:

```
npm update
```

This will find the latest versions that match the version ranges specified in the `package.json` file.

You can update the Angular dependencies by running:

```
bower update
```

This will find the latest versions that match the version ranges specified in the `bower.json` file.


## Loading Angular Asynchronously

The kona-employees-list project supports loading the framework and application scripts asynchronously.  The
special `index-async.html` is designed to support this style of loading.  For it to work you must
inject a piece of Angular JavaScript into the HTML page.  The project has a predefined script to help
do this.

```
npm run update-index-async
```

This will copy the contents of the `angular-loader.js` library file into the `index-async.html` page.
You can run this every time you update the version of Angular that you are using.


### Running the App during Development

The kona-employees-list project comes preconfigured with a local development webserver.  It is a node.js
tool called [http-server][http-server].  You can start this webserver with `npm start` but you may choose to
install the tool globally:

```
sudo npm install -g http-server
```

Then you can start your own development web server to serve static files from a folder by
running:

```
http-server -a localhost -p 8000
```

Alternatively, you can choose to configure your own webserver, such as apache or nginx. Just
configure your server to serve the files under the `app/` directory.

## Contact

For more information on AngularJS please check out http://angularjs.org/
FOr more information on KONA Cloud please check out http://konacloud.io

[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[protractor]: https://github.com/angular/protractor
[jasmine]: http://jasmine.github.io
[karma]: http://karma-runner.github.io
[travis]: https://travis-ci.org/
[http-server]: https://github.com/nodeapps/http-server
