define([
    './config',
    './render',
    './ui/formController',
    'components/Grid',
    'ui/mouse',
    'components/brushes',
    'shapes/Line',
    'components/GuideLine',
    'components/snapMethods',
    'components/Entity'
], function (config, render, controller, Grid, mouse, brushes, Line, GuideLine, snapMethods, Entity) {

    var _loopId;
    var _canvasId;

    var _grid;
    var _guideLine;

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

        canvasElement.addEventListener('mousemove', function (e) {
            var mousePosition = render.translatePosition(e.clientX, e.clientY);

            _guideLine.line.endX = snapMethods.snapToGrid(mousePosition.x);
            _guideLine.line.endY = snapMethods.snapToGrid(mousePosition.y);

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

            if (formData.selectedBrush === brushes.line) {
                _guideLine.color = formData.selectedColor;
                _guideLine.line.startX = snapMethods.snapToGrid(position.x);
                _guideLine.line.startY = snapMethods.snapToGrid(position.y);
                _guideLine.visible = true;
            }
        }, false);

        canvasElement.addEventListener('mouseup', function (e) {
            _guideLine.visible = false;
            var mousePosition = mouse.getPosition();
            var formData = controller.getFormData();

            var data = null;

            if (formData.selectedBrush === brushes.line) {
                data = {
                    color: formData.selectedColor,
                    startX: _guideLine.line.startX,
                    startY: _guideLine.line.startY,
                    endX: _guideLine.line.endX,
                    endY: _guideLine.line.endY
                };

                _grid.addEntity(new Entity(data, 'line', snapMethods.snapToGrid));
            } else {
                var cellCoords = _grid.locateCell(mousePosition.canvasX, mousePosition.canvasY);

                data = {
                    x: cellCoords.x * config.getSpacing() + _grid.container.x,
                    y: cellCoords.y * config.getSpacing() + _grid.container.y,
                    color: formData.selectedColor
                };

                _grid.addEntity(
                    new Entity(data, 'box', snapMethods.snapToCell),
                    cellCoords.x,
                    cellCoords.y
                );
            }

        }, false);
    };

    var _reset = function _reset() {
        _grid = new Grid(render.getBoundingBox());
        _guideLine = new GuideLine(
            new Line(),
            'blue'
        );

        renderables = [
            _grid,
            _guideLine
        ];

    };

    var _run = function (canvasId) {
        config.setSpacing(16);
        _canvasId = canvasId;
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

    _run('mainCanvas');

    return {
        run: _run
    }
});