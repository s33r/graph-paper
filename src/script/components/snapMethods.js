define(['../config'], function (config) {

    var _snapToCell = function _snapToCell(value) {
        return value - (value % config.getSpacing());
    };

    var _snapToGrid = function _snapToGrid(value) {
        var spacing = config.getSpacing();

        var x = value % spacing;
        var y = spacing - x;
        var a = value - x;
        var b = a + spacing;

        var result;

        if (x > y) {
            result = b;
        } else {
            result = a;
        }

        return result;
    };


    return {
        snapToCell: _snapToCell,
        snapToGrid: _snapToGrid
    };

});