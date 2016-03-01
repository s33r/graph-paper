define([], function () {

    var _spacing = 0;

    var _getSpacing = function _getSpacing() {
        return _spacing;
    };

    var _setSpacing = function _setSpacing(value) {
        _spacing = value;
    };

    return {
        getSpacing: _getSpacing,
        setSpacing: _setSpacing
    };

});