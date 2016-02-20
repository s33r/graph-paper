define([], function () {
    return function Line(startX, startY, endX, endY) {
        if (startX instanceof Line) {
            this.startX = startX.startX;
            this.startY = startX.startY;
            this.endX = startX.endX;
            this.endY = startX.endY;
        } else {
            this.startX = startX || 0;
            this.startY = startY || 0;
            this.endX = endX || 0;
            this.endY = endY || 0;
        }
    };
});