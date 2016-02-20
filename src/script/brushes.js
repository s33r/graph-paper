define([], function () {
    var cellSize = 16;

    var _drawTop = function (context, x, y) {
        context.moveTo(x, y);
        context.lineTo(x + cellSize, y);
    };

    var _drawBottom = function _drawBottom(context, x, y) {
        context.moveTo(x, y + cellSize);
        context.lineTo(x + cellSize, y + cellSize);
    };

    var _drawLeft = function _drawLeft(context, x, y) {
        context.moveTo(x, y);
        context.lineTo(x, y + cellSize);
    };

    var _drawRight = function _drawRight(context, x, y) {
        context.moveTo(x + cellSize, y);
        context.lineTo(x + cellSize, y + cellSize);
    };

    var _drawNegativeSlope = function _drawNegativeSlope(context, x, y, color) {
        context.beginPath();

        context.lineWidth = 1;
        context.strokeStyle = color;

        context.moveTo(x, y);
        context.lineTo(x + cellSize, y + cellSize);

        context.stroke();
        context.closePath();
    };

    var _drawPositiveSlope = function _drawPositiveSlope(context, x, y, color) {
        context.beginPath();

        context.lineWidth = 1;
        context.strokeStyle = color;

        context.moveTo(x, y + cellSize);
        context.lineTo(x + cellSize, y);

        context.stroke();
        context.closePath();
    };


    var _brushBox = function _brushBox(context, x, y, color) {
        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = 1;

        _drawLeft(context, x, y);
        _drawRight(context, x, y);
        _drawTop(context, x, y);
        _drawBottom(context, x, y);

        context.stroke();
        context.closePath();

        _drawNegativeSlope(context, x, y, color);
        _drawPositiveSlope(context, x, y, color);
    };

    var _brushLine = function _brushBox(context, x, y, color) {
        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = 1;

        _drawTop(context, x, y);

        context.stroke();
        context.closePath();

    };


    return {
        line: _brushLine,
        box: _brushBox
    };

});