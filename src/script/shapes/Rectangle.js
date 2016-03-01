define([], function () {
    return function Rectangle(x, y, width, height) {
        if (x instanceof Rectangle) {
            this.x      = x.x;
            this.y      = x.y;
            this.width  = x.width;
            this.height = x.height;
        } else {
            this.width  = width || 0;
            this.height = height || 0;
            this.x      = x || 0;
            this.y      = y || 0;
        }
    };
});