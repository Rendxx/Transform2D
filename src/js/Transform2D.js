/************************************************ 
 
Transform 2D
Copyright (c) 2014-2015 Dongxu Ren  http://www.rendxx.com/
 
License: MIT (http://www.opensource.org/licenses/mit-license.php)
Version: 0.4.1
Update: 2015-10-16

Description:
   A simple way to implement CSS3 2D transform. Works in CSS2 as well. 
   Available transformation includes: rotation, scale, translate.

   Each transformation is considered as an independent event, which mean multiple transformations will not affect each other.
   The order of transformstion in CSS3 is Translate -> Rotate -> Scale.

   This library supports IE 7-8 as well. Margin attribute is used to handle offset in this case. DO NOT change margin after applying transform in IE7-8
      
Compatibility:
    Chrome; Fire Fox; Safari; Edge; IE 9-11; IE 7,8;

Dependency:
   jQuery

API:
  Get 2D Transform data:
    [jQuery Element].rotate();
    - (number) get rotation of the element (in deg)

    [jQuery Element].scale();
    - ([number, number]) get scale ratio of the element (in [Scale X, Scale Y])

    [jQuery Element].translate();
    - ([number, number]) get translate of the element(in [Translate X, Translate Y])
     
    
    [jQuery Element].transform2D();
    - (object) get all transform2D of the element
    - returned object data:
        {
            rotate: (number)
            scaleX: (number)
            scaleY: (number)
            translateX: (number)
            translateY: (number)
        }
        

  Set 2D Transform:
    Note: For all arguments, "+=" and "-=" at the head of an option mean add/minus given value based on current value, otherwise mean transform to that specific situation.

    [jQuery Element].rotate(deg);
    - Rotate the element clockwise
    - Arguments:
        deg: rotate the given degree, positive value means clockwise (number/string)

    [jQuery Element].scaleX(ratio);
    - Scale the element in X by the given ratio
    - Arguments:
        ratio: scale in x-axis (number/string)
    
    [jQuery Element].scaleY(ratio);
    - Scale the element in Y by the given ratio
    - Arguments:
        ratio: scale in y-axis (number/string)

    [jQuery Element].scale(ratio);
    - Scale the element in both X and Y by the given ratio
    - Arguments:
        ratio: scale in both x-axis and y-axis (number/string)

    [jQuery Element].scale(ratioArr);
    - Scale the element in  X and Y separately
    - Arguments:
        ratioArr: [ratioX, ratioY]
     
    [jQuery Element].translateX(offset);
    - Offset the element in X
    - Arguments:
        offset: offset in x-axis, positive value means right (number/string)
     
    [jQuery Element].translateY(offset);
    - Offset the element in Y
    - Arguments:
        offset: offset in y-axis, positive value means bottom (number/string)
     
    [jQuery Element].translate(offsetArr);
    - Offset the element in X and Y separately
    - Arguments:
        offsetArr: [offsetX,offsetY]

    [jQuery Element].transform2D(opts);
    - transform the element by given option
    - Arguments:
        opts
            {
                rotate: (number/string)
                scaleX: (number/string)
                scaleY: (number/string)
                translateX: (number/string)
                translateY: (number/string)
            }
************************************************/
(function ($) {
    "use strict";
    // Private Function -----------------------------------------------
    var keyName = "Rtransform2D";
    var isOldIE = null;
    var detectOldIE = function (ele) {
        var detect = $('<!--[if lt IE 7]><div class="ieDetect ie6"> <![endif]-->' +
          '<!--[if IE 7]><div class="ieDetect ie7"> <![endif]-->' +
          '<!--[if IE 8]><div class="ieDetect ie8"> <![endif]-->' +
          '<!--[if gt IE 8]><!--><div class="ieDetect yes"><!--<![endif]-->' +
          '</div>');
        detect.appendTo($("body"));
        if ($('.ieDetect').hasClass('yes')) {
            detect.remove();
            return false;
        }
        detect.remove();
        return true;
    };

    var getMatrix = function (ele) {
        var matrix = ele.css("-webkit-transform") ||
            ele.css("-moz-transform") ||
            ele.css("-ms-transform") ||
            ele.css("-o-transform") ||
            ele.css("transform") ||
            "none";
        //console.log(matrix);
        if (matrix === "none") {
            // Deal with IE
            matrix = ele.css("-ms-filter") ||
                ele.css("filter") ||
                "none";
            if (matrix === "none" || matrix.indexOf("DXImageTransform.Microsoft.Matrix") < 0) return [1, 0, 0, 1, 0, 0];
            matrix = matrix.split('(')[1].split(')')[0].split(',');
            var matrix2 = [];
            matrix2[0] = matrix[0].split('=')[1];
            matrix2[1] = matrix[2].split('=')[1];
            matrix2[2] = matrix[1].split('=')[1];
            matrix2[3] = matrix[3].split('=')[1];
            matrix2[4] = 0;
            matrix2[5] = 0;

            return matrix2;
        }
        return matrix.split('(')[1].split(')')[0].split(',');
    };

    var matrixMult = function (m1, m2) {
        m = [0, 0, 0, 0, 0, 0];
        m[0] = m1[0] * m2[0] + m1[2] * m2[1];
        m[1] = m1[1] * m2[0] + m1[3] * m2[1];
        m[2] = m1[0] * m2[2] + m1[2] * m2[3];
        m[3] = m1[1] * m2[2] + m1[3] * m2[3];
        m[4] = m1[0] * m2[4] + m1[2] * m2[5] + m1[4];
        m[5] = m1[1] * m2[4] + m1[3] * m2[5] + m1[5];
        return m;
    };
    var getRotate = function (ele) {
        var angle = 0;
        var matrix = getMatrix(ele);
        if (matrix != null) {
            var a = matrix[0];
            var b = matrix[1];
            angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        } else {
            angle = 0;
        }
        return (angle < 0) ? angle += 360 : angle;
    };
    var getScale = function (ele) {
        var matrix = getMatrix(ele);
        var rst = [1, 1];
        if (matrix == null) return rst;
        rst[0] = Math.sqrt(matrix[0] * matrix[0] + matrix[1] * matrix[1]);
        rst[1] = Math.sqrt(matrix[2] * matrix[2] + matrix[3] * matrix[3]);
        return rst;
    };
    var getTranslate = function (ele) {
        if (isOldIE) {
            var para = ele.data(keyName);
            if (para != null)
                return [Number(para.translateX), Number(para.translateY)];
            else
                return [0, 0];
        }
        var matrix = getMatrix(ele);
        return [Number(matrix[4]), Number(matrix[5])];
    };

    // API ------------------------------------------------------------
    // Get/Set Rotation
    $.fn.rotate = function (deg) {
        if (deg == null) return getRotate($(this));
        $(this).transform2D({
            rotate: deg
        });
    };

    // Get/Set Scale
    $.fn.scale = function (ratio) {
        if (ratio == null) return getScale($(this));
        if (typeof ratio == 'object')
            $(this).transform2D({
                scaleX: ratio[0],
                scaleY: ratio[1]
            });
        else
            $(this).transform2D({
                scaleX: ratio,
                scaleY: ratio
            });
    };

    // Get/Set Scale X
    $.fn.scaleX = function (ratio) {
        if (ratio == null) return getScale($(this))[0];
        $(this).transform2D({
            scaleX: ratio
        });
    };

    // Get/Set Scale Y
    $.fn.scaleY = function (ratio) {
        if (ratio == null) return getScale($(this))[1];
        $(this).transform2D({
            scaleY: ratio
        });
    };

    // Get/Set Translate
    $.fn.translate = function (offset) {
        if (offset == null) return getTranslate($(this));
        if (typeof offset == 'object')
            $(this).transform2D({
                translateX: offset[0],
                translateY: offset[1]
            });
        else
            $(this).transform2D({
                translateX: offset,
                translateY: offset
            });
    };

    // Get/Set Translate X
    $.fn.translateX = function (offset) {
        if (offset == null) return getTranslate($(this))[0];
        $(this).transform2D({
            translateX: offset
        });
    };

    // Get/Set Translate Y
    $.fn.translateY = function (offset) {
        if (offset == null) return getTranslate($(this))[1];
        $(this).transform2D({
            translateY: offset
        });
    };

    // parse the option to processed 
    // processed data: [mark, value]
    // mark: true: equal to,  false:add
    var _parseOpts = function (options) {
        // get opts based on current transform data
        var input;
        var tmp;
        var operationIdx = -1;
        var opts = {};

        for (var i in options) {
            if (options.hasOwnProperty(i) && options[i] != null) {
                input = options[i];
                if (typeof input == "string") {
                    operationIdx = input.indexOf("+=");
                    if (operationIdx != -1) {
                        input = parseFloat(input.substring(operationIdx + 2));
                        if (input == input) opts[i] = [false, input];
                        continue;
                    }

                    operationIdx = input.indexOf("-=");
                    if (operationIdx != -1) {
                        input = -parseFloat(input.substring(operationIdx + 2));
                        if (input == input) opts[i] = [false, input];
                        continue;
                    }

                    input = parseFloat(input);
                    if (input == input) opts[i] = [true, input];
                } else if (typeof input == "number") {
                    opts[i] = [true, input];
                }
            }
        }

        return opts;
    };

    // get the transform information from given options
    var _getTransform = function (transform, ele) {
        // get opts based on current transform data
        var tmp;
        var operationIdx = -1;

        var opts = ele.transform2D();
        for (var i in transform) {
            if (transform.hasOwnProperty(i)) {
                if (transform[i][0]) opts[i] = transform[i][1];
                else opts[i] += transform[i][1];
            }
        }

        return opts;
    };

    // Set Css3 2D transform
    // Sequence:  Translate > Scale > Rotate
    // Get(if no input arguement) return: Translate information.
    $.fn.transform2D = function (options) {
        if (isOldIE == null) isOldIE = detectOldIE();
        if (options == null) {
            // get all transform data
            var scaleData = this.scale();
            var translateData = this.translate();
            return {
                rotate: this.rotate(),
                scaleX: scaleData[0],
                scaleY: scaleData[1],
                translateX: translateData[0],
                translateY: translateData[1]
            };
        } else {
            options = _parseOpts(options);
            // set all transform data
            this.each(function () {
                var $this = $(this);
                options = _getTransform(options, $this);

                // handle transform
                if (!isOldIE) {
                    // Use Css 3 for modern browser
                    //var m_str = "matrix(" + m[0] + "," + m[2] + "," + m[1] + "," + m[3] + "," + m[4] + "," + m[5] + ")";
                    var m_str =
                        "translateX(" + options.translateX + "px) " +
                        "translateY(" + options.translateY + "px) " +
                        "rotate(" + options.rotate + "deg) " +
                        "scaleX(" + options.scaleX + ") " +
                        "scaleY(" + options.scaleY + ") ";

                    $this.css("-ms-transform", m_str);
                    $this.css("-webkit-transform", m_str);
                    $this.css("transform", m_str);

                } else {
                    // For IE 7 8
                    var radians = (options.rotate % 360) * (Math.PI / 180);
                    var scaleX = options.scaleX;
                    var scaleY = options.scaleY;
                    var translateX = options.translateX | 0;
                    var translateY = options.translateY | 0;

                    var m2 = matrixMult([Math.cos(radians), Math.sin(radians), -1 * Math.sin(radians), Math.cos(radians), 0, 0], [scaleX, 0, 0, scaleY, translateX, translateY]);
                    var m = [];
                    for (var i = 0; i < 6; i++) {
                        m[i] = String(m2[i]);
                        if (m[i].indexOf(".") == -1) m[i] += ".0";
                    }
                    // store original data
                    var para = $this.data(keyName);
                    var marginTop = 0;
                    var marginLeft = 0;

                    $this.css("-ms-filter", "");
                    $this.css("filter", "");

                    marginTop = parseInt($this.css('margin-top'));
                    if (marginTop != marginTop) marginTop = 0;
                    marginLeft = parseInt($this.css('margin-left'));
                    if (marginLeft != marginLeft) marginLeft = 0;

                    if (para != null) {
                        marginTop -= para.marginTop;
                        marginLeft -= para.marginLeft;
                    };

                    var original_w = $this.width();
                    var original_h = $this.height();

                    var m_str_ie = "progid:DXImageTransform.Microsoft.Matrix(M11=" + m[0] + ", M12=" + m[2] + ", M21=" + m[1] + ", M22=" + m[3] + ", SizingMethod='auto expand')";
                    $this.css("-ms-filter", m_str_ie);
                    $this.css("filter", m_str_ie);
                    var w2 = $this.width();
                    var h2 = $this.height();
                    var offset_w = ((w2 - original_w) / 2) | 0;
                    var offset_h = ((h2 - original_h) / 2) | 0;

                    para = {
                        translateX: translateX,
                        translateY: translateY,
                        marginTop: translateY - offset_h,
                        marginLeft: translateX - offset_w
                    };

                    $this.css("margin-left", (para.marginLeft + marginLeft) + "px");
                    $this.css("margin-top", (para.marginTop + marginTop) + "px");

                    $this.data(keyName, para);
                }
            });
            return this;
        }
    };
})(jQuery);