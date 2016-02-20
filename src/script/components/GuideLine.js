define([], function () {
    return function Guideline(line, color) {

        this.line = line;
        this.color = color;
        this.visible = false;

        this.render = function(context) {
            if(!this.visible) {
                return;
            }

            context.beginPath();
            context.strokeStyle = this.color;
            context.lineWidth = 1;

            context.moveTo(line.startX, line.startY);
            context.lineTo(line.endX, line.endY);

            context.closePath();
            context.stroke();
        }
    };
});