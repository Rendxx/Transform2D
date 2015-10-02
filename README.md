# Transform2D
A simple way to implement CSS3 2D transform. Works in CSS2 as well.  
Available transformation includes: **rotation, scale, translate**.

Each transformation is considered as an independent event, which mean multiple transformations will not affect each other. The transformation will not be affect by the applying order.

**Margin**  is used to handle offset in CSS2. DO NOT change them after applying transform in this case.

![preview](https://raw.githubusercontent.com/Rendxx/Transform2D/master/preview.png "Preview")

*Sample: [http://www.rendxx.com/Lib/Sample/7](http://www.rendxx.com/Lib/Sample/7 "Sample")*  
*Download: [Transform 2D v3.2](https://github.com/Rendxx/Transform2D/releases/tag/3.2 "Download")*

# Dependency
- [jQuery][]

#API
    [jQuery Element].rotate();
    [jQuery Element].scale();
    [jQuery Element].translate();
    [jQuery Element].transform2D();

Get specific 2D transform data of the jQuery element. 

- rotate(): Rotation value in degree
- scale(): Array of scale ratio: 
  + *scale X*
  + *scale Y*
- translate(): Array of translate (unit: pixel):
  + *translate X*
  + *translate Y*
- transform2D(): Object includes all transform data
  + *rotate*
  + *scaleX*
  + *scaleY*
  + *translateX*
  + *translateY*

<div><br></div>

    [jQuery Element].rotate(degree);
Rotate the element clockwise.  
*Argument format: see note below*

<div><br></div>

    [jQuery Element].scaleX(ratio);
    [jQuery Element].scaleY(ratio);
    [jQuery Element].scale(ratio);
    [jQuery Element].scale(ratioArr);
Scale the element.

- **scaleX(ratio)**: Scale in X-axis.
- **scaleY(ratio)**: Scale in Y-axis.
- **scale(ratio)**: Scale in both X-axis and Y-axis.
- **scale(ratioArr)**: Scale in X-axis and Y-axis separately. *ratioArr: [scaleX, scaleY]*

*Argument format: see note below*

<div><br></div>

    [jQuery Element].translateX(offset);
    [jQuery Element].translateY(offset);
    [jQuery Element].translate(offsetArr);
Offset the element.

- **translateX(ratio)**: Offset in X-axis.
- **translateY(ratio)**: Offset in Y-axis.
- **translate(offsetArr)**: Offset in X-axis and Y-axis separately. *offsetArr: [offsetX, offsetY]*

*Argument format: see note below*

<div><br></div>

    [jQuery Element].transform2D(opts);
Transform the element by given options.
 
- **opts**
  + rotate
  + scaleX
  + scaleY
  + translateX
  + translateY


*Argument format: see note below*

<div><br></div>

> **Argument Format:**  
You can transform the element by 2 kinds of value:  
1. Number: Set the transformation of the given value.  
2. String start with "+=" or "-=" and following by a number: Adjust the transformation value from current situation by given value.

<div><br></div>

# Code Sample
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
//     }
```

# Compatibility
- Chrome
- Fire Fox
- Safari
- Edge
- IE 9-11
- IE 7,8

[jQuery]: https://jquery.com/ "jQuery Home Page"