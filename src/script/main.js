define([
    './config',
    './render',
    './ui/formController',
    'components/Grid',
    'ui/mouse',
    'shapes/Line',
    'components/GuideLine',
    'components/Cursor',
    'components/snapMethods',
    'components/Entity',
    'entityFactory'
], function (config, render, controller, Grid, mouse, Line, GuideLine, Cursor, snapMethods, Entity, entityFactory) {

    var _loopId;
    var _canvasId;

    var _grid;
    var _guideLine;
    var _cursor;

    var renderables = [];

    var _startLoop = function _startLoop() {
        return window.requestAnimationFrame(function mainLoop(timestamp) {
            controller.update();
            render.render(renderables);
            _startLoop();
        });
    };

    var _registerEvents = function _registerEvents(canvasElement) {
        var clearButton = document.getElementById('clearButton');

        window.addEventListener('resize', function (event) {
            render.resize();

            _grid.resize(render.getBoundingBox());
        });

        clearButton.addEventListener('click', function (e) {
            _reset();
        }, false);

        canvasElement.addEventListener('mouseenter', function (e) {
            _cursor.visible = true;
        }, false);

        canvasElement.addEventListener('mouseleave', function (e) {
            _cursor.visible = false;
        }, false);

        canvasElement.addEventListener('mousemove', function (e) {
            _cursor.visible = true;

            var mousePosition = render.translatePosition(e.clientX, e.clientY);

            _guideLine.line.endX = snapMethods.snapToGrid(mousePosition.x);
            _guideLine.line.endY = snapMethods.snapToGrid(mousePosition.y);

            _setCursor();

            mouse.update(
                e.clientX,
                e.clientY,
                mousePosition.x,
                mousePosition.y,
                _grid.locateCell(mousePosition.x, mousePosition.y)
            );
        }, false);

        canvasElement.addEventListener('mousedown', function (e) {
            var position = render.translatePosition(e.clientX, e.clientY);
            var formData = controller.getFormData();


            if (formData.selectedBrush === 'line') {
                _guideLine.color       = formData.selectedColor;
                _guideLine.line.startX = snapMethods.snapToGrid(position.x);
                _guideLine.line.startY = snapMethods.snapToGrid(position.y);
                _guideLine.visible     = true;
            }
        }, false);

        canvasElement.addEventListener('mouseup', function (e) {
            _guideLine.visible = false;
            var mousePosition  = mouse.getPosition();
            var formData       = controller.getFormData();
            var cellLocation   = _grid.locateCell(mousePosition.canvasX, mousePosition.canvasY);

            var cellCoords = {
                x: cellLocation.x * config.getSpacing() + _grid.container.x,
                y: cellLocation.y * config.getSpacing() + _grid.container.y
            };

            var entity = entityFactory.createEntity(
                formData.selectedBrush,
                formData.selectedColor,
                mousePosition,
                cellCoords,
                _guideLine.line
            );

            switch (entity.snapMethod) {
                case snapMethods.snapToCell:
                    if (e.button === 0) {
                        _grid.addEntity(entity, cellLocation.x, cellLocation.y);
                    } else if (e.button === 2) {
                        _grid.removeEntity(cellLocation.x, cellLocation.y);
                    }
                    break;
                case snapMethods.snapToGrid:
                //For js hint:
                /* falls through */
                default:
                    if (e.button === 0) {
                        _grid.addEntity(entity);
                    } else if (e.button === 2) {
                        _grid.removeEntity(entity);
                    }

            }

        }, false);
    };

    var _setCursor = function _setCursor() {
        var mousePosition = mouse.getPosition();
        var formData      = controller.getFormData();
        var cellLocation  = _grid.locateCell(mousePosition.canvasX, mousePosition.canvasY);
        var cellCoords    = {
            x: cellLocation.x * config.getSpacing() + _grid.container.x,
            y: cellLocation.y * config.getSpacing() + _grid.container.y
        };

        var entity = entityFactory.createCursorEntity(
            formData.selectedBrush,
            formData.selectedColor,
            mousePosition,
            cellCoords,
            _guideLine.line
        );

        _cursor.entity = entity;
    };

    var _reset = function _reset() {
        _grid      = new Grid(render.getBoundingBox());
        _guideLine = new GuideLine(
            new Line(),
            'blue'
        );

        _cursor = new Cursor();
        _setCursor();

        renderables = [
            _grid,
            _guideLine,
            _cursor
        ];

    };

    var _run = function (canvasId) {
        config.setSpacing(16);
        _canvasId         = canvasId;
        var canvasElement = document.getElementById(canvasId);

        if (!canvasElement) {
            throw new Error('Cannot find canvas element: ' + canvasId);
        }

        _registerEvents(canvasElement);
        render.setup(canvasElement);
        controller.setup();


        _reset();

        _loopId = _startLoop();
    };

    return {
        run: _run
    };
});