define([
    '../config',
    './../shapes/Rectangle',
    './Entity',
    './brushes',
    './snapMethods',
    './WallWalker'
], function (config, Rectangle, Entity, brushes, snapMethods, WallWalker) {

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
                    cells[x][y].render(context);
                }
            }
        }
    };

    var _renderLines = function (context, lines) {
        for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            lines[lineIndex].render(context);
        }
    };

    var _isWall = function _isWall(entity) {
        if (!entity) {
            return null;
        }

        if (!entity.data) {
            return null;
        }

        if (!entity.data.tag) {
            return null;
        }

        if (entity.data.tag === 'wall') {
            return entity;
        }

        return null;
    };

    return function Grid(x, y, width, height) {
        var self = this;

        var cells = [];
        var lines = [];

        var wallWalker = new WallWalker(self);

        var removeLine = function (line) {
            console.warn('removeLine not implemented');
        };

        this.resize = function (newX, newY, newWidth, newHeight) {
            if (x instanceof Rectangle) {
                self.container = new Rectangle(newX);
            } else {
                self.container = new Rectangle(newX, newY, newWidth, newHeight);
            }
        };

        this.render = function render(context) {
            _renderBackground(context, self.container, config.getSpacing());
            _renderCells(context, cells, self.container, config.getSpacing());
            _renderLines(context, lines);
        };

        this.addEntity = function addEntity(entity, x, y) {
            if (!(entity instanceof Entity)) {
                throw new Error('entity must be of type Entity');
            }

            if (!!x && !!y) {
                if (_isWall(entity)) {
                    wallWalker.setWall(entity, x, y);
                } else {
                    self.setCell(entity, x, y);
                }

            } else {
                lines.push(entity);
            }
        };

        this.removeEntity = function removeEntity(entity, x, y) {
            if (entity != null && !(entity instanceof Entity)) {
                self.removeEntity(null, entity, x);

            } else {
                entity = self.getCell(x, y);

                if (!!x && !!y) {
                    self.setCell(null, x, y);

                    if (_isWall(entity)) {
                        wallWalker.setWall(null, x, y);
                    }
                } else {
                    removeLine(entity);
                }
            }
        };

        this.setCell = function setCell(entity, x, y) {
            if (!cells[x]) {
                cells[x] = [];
            }

            if (!entity) {
                cells[x][y] = null;
            } else if (!(entity instanceof Entity)) {
                throw new Error('entity must be of type Entity');
            } else {
                cells[x][y] = entity;
            }
        };

        this.locateCell = function locateCell(x, y) {
            var cellBounds = this.getCellBounds(x, y);

            return {
                x: cellBounds.x / config.getSpacing(),
                y: cellBounds.y / config.getSpacing()
            };
        };

        this.getCellBounds = function getCell(x, y) {
            return new Rectangle(
                snapMethods.snapToCell(x),
                snapMethods.snapToCell(y),
                config.getSpacing(),
                config.getSpacing()
            );
        };

        this.getCell = function getCell(x, y) {
            if (x < 0 || y < 0) {
                return null;
            }

            if (!cells[x]) {
                return null;
            }

            if (!cells[x][y]) {
                return null;
            }

            return cells[x][y];
        };

        this.resize(x, y, width, height);
    };
});