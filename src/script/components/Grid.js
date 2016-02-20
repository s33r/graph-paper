define(['./../shapes/Rectangle'], function (Rectangle) {

    var _renderBackground = function (context, container, spacing) {
        context.beginPath();
        context.strokeStyle = 'lightblue';
        context.lineWidth = 1;

        for (var y = spacing; y < container.height; y = y + spacing) {
            context.moveTo(container.x, y);
            context.lineTo(container.width, y);
        }

        for (var x = spacing; x < container.width; x = x + spacing) {
            context.moveTo(x, container.y);
            context.lineTo(x, container.height);
        }

        context.closePath();
        context.stroke();
    };

    var _renderCells = function _renderCells(context, cells, container, spacing) {
        for (var x = 0; x < cells.length; x++) {
            if (!cells[x]) {
                continue;
            }

            for (var y = 0; y < cells[x].length; y++) {
                if (cells[x][y]) {
                    cells[x][y].brush(context,
                        x * spacing + container.x,
                        y * spacing + container.y,
                        cells[x][y].color);
                }
            }
        }
    };

    var _renderLines = function(context, lines) {
        for(var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            var currentLine = lines[lineIndex];
            context.beginPath();
            context.strokeStyle = currentLine.color;
            context.lineWidth = 1;

            context.moveTo(currentLine.startX, currentLine.startY);
            context.lineTo(currentLine.endX, currentLine.endY);

            context.closePath();
            context.stroke();
        }
    };


    return function Grid(spacing, x, y, width, height) {
        var self = this;
        this.spacing = spacing;

        var cells = [];
        var lines = [];

        this.resize = function (newX, newY, newWidth, newHeight) {
            if (x instanceof Rectangle) {
                self.container = new Rectangle(newX);
            } else {
                self.container = new Rectangle(newX, newY, newWidth, newHeight);
            }
        };

        this.render = function render(context) {
            _renderBackground(context, self.container, self.spacing);
            _renderCells(context, cells, self.container, self.spacing);
            _renderLines(context, lines);
        };

        this.snapToGrid = function (value) {
            return value - (value % self.spacing);
        };

        this.locateCell = function locateCell(x, y) {
            var cellBounds = this.getCellBounds(x, y);

            return {
                x: cellBounds.x / spacing,
                y: cellBounds.y / spacing
            }
        };

        this.getCellBounds = function getCell(x, y) {
            return new Rectangle(this.snapToGrid(x), this.snapToGrid(y), self.spacing, self.spacing);
        };

        this.setCell = function setCell(x, y, brush, color) {
            if (!cells[x]) {
                cells[x] = [];
            }

            cells[x][y] = {
                brush: brush,
                color: color
            };
        };

        this.getCell = function getCell(x, y) {
            if (!cells[x]) {
                return null;
            }

            if (!cells[x][y]) {
                return null;
            }

            return cells[x][y];
        };

        this.clearCell = function clearCell(x, y) {
            if (cells[x]) {
                if (cells[x][y]) {
                    cells[x][y] = null;
                }
            }
        };

        this.resize(x, y, width, height);

        this.addLine = function addLine(startX, startY, endX, endY, color) {
            lines.push({
                color: color,
                startX: this.snapToGrid(startX),
                startY: this.snapToGrid(startY),
                endX: this.snapToGrid(endX),
                endY: this.snapToGrid(endY)
            });
        };
    };
});