define(['shapes/Rectangle'], function (Rectangle) {
    var _clientX = 0;
    var _clientY = 0;
    var _canvasX = 0;
    var _canvasY = 0;
    var _cell    = new Rectangle();

    var _update = function (clientX, clientY, canvasX, canvasY, cell) {
        _clientX = clientX;
        _clientY = clientY;
        _canvasX = canvasX;
        _canvasY = canvasY;
        _cell    = cell;
    };

    var _getPosition = function _getPosition() {
        return {
            clientX: _clientX || 0,
            clientY: _clientY || 0,
            canvasX: _canvasX || 0,
            canvasY: _canvasY || 0,
            cell: _cell
        };
    };

    return {
        update: _update,
        getPosition: _getPosition
    };
});