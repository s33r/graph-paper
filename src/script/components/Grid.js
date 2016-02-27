define([
    '../config',
    './../shapes/Rectangle',
    './Entity',
    './brushes',
    './snapMethods'
], function (config, Rectangle, Entity, brushes, snapMethods) {

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


    var _wallTerminals = {
        top: [
            'wall-empty',
            'wall-vertical',
            'wall-cap-top',
            'wall-corner-top-left',
            'wall-corner-top-right',
            'wall-t-right',
            'wall-t-left',
            'wall-t-top'
        ],
        bottom: [
            'wall-empty',
            'wall-vertical',
            'wall-cap-bottom',
            'wall-corner-bottom-right',
            'wall-corner-bottom-left',
            'wall-t-right',
            'wall-t-left',
            'wall-t-bottom'
        ],
        left: [
            'wall-empty',
            'wall-horizontal',
            'wall-cap-left',
            'wall-corner-bottom-left',
            'wall-corner-top-left',
            'wall-t-left',
            'wall-t-top',
            'wall-t-bottom'

        ],
        right: [
            'wall-empty',
            'wall-horizontal',
            'wall-cap-right',
            'wall-corner-bottom-right',
            'wall-corner-top-right',
            'wall-t-right',
            'wall-t-top',
            'wall-t-bottom'

        ]
    };

    var _isNotWallTerminal = function _isNotWallTerminal(wallSide, wallBrush) {
        var isTerminal = false;

        var terminalList = _wallTerminals[wallSide];

        for (var j = 0; j < terminalList.length; j++) {
            var isMatch = wallBrush == brushes[terminalList[j]];
            isTerminal = isTerminal || isMatch;
        }

        return !isTerminal;
    };

    var _getWallSurround = function _getWallType(center, top, bottom, left, right) {
        var result = '';

        if (!!top) {
            result += 'top-';
        }

        if (!!bottom) {
            result += 'bottom-';
        }

        if (!!left) {
            result += 'left-';
        }

        if (!!right) {
            result += 'right-';
        }

        if (!result) {
            result = 'empty';
        } else {
            result = result.slice(0, -1);
        }

        return result;
    };


    return function Grid(x, y, width, height) {
        var self = this;

        var cells = [];
        var lines = [];


        var setWall = function setWall(entity, x, y) {
            console.log('[x=%o][y=%o]', x, y);

            var center = _isWall(self.getCell(x, y));
            var top = _isWall(self.getCell(x, y - 1));
            var bottom = _isWall(self.getCell(x, y + 1));
            var left = _isWall(self.getCell(x - 1, y));
            var right = _isWall(self.getCell(x + 1, y));

            console.log('[center=%o][top=%o][bottom=%o][left=%o][right=%o]', center, top, bottom, left, right);

            var surround = _getWallSurround(center, top, bottom, left, right);

            console.log(surround);

            switch (surround) {
                case 'empty':
                    cells[x][y] = entity;
                    break;
                case 'top':
                    entity.brush = brushes['wall-cap-bottom'];
                    cells[x][y] = entity;

                    if (_isNotWallTerminal('top', top.brush)) {
                        setWall(top, x, y - 1);
                    }

                    break;
                case 'bottom':
                    entity.brush = brushes['wall-cap-top'];
                    cells[x][y] = entity;

                    if (_isNotWallTerminal('bottom', bottom.brush)) {
                        setWall(bottom, x, y + 1);
                    }

                    break;

                case 'top-bottom':
                    entity.brush = brushes['wall-vertical'];
                    cells[x][y] = entity;

                    if (_isNotWallTerminal('bottom', bottom.brush)) {
                        setWall(bottom, x, y + 1);
                    }

                    if (_isNotWallTerminal('top', top.brush)) {
                        setWall(top, x, y - 1);
                    }

                    break;

                case 'left':
                    entity.brush = brushes['wall-cap-right'];
                    cells[x][y] = entity;

                    if (_isNotWallTerminal('left', left.brush)) {
                        setWall(left, x - 1, y);
                    }

                    break;

                case 'right':
                    entity.brush = brushes['wall-cap-left'];
                    cells[x][y] = entity;

                    if (_isNotWallTerminal('right', right.brush)) {
                        setWall(right, x + 1, y);
                    }

                    break;

                case 'left-right':
                    entity.brush = brushes['wall-horizontal'];
                    cells[x][y] = entity;

                    if (_isNotWallTerminal('right', right.brush)) {
                        setWall(right, x + 1, y);
                    }

                    if (_isNotWallTerminal('left', left.brush)) {
                        setWall(left, x - 1, y);
                    }

                    break;

                case 'top-right':
                    entity.brush = brushes['wall-corner-bottom-left'];
                    cells[x][y] = entity;

                    if (_isNotWallTerminal('right', right.brush)) {
                        setWall(right, x + 1, y);
                    }

                    if (_isNotWallTerminal('top', top.brush)) {
                        setWall(top, x, y - 1);
                    }

                    break;

                case 'top-left':
                    entity.brush = brushes['wall-corner-bottom-right'];
                    cells[x][y] = entity;

                    if (_isNotWallTerminal('left', left.brush)) {
                        setWall(left, x - 1, y);
                    }

                    if (_isNotWallTerminal('top', top.brush)) {
                        setWall(top, x, y - 1);
                    }

                    break;

                case 'bottom-left':
                    entity.brush = brushes['wall-corner-top-right'];
                    cells[x][y] = entity;

                    if (_isNotWallTerminal('left', left.brush)) {
                        setWall(left, x - 1, y);
                    }

                    if (_isNotWallTerminal('bottom', bottom.brush)) {
                        setWall(bottom, x, y + 1);
                    }

                    break;

                case 'bottom-right':
                    entity.brush = brushes['wall-corner-top-left'];
                    cells[x][y] = entity;

                    if (_isNotWallTerminal('right', right.brush)) {
                        setWall(right, x + 1, y);
                    }

                    if (_isNotWallTerminal('bottom', bottom.brush)) {
                        setWall(bottom, x, y + 1);
                    }

                    break;

                case 'top-bottom-left':
                    entity.brush = brushes['wall-t-right'];
                    cells[x][y] = entity;

                    if (_isNotWallTerminal('top', top.brush)) {
                        setWall(top, x, y - 1);
                    }

                    if (_isNotWallTerminal('bottom', bottom.brush)) {
                        setWall(bottom, x, y + 1);
                    }

                    if (_isNotWallTerminal('left', left.brush)) {
                        setWall(left, x - 1, y);
                    }

                    break;

                case 'top-bottom-right':
                    entity.brush = brushes['wall-t-left'];
                    cells[x][y] = entity;

                    if (_isNotWallTerminal('top', top.brush)) {
                        setWall(top, x, y - 1);
                    }

                    if (_isNotWallTerminal('bottom', bottom.brush)) {
                        setWall(bottom, x, y + 1);
                    }

                    if (_isNotWallTerminal('right', right.brush)) {
                        setWall(right, x + 1, y);
                    }

                    break;

                case 'bottom-left-right':
                    entity.brush = brushes['wall-t-top'];
                    cells[x][y] = entity;

                    if (_isNotWallTerminal('left', left.brush)) {
                        setWall(left, x - 1, y);
                    }

                    if (_isNotWallTerminal('bottom', bottom.brush)) {
                        setWall(bottom, x, y + 1);
                    }

                    if (_isNotWallTerminal('right', right.brush)) {
                        setWall(right, x + 1, y);
                    }

                    break;

                case 'top-left-right':
                    entity.brush = brushes['wall-t-bottom'];
                    cells[x][y] = entity;

                    if (_isNotWallTerminal('left', left.brush)) {
                        setWall(left, x - 1, y);
                    }

                    if (_isNotWallTerminal('top', top.brush)) {
                        setWall(top, x, y - 1);
                    }

                    if (_isNotWallTerminal('right', right.brush)) {
                        setWall(right, x + 1, y);
                    }

                    break;

                case 'top-bottom-left-right':
                    entity.brush = brushes['wall-empty'];
                    cells[x][y] = entity;

                    if (_isNotWallTerminal('top', top.brush)) {
                        setWall(top, x, y - 1);
                    }

                    if (_isNotWallTerminal('bottom', bottom.brush)) {
                        setWall(bottom, x, y + 1);
                    }

                    if (_isNotWallTerminal('left', left.brush)) {
                        setWall(left, x - 1, y);
                    }

                    if (_isNotWallTerminal('right', right.brush)) {
                        setWall(right, x + 1, y);
                    }

                    break;

                default:
                    console.warn('unhandled wall surround ' + surround);
                    cells[x][y] = entity;

            }
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
                if (!cells[x]) {
                    cells[x] = [];
                }

                if (_isWall(entity)) {
                    setWall(entity, x, y);
                } else {
                    cells[x][y] = entity;
                }

            } else {
                lines.push(entity);
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

        this.clearCell = function clearCell(x, y) {
            if (cells[x]) {
                if (cells[x][y]) {
                    cells[x][y] = null;
                }
            }
        };

        this.resize(x, y, width, height);
    };
});