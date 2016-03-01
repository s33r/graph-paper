define(['config'], function (config) {


    var _drawTop = function (context, x, y) {
        context.moveTo(x, y);
        context.lineTo(x + config.getSpacing(), y);
    };

    var _drawBottom = function _drawBottom(context, x, y) {
        context.moveTo(x, y + config.getSpacing());
        context.lineTo(x + config.getSpacing(), y + config.getSpacing());
    };

    var _drawLeft = function _drawLeft(context, x, y) {
        context.moveTo(x, y);
        context.lineTo(x, y + config.getSpacing());
    };

    var _drawRight = function _drawRight(context, x, y) {
        context.moveTo(x + config.getSpacing(), y);
        context.lineTo(x + config.getSpacing(), y + config.getSpacing());
    };

    var _drawNegativeSlope = function _drawNegativeSlope(context, x, y, color) {
        context.beginPath();

        context.lineWidth   = 1;
        context.strokeStyle = color;

        context.moveTo(x, y);
        context.lineTo(x + config.getSpacing(), y + config.getSpacing());

        context.stroke();
        context.closePath();
    };

    var _drawPositiveSlope = function _drawPositiveSlope(context, x, y, color) {
        context.beginPath();

        context.lineWidth   = 1;
        context.strokeStyle = color;

        context.moveTo(x, y + config.getSpacing());
        context.lineTo(x + config.getSpacing(), y);

        context.stroke();
        context.closePath();
    };


    var _wallVertical = function _wallVertical(context, data, snapMethod) {
        var _data = {
            x: data.x || 0,
            y: data.y || 0,
            color: data.color || 'black'
        };

        _data.x = snapMethod(_data.x);
        _data.y = snapMethod(_data.y);

        context.beginPath();
        context.strokeStyle = _data.color;
        context.lineWidth   = 1;

        _drawLeft(context, _data.x, _data.y);
        _drawRight(context, _data.x, _data.y);

        context.stroke();
        context.closePath();

        _drawNegativeSlope(context, _data.x, _data.y);
    };

    var _wallHorizontal = function _wallHorizontal(context, data, snapMethod) {
        var _data = {
            x: data.x || 0,
            y: data.y || 0,
            color: data.color || 'black'
        };

        _data.x = snapMethod(_data.x);
        _data.y = snapMethod(_data.y);

        context.beginPath();
        context.strokeStyle = _data.color;
        context.lineWidth   = 1;

        _drawTop(context, _data.x, _data.y);
        _drawBottom(context, _data.x, _data.y);

        context.stroke();
        context.closePath();

        _drawNegativeSlope(context, _data.x, _data.y);
    };

    var _wallTopCap = function _wallTopCap(context, data, snapMethod) {
        var _data = {
            x: data.x || 0,
            y: data.y || 0,
            color: data.color || 'black'
        };

        _data.x = snapMethod(_data.x);
        _data.y = snapMethod(_data.y);

        context.beginPath();
        context.strokeStyle = data.color;
        context.lineWidth   = 1;

        _drawLeft(context, data.x, data.y);
        _drawRight(context, data.x, data.y);
        _drawTop(context, data.x, data.y);

        context.stroke();
        context.closePath();

        _drawNegativeSlope(context, data.x, data.y);
    };

    var _wallBottomCap = function _wallBottomCap(context, data, snapMethod) {
        var _data = {
            x: data.x || 0,
            y: data.y || 0,
            color: data.color || 'black'
        };

        _data.x = snapMethod(_data.x);
        _data.y = snapMethod(_data.y);

        context.beginPath();
        context.strokeStyle = data.color;
        context.lineWidth   = 1;

        _drawLeft(context, data.x, data.y);
        _drawRight(context, data.x, data.y);
        _drawBottom(context, data.x, data.y);

        context.stroke();
        context.closePath();

        _drawNegativeSlope(context, data.x, data.y);
    };

    var _wallRightCap = function _wallRightCap(context, data, snapMethod) {
        var _data = {
            x: data.x || 0,
            y: data.y || 0,
            color: data.color || 'black'
        };

        _data.x = snapMethod(_data.x);
        _data.y = snapMethod(_data.y);

        context.beginPath();
        context.strokeStyle = data.color;
        context.lineWidth   = 1;

        _drawTop(context, data.x, data.y);
        _drawRight(context, data.x, data.y);
        _drawBottom(context, data.x, data.y);

        context.stroke();
        context.closePath();

        _drawNegativeSlope(context, data.x, data.y);
    };

    var _wallLeftCap = function _wallLeftCap(context, data, snapMethod) {
        var _data = {
            x: data.x || 0,
            y: data.y || 0,
            color: data.color || 'black'
        };

        _data.x = snapMethod(_data.x);
        _data.y = snapMethod(_data.y);

        context.beginPath();
        context.strokeStyle = data.color;
        context.lineWidth   = 1;

        _drawLeft(context, data.x, data.y);
        _drawBottom(context, data.x, data.y);
        _drawTop(context, data.x, data.y);

        context.stroke();
        context.closePath();

        _drawNegativeSlope(context, data.x, data.y);
    };

    var _wallTopLeft = function _wallTopLeft(context, data, snapMethod) {
        var _data = {
            x: data.x || 0,
            y: data.y || 0,
            color: data.color || 'black'
        };

        _data.x = snapMethod(_data.x);
        _data.y = snapMethod(_data.y);

        context.beginPath();
        context.strokeStyle = _data.color;
        context.lineWidth   = 1;

        _drawLeft(context, _data.x, _data.y);
        _drawTop(context, _data.x, _data.y);

        context.stroke();
        context.closePath();

        _drawNegativeSlope(context, _data.x, _data.y);
    };

    var _wallTopRight = function _wallTopRight(context, data, snapMethod) {
        var _data = {
            x: data.x || 0,
            y: data.y || 0,
            color: data.color || 'black'
        };

        _data.x = snapMethod(_data.x);
        _data.y = snapMethod(_data.y);

        context.beginPath();
        context.strokeStyle = _data.color;
        context.lineWidth   = 1;

        _drawRight(context, _data.x, _data.y);
        _drawTop(context, _data.x, _data.y);

        context.stroke();
        context.closePath();

        _drawNegativeSlope(context, _data.x, _data.y);
    };

    var _wallBottomLeft = function _wallBottomLeft(context, data, snapMethod) {
        var _data = {
            x: data.x || 0,
            y: data.y || 0,
            color: data.color || 'black'
        };

        _data.x = snapMethod(_data.x);
        _data.y = snapMethod(_data.y);

        context.beginPath();
        context.strokeStyle = _data.color;
        context.lineWidth   = 1;

        _drawLeft(context, _data.x, _data.y);
        _drawBottom(context, _data.x, _data.y);

        context.stroke();
        context.closePath();

        _drawNegativeSlope(context, _data.x, _data.y);
    };

    var _wallBottomRight = function _wallBottomRight(context, data, snapMethod) {
        var _data = {
            x: data.x || 0,
            y: data.y || 0,
            color: data.color || 'black'
        };

        _data.x = snapMethod(_data.x);
        _data.y = snapMethod(_data.y);

        context.beginPath();
        context.strokeStyle = _data.color;
        context.lineWidth   = 1;

        _drawRight(context, _data.x, _data.y);
        _drawBottom(context, _data.x, _data.y);

        context.stroke();
        context.closePath();

        _drawNegativeSlope(context, _data.x, _data.y);
    };

    var _wallEmpty = function _wallEmpty(context, data, snapMethod) {

    };


    var _wallTTop = function _wallTTop(context, data, snapMethod) {
        var _data = {
            x: data.x || 0,
            y: data.y || 0,
            color: data.color || 'black'
        };

        _data.x = snapMethod(_data.x);
        _data.y = snapMethod(_data.y);

        context.beginPath();
        context.strokeStyle = _data.color;
        context.lineWidth   = 1;

        _drawTop(context, _data.x, _data.y);

        context.stroke();
        context.closePath();
    };

    var _wallTBottom = function _wallTBottom(context, data, snapMethod) {
        var _data = {
            x: data.x || 0,
            y: data.y || 0,
            color: data.color || 'black'
        };

        _data.x = snapMethod(_data.x);
        _data.y = snapMethod(_data.y);

        context.beginPath();
        context.strokeStyle = _data.color;
        context.lineWidth   = 1;

        _drawBottom(context, _data.x, _data.y);

        context.stroke();
        context.closePath();
    };

    var _wallTLeft = function _wallTLeft(context, data, snapMethod) {
        var _data = {
            x: data.x || 0,
            y: data.y || 0,
            color: data.color || 'black'
        };

        _data.x = snapMethod(_data.x);
        _data.y = snapMethod(_data.y);

        context.beginPath();
        context.strokeStyle = _data.color;
        context.lineWidth   = 1;

        _drawLeft(context, _data.x, _data.y);

        context.stroke();
        context.closePath();
    };

    var _wallTRight = function _wallTRight(context, data, snapMethod) {
        var _data = {
            x: data.x || 0,
            y: data.y || 0,
            color: data.color || 'black'
        };

        _data.x = snapMethod(_data.x);
        _data.y = snapMethod(_data.y);

        context.beginPath();
        context.strokeStyle = _data.color;
        context.lineWidth   = 1;

        _drawRight(context, _data.x, _data.y);

        context.stroke();
        context.closePath();
    };

    var _brushBox = function _brushBox(context, data, snapMethod) {
        var _data = {
            x: data.x || 0,
            y: data.y || 0,
            color: data.color || 'black'
        };

        _data.x = snapMethod(_data.x);
        _data.y = snapMethod(_data.y);

        context.beginPath();
        context.strokeStyle = _data.color;
        context.lineWidth   = 1;

        _drawLeft(context, _data.x, _data.y);
        _drawRight(context, _data.x, _data.y);
        _drawTop(context, _data.x, _data.y);
        _drawBottom(context, _data.x, _data.y);

        context.stroke();
        context.closePath();

        _drawNegativeSlope(context, _data.x, _data.y, _data.color);
        _drawPositiveSlope(context, _data.x, _data.y, _data.color);
    };

    var _brushLine = function _brushLine(context, data, snapMethod) {
        var _data = {
            startX: data.startX || 0,
            startY: data.startY || 0,
            endX: data.endX || 0,
            endY: data.endY || 0,
            color: data.color || 'black'
        };

        _data.startX = snapMethod(_data.startX);
        _data.startY = snapMethod(_data.startY);
        _data.endX   = snapMethod(_data.endX);
        _data.endY   = snapMethod(_data.endY);


        context.beginPath();
        context.strokeStyle = _data.color;
        context.lineWidth   = 1;

        context.moveTo(_data.startX, _data.startY);
        context.lineTo(_data.endX, _data.endY);

        context.closePath();
        context.stroke();

    };

    var _crosshair = function _crosshair(context, data, snapMethod) {
        var spacing = config.getSpacing();
        var _data   = {
            x: data.x || 0,
            y: data.y || 0,
            color: data.color || 'black'
        };

        _data.x = snapMethod(_data.x);
        _data.y = snapMethod(_data.y);

        context.beginPath();
        context.strokeStyle = _data.color;
        context.lineWidth   = 1;

        //_drawLeft(context, _data.x, _data.y);
        //_drawRight(context, _data.x, _data.y);
        //_drawTop(context, _data.x, _data.y);


        _drawBottom(context, _data.x - spacing, _data.y - spacing);
        _drawBottom(context, _data.x, _data.y - spacing);

        _drawRight(context, _data.x - spacing, _data.y - spacing);
        _drawRight(context, _data.x - spacing, _data.y);

        context.stroke();
        context.closePath();

        //_drawNegativeSlope(context, _data.x, _data.y, _data.color);
        //_drawPositiveSlope(context, _data.x, _data.y, _data.color);
    };

    return {
        "line": _brushLine,
        "box": _brushBox,
        "crosshair": _crosshair,

        "wall": _brushBox,
        "wall-empty": _wallEmpty,

        "wall-vertical": _wallVertical,
        "wall-horizontal": _wallHorizontal,

        "wall-cap-top": _wallTopCap,
        "wall-cap-bottom": _wallBottomCap,
        "wall-cap-left": _wallLeftCap,
        "wall-cap-right": _wallRightCap,

        "wall-corner-top-right": _wallTopRight,
        "wall-corner-top-left": _wallTopLeft,
        "wall-corner-bottom-right": _wallBottomRight,
        "wall-corner-bottom-left": _wallBottomLeft,

        "wall-t-top": _wallTTop,
        "wall-t-bottom": _wallTBottom,
        "wall-t-right": _wallTRight,
        "wall-t-left": _wallTLeft
    };

});