
#Employee List Template

## Demo

![Running](http://i.imgur.com/PFGyhdf.gif)

## Intro

This app is one of the KONA Starter tempates, as you can see in the demo it is a list of employee and the crud operarions.

## Backend

The backend it's very simple, as always ;)

We have one model named 'Employee' with these atributes

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
  "username" : "" ,
  "phone" : "" ,
  "cell" : "" ,
  "SSN" : "" ,
  "large" : "" ,
  "medium" : ""
}
```

Now, we hace the CRUD operarions that KONA has created, we now want to have a filter

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
