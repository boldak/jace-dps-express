---
title: collection.countby
template: index.njk
---
# collection.countby
Creates an object composed of keys generated from the results of running each element of collection thru iteratee. The corresponding value of each key is the number of times the key was returned by iteratee.


### Aliases
They are follows aliases of command name: 
+ ```collection.countby```,  
+ ```collection.countBy```, 
+ ```c.countby```, 
+ ```c.countBy```, 
+ ```c.count```.


### Command parameters
    
+ ```mapper```(aliased as ```by```) - **default command parameter** is a function that maps a collection item to a projection for counting values.
+ **Processed collection should be on the head of script context.** 

Default value of ```mapper``` is defined as:


```js
    item => item
``` 

### How to use

```dps

/**
 **
 **     DATA PROCESSING SCRIPT: countby example
 **     SERVICE: https://nevada-jace-dps.herokuapp.com
 **
 **/

<?javascript
    $scope.data = [1,0,0,0,1,0]
    $scope.collection = [
        { key: "age", value:"10"},
        { key: "type", value:"truck"},
        { key: "type", value:"vehicle"}
    ]
?>

get("data")
c.countby()
set("res.valuesDistribution")

get("collection")
c.countBy(<? item => item.key ?>)
set("res.keys")

get("res")

```

This data processing script returns

```json
    {
        "valuesDistribution": {
            "0": 4,
            "1": 2
        },
        "keys": {
            "age": 1,
            "type": 2
        }
    }
```