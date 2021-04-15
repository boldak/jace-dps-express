---
title: collection.select
template: index.njk
---

Select instances from collection


```dps
<?javascript
    var f1 = function(d){

             return d < 0};
             var f2 = function(d){
                return d == 0
                };
                var f3 = function(d){
                    return d > 0

                                  };
?>
set('filters')
<?json
[-2, -1, 0, 1, 2]
?>
set('data')
filter({{filters.f1}})
info()
get(var:'data'), as:'json')
filter({{filters.f2}})
info()
get(var:'data'), as:'json')
filter({{filters.f3}})
info()
log()


```

