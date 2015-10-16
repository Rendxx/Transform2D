# Transform2D
A simple way to implement CSS3 2D transform. Works in CSS2 as well.  
Available transformation includes: **rotation, scale, translate**.

Each transformation is considered as an independent event, which mean multiple transformations will not affect each other. The transformation will not be affect by the applying order.

>**Margin**  is used to handle offset in CSS2. BE CALEFUL to change them after applying transform in this case.

![preview](https://raw.githubusercontent.com/Rendxx/Transform2D/master/preview.png "Preview")

*Sample: [http://www.rendxx.com/Lib/Sample/7](http://www.rendxx.com/Lib/Sample/7 "Sample")*  
*Download: [Transform 2D v0.4.0](https://github.com/Rendxx/Transform2D/releases/tag/0.4.0 "Download")*

## Install
Download the package from bower
```
bower install transform2D --save
```

Including the file in your webpage
```HTML
<script type="text/javascript" src="/node_modules/transform2D/js/Transform2D.js"></script>
```

## API
[API Document](https://github.com/Rendxx/Transform2D/blob/master/API%20Document.md)

## Dependency
- [jQuery][]

## Code Sample
JavaScript:
```javascript
$("#sample").rotate("30");  // set the rotation by 30 degree clockwise
$("#sample").rotate("-=10"); // rotate -10 degree clockwise, now the rotation is 20 degree
$("#sample").scale(["-=0.1",1.1]); // scale X-axis by 1-0.1 = 0.9, scale Y-axis by 1.1
$("#sample").transform2D({ // move the element 30 pixel to right
     translateX: 30
});
var data = $("#sample").transform2D();
// data = {
//     rotate: 20, 
//     scaleX: 0.8999996188071415, 
//     scaleY: 1.0999981767639435, 
//     translateX: 30, 
//     translateY: 0
// }
```

## Compatibility
```Chrome``` ```Fire Fox``` ```Safari``` ```Edge``` ```IE 9-11``` ```IE 7,8```

## License
Copyright &copy; 2015, Rendxx. (MIT License)  
See [LICENSE][] for more info.

[jQuery]: https://jquery.com/ "jQuery Home Page"
[LICENSE]: https://github.com/Rendxx/Transform2D/blob/master/LICENSE