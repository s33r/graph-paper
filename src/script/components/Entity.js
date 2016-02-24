define(['./brushes'], function (brushes) {

    var _defaultSnapMethod = function _defaultSnapMethod(value) {
        return value;
    };

    var _defaultBrush = function _defaultBrush() {
        throw new Error("Invalid brush: " + this.brush);
    };

    return function Entity(data, brush, snapMethod) {
        this.data = data || null;
        this.brush = brush;
        this.snapMethod = snapMethod || null;

        this.render = function render(context) {
            var brush = this.brush || _defaultBrush;
            var data = this.data || {};
            var snapMethod = this.snapMethod || _defaultSnapMethod;

            brush && brush(context, data, snapMethod);
        };
    };

});