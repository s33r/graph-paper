define(['components/brushes', 'components/snapMethods', 'components/Entity'], function (brushes, snapMethods, Entity) {

    var _templates = {
        line: {
            brush: brushes.line,
            snapMethod: snapMethods.snapToGrid,
            cursorBrush: brushes.crosshair,
            getData: function (color, coords, cellCoords, guideLine) {
                return {
                    color: color,
                    startX: guideLine.startX,
                    startY: guideLine.startY,
                    endX: guideLine.endX,
                    endY: guideLine.endY
                };
            },
            getCursorData: function(color, coords, cellCoords, guideLine) {
                return {
                    color: color,
                    x: coords.canvasX,
                    y: coords.canvasY
                };
            }
        },
        box: {
            brush: brushes.box,
            snapMethod: snapMethods.snapToCell,
            cursorBrush: brushes.box,
            getData: function (color, coords, cellCoords, guideLine) {
                return {
                    color: color,
                    x: cellCoords.x,
                    y: cellCoords.y
                };
            },
            getCursorData: function(color, coords, cellCoords, guideLine) {
                return {
                    color: color,
                    x: cellCoords.x,
                    y: cellCoords.y
                };
            }
        },
        wall: {
            brush: brushes.wall,
            snapMethod: snapMethods.snapToCell,
            cursorBrush: brushes.wall,
            getData: function (color, coords, cellCoords, guideLine) {
                return {
                    color: color,
                    x: cellCoords.x,
                    y: cellCoords.y,
                    tag: 'wall'
                };
            },
            getCursorData: function(color, coords, cellCoords, guideLine) {
                return {
                    color: color,
                    x: cellCoords.x,
                    y: cellCoords.y
                };
            }
        },
        crosshair: {
            brush: brushes.crosshair,
            snapMethod: snapMethods.snapToGrid,
            cursorBrush: brushes.crosshair,
            getData: function (color, coords, cellCoords, guideLine) {
                return {
                    color: color,
                    x: coords.canvasX,
                    y: coords.canvasY
                };
            },
            getCursorData: function(color, coords, cellCoords, guideLine) {
                return {
                    color: color,
                    x: coords.canvasX,
                    y: coords.canvasY
                };
            }
        }
    };


    var _createCursorEntity = function _createCursorEntity(brushName, color, coords, cellCoords, guideLine) {
        var template = _templates[brushName];

        if (!template) {
            throw new Error('Unknown entity template.');
        }


        var data = template.getCursorData(color, coords, cellCoords, guideLine);

        return new Entity(data, template.cursorBrush, template.snapMethod);
    };

    var _createEntity = function _createEntity(brushName, color, coords, cellCoords, guideLine) {
        var template = _templates[brushName];

        if (!template) {
            throw new Error('Unknown entity template.');
        }


        var data = template.getData(color, coords, cellCoords, guideLine);

        return new Entity(data, template.brush, template.snapMethod, template.cursorBrush);
    };

    return {
        createCursorEntity: _createCursorEntity,
        createEntity: _createEntity
    };

});