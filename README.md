Jquery - Eggs Helper
====================

A simple plugin to help you insert Eggs

And focus on creativity...

Use :
-----

```javascript
$elm.egg( function() {
    $( this ).doStuff // $( this ) refers to $elm
});

... alter use
$.egg( function() {
    doStuff();
});

... optionnal parameters
$.egg({
    trace : true, // allow to trace your own keyCode (dev only)
    delay : 2000,   // default 1000 => time allowed between each keyPress
    keyCodes : [..] // your own keyCodes sequence
}, function() {
    doStuff();
});
```

TODO
----

Ideas welcome...