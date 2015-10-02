$(function () {
    var squ = $(".squ");
    var msg = $(".msg");
    var opts = {};

    msg.text("rotate");

    var showTransform = function () {
        info = squ.transform2D();
        msg.html(
            "<span>Rotate:</span> " + info.rotate + " deg" +
            "<br/><span>Scale-x:</span> " + info.scaleX +
            "<br/><span>Scale-y:</span> " + info.scaleY +
            "<br/><span>Translate-x:</span> " + info.translateX + "px" +
            "<br/><span>Translate-y:</span> " + info.translateY + "px"
            );
    };
    showTransform();

    $(".rotate-1").click(function () {
        if (!('rotate' in opts)) { opts.rotate = 0; }
        opts.rotate += 10;
        //squ.transform2D(opts);
        squ.rotate(opts.rotate);
        showTransform();
    });
    $(".rotate-2").click(function () {
        if (!('rotate' in opts)) { opts.rotate = 0; }
        opts.rotate -= 10;
        //squ.transform2D(opts);
        squ.rotate("-=10");
        showTransform();
    });
    $(".scale-1").click(function () {
        if (!('scaleX' in opts)) { opts.scaleX = 1; }
        if (!('scaleY' in opts)) { opts.scaleY = 1; }
        opts.scaleX += 0.1;
        opts.scaleY += 0.1;
        //squ.transform2D(opts);
        squ.scale("+=0.1");
        showTransform();
    });
    $(".scale-2").click(function () {
        if (!('scaleX' in opts)) { opts.scaleX = 1; }
        if (!('scaleY' in opts)) { opts.scaleY = 1; }
        opts.scaleX -= 0.1;
        opts.scaleY -= 0.1;
        //squ.transform2D(opts);
        squ.scale(["-=0.1", "-=0.1"]);
        showTransform();
    });
    $(".translate-1").click(function () {
        if (!('translateX' in opts)) { opts.translateX = 0; }
        opts.translateX += 10;
        //squ.transform2D(opts);
        squ.translateX(opts.translateX);
        showTransform();
    });
    $(".translate-2").click(function () {
        if (!('translateY' in opts)) { opts.translateY = 0; }
        opts.translateY += 10;
        //squ.transform2D(opts);
        squ.translate([null, opts.translateY]);
        showTransform();
    });
    $(".translate-2").click(function () {
        if (!('translateY' in opts)) { opts.translateY = 0; }
        opts.translateY += 10;
        //squ.transform2D(opts);
        squ.translate([null, opts.translateY]);
        showTransform();
    });
    $(".reset").click(function () {
        if (!('translateY' in opts)) { opts.translateY = 0; }
        opts.translateY += 10;

        opts = {
            rotate: 0,
            scaleX: 1,
            scaleY: 1,
            translateX: 0,
            translateY: 0
        };
        //squ.transform2D(opts);
        squ.transform2D(opts);
        showTransform();
    });
});