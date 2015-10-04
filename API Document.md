
# API Document

## Get Current Transform Data
```javascript
$(jQuery Element).rotate();
$(jQuery Element).scale();
$(jQuery Element).translate();
$(jQuery Element).transform2D();
```

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
## Rotate
```javascript
$(jQuery Element).rotate(degree);
```
Rotate the element clockwise.  
*Argument format: see note below*

<div><br></div>
## Scale

```javascript
$(jQuery Element).scaleX(ratio);
$(jQuery Element).scaleY(ratio);
$(jQuery Element).scale(ratio);
$(jQuery Element).scale(ratioArr);
```
Scale the element.

- **scaleX(ratio)**: Scale in X-axis.
- **scaleY(ratio)**: Scale in Y-axis.
- **scale(ratio)**: Scale in both X-axis and Y-axis.
- **scale(ratioArr)**: Scale in X-axis and Y-axis separately. *ratioArr: [scaleX, scaleY]*

*Argument format: see note below*

<div><br></div>
## Translate

```javascript
$(jQuery Element).translateX(offset);
$(jQuery Element).translateY(offset);
$(jQuery Element).translate(offsetArr);
```
Offset the element.

- **translateX(ratio)**: Offset in X-axis.
- **translateY(ratio)**: Offset in Y-axis.
- **translate(offsetArr)**: Offset in X-axis and Y-axis separately. *offsetArr: [offsetX, offsetY]*

*Argument format: see note below*

<div><br></div>
## Transform

    $(jQuery Element).transform2D(opts);
Transform the element by given options.
 
- **opts**
  + rotate
  + scaleX
  + scaleY
  + translateX
  + translateY

*Argument format: see note below*

<div><br></div>

## Note
- **Argument Format:**  
2 kinds of format is available for transformation value:  
 1. Number: Set the transformation of the given value.  
 2. String start with "+=" or "-=" and following by a number: Adjust the transformation value from current situation by given value.

