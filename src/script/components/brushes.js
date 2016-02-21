define(['../config'], function (config) {


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

        context.lineWidth = 1;
        context.strokeStyle = color;

        context.moveTo(x, y);
        context.lineTo(x + config.getSpacing(), y + config.getSpacing());

        context.stroke();
        context.closePath();
    };

    var _drawPositiveSlope = function _drawPositiveSlope(context, x, y, color) {
        context.beginPath();

        context.lineWidth = 1;
        context.strokeStyle = color;

        context.moveTo(x, y + config.getSpacing());
        context.lineTo(x + config.getSpacing(), y);

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
        context.lineWidth = 1;

        _drawLeft(context, _data.x, _data.y);
        _drawRight(context, _data.x, _data.y);
        _drawTop(context, _data.x, _data.y);
        _drawBottom(context, _data.x, _data.y);

        context.stroke();
        context.closePath();

        _drawNegativeSlope(context, _data.x, _data.y, _data.color);
        _drawPositiveSlope(context, _data.x, _data.y, _data.color);
    };

    var _brushLine = function _brushBox(context, data, snapMethod) {
        var _data = {
            startX: data.startX || 0,
            startY: data.startY || 0,
            endX: data.endX || 0,
            endY: data.endY || 0,
            color: data.color || 'black'
        };

        _data.startX = snapMethod(_data.startX);
        _data.startY = snapMethod(_data.startY);
        _data.endX = snapMethod(_data.endX);
        _data.endY = snapMethod(_data.endY);


        context.beginPath();
        context.strokeStyle = _data.color;
        context.lineWidth = 1;

        context.moveTo(_data.startX, _data.startY);
        context.lineTo(_data.endX, _data.endY);

        context.closePath();
        context.stroke();

    };


    return {
        "line": _brushLine,
        "box": _brushBox
    };

});