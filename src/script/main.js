define(['./render', './formController', 'components/Grid', 'mouse', 'brushes', 'shapes/Line', 'components/GuideLine'], function (render, controller, Grid, mouse, brushes, Line, GuideLine) {

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

            _guideLine.line.endX = _grid.snapToGrid(mousePosition.x);
            _guideLine.line.endY = _grid.snapToGrid(mousePosition.y);

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
                _guideLine.line.startX = _grid.snapToGrid(position.x);
                _guideLine.line.startY = _grid.snapToGrid(position.y);
                _guideLine.visible = true;
            }
        }, false);

        canvasElement.addEventListener('mouseup', function (e) {
            _guideLine.visible = false;
            var mousePosition = mouse.getPosition();
            var formData = controller.getFormData();


            if (formData.selectedBrush === brushes.line) {
                _grid.addLine(
                    _guideLine.line.startX,
                    _guideLine.line.startY,
                    _guideLine.line.endX,
                    _guideLine.line.endY,
                    formData.selectedColor
                );

            } else {
                var cellCoords = _grid.locateCell(mousePosition.canvasX, mousePosition.canvasY);
                _grid.setCell(cellCoords.x, cellCoords.y, formData.selectedBrush, formData.selectedColor);
            }

        }, false);
    };

    var _reset = function _reset() {
        _grid = new Grid(16, render.getBoundingBox());
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
        _canvasId = canvasId;
        var canvasElement = document.getElementById(canvasId);

        if (!canvasElement) {
            throw new Error('Cannot find canvas element: ' + canvasId);
        }

        _registerEvents(canvasElement);
        render.setup(canvasElement);
        controller.setup();


        _reset();

        _loopId = _startLoop(16);
    };

    _run('mainCanvas');

    return {
        run: _run
    }
});