define(['components/brushes'], function (brushes) {
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

    var _wallBrushes = {
        'empty': 'wall',
        'top': 'wall-cap-bottom',
        'bottom': 'wall-cap-top',
        'top-bottom': 'wall-vertical',
        'left': 'wall-cap-right',
        'right': 'wall-cap-left',
        'left-right': 'wall-horizontal',
        'top-right': 'wall-corner-bottom-left',
        'top-left': 'wall-corner-bottom-right',
        'bottom-left': 'wall-corner-top-right',
        'bottom-right': 'wall-corner-top-left',
        'top-bottom-left': 'wall-t-right',
        'top-bottom-right': 'wall-t-left',
        'bottom-left-right': 'wall-t-top',
        'top-left-right': 'wall-t-bottom',
        'top-bottom-left-right': 'wall-empty'
    };

    var _isNotWallTerminal = function _isNotWallTerminal(wallSide, wallBrush) {
        var isTerminal = false;

        var terminalList = _wallTerminals[wallSide];

        for (var j = 0; j < terminalList.length; j++) {
            var isMatch = wallBrush == brushes[terminalList[j]];
            isTerminal  = isTerminal || isMatch;
        }

        return !isTerminal;
    };

    var _getWallSurround = function _getWallType(top, bottom, left, right) {
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

    return function WallWalker(grid) {
        var self = this;

        this.setWall = function (entity, x, y) {
            var top    = _isWall(grid.getCell(x, y - 1));
            var bottom = _isWall(grid.getCell(x, y + 1));
            var left   = _isWall(grid.getCell(x - 1, y));
            var right  = _isWall(grid.getCell(x + 1, y));

            var surround = _getWallSurround(top, bottom, left, right);

            if (entity) {
                if (_wallBrushes[surround]) {
                    entity.brush = brushes[_wallBrushes[surround]];
                } else {
                    console.warn('unknown wall part');
                }
            }

            grid.setCell(entity, x, y);

            if (top && (_isNotWallTerminal('top', top.brush) || !entity)) {
                self.setWall(top, x, y - 1);
            }

            if (bottom && (_isNotWallTerminal('bottom', bottom.brush) || !entity)) {
                self.setWall(bottom, x, y + 1);
            }

            if (left && (_isNotWallTerminal('left', left.brush) || !entity)) {
                self.setWall(left, x - 1, y);
            }

            if (right && (_isNotWallTerminal('right', right.brush) || !entity)) {
                self.setWall(right, x + 1, y);
            }
        };
    };
});