
# API Document

## Get Current Transform Data
#### $(jQuery Element).rotate() ```number```
Get rotation value in degree.
<h1></h1>

#### $(jQuery Element).scale() ```array```
Get an array of scale ratio:  
- *[scale X, scale Y]*
<h1></h1>

#### $(jQuery Element).translate() ```array```
Get an array of translate (unit: pixel):   
- *[translate X, translate Y]*
<h1></h1>

#### $(jQuery Element).transform2D() ```object```
Get an object includes all transform data (list below):
  + *rotate* ```number```
  + *scaleX* ```number```
  + *scaleY* ```number```
  + *translateX* ```number```
  + *translateY* ```number```
<h1></h1>

<div><br></div>

## Rotate
#### $(jQuery Element).rotate(degree)
Rotate the element clockwise.  

- **degree** ```number``` ```string```  
  *Argument format: [see Note below][note]*

<h1></h1>

<div><br></div>

## Scale
#### $(jQuery Element).scale(ratio)
Scale in both X-axis and Y-axis.

- **ratio** ```number``` ```string```  
  *Format: [see Note below][note]*

<h1></h1>

#### $(jQuery Element).scale(ratioArr)
Scale in X-axis and Y-axis separately.

- **ratioArr** ```array```  
  + **0: ratioX** ```number``` ```string```  
  + **1: ratioY** ```number``` ```string```  
  *Format: [see Note below][note]*

<h1></h1>

#### $(jQuery Element).scaleX(ratioX)
Scale only in X-axis.

- **ratioX** ```number``` ```string```  
  *Format: [see Note below][note]*

<h1></h1>

#### $(jQuery Element).scaleY(ratioY)
Scale only in Y-axis.

- **ratioY** ```number``` ```string```  
  *Format: [see Note below][note]*

<h1></h1>

<div><br></div>

## Translate
#### $(jQuery Element).translate(offsetArr)
Offset in X-axis and Y-axis separately.

- **offsetArr** ```array```  
  + **0: offsetX** ```number``` ```string```  
  + **1: offsetY** ```number``` ```string```  
  *Format: [see Note below][note]*

<h1></h1>

#### $(jQuery Element).translateX(offsetX)
Offset only in X-axis.

- **offsetX** ```number``` ```string```  
  *Format: [see Note below][note]*

<h1></h1>

#### $(jQuery Element).translateY(offsetY)
Offset only in Y-axis.

- **offsetY** ```number``` ```string```  
  *Format: [see Note below][note]*

<h1></h1>

<div><br></div>

## Transform
#### $(jQuery Element).transform2D(opts)
Transform the element by given options.
 
- **opts** ```object```  
  + **rotate** ```number``` ```string```  
  + **scaleX** ```number``` ```string```  
  + **scaleY** ```number``` ```string```  
  + **translateX** ```number``` ```string```  
  + **translateY** ```number``` ```string```  
    *Format: [see Note below][note]*

<div><br></div>

## Note
- **Argument Format:**  
2 kinds of format is available for transformation value:  
 1. ```Number```: Set the transformation of the given value.  
 2. ```String```: Start with "+=" or "-=" and following by a number. Adjust the transformation value from current situation by given value.

[note]: #note
