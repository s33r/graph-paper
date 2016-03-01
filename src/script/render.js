define(['./shapes/Rectangle'],
    function (Rectangle) {

        var _canvas, _context, _canvasElement;

        var _setup = function _setup(canvasElement) {
            _canvasElement = canvasElement;
            _canvas        = canvasElement;
            _context       = _canvas.getContext('2d');

            _resize(canvasElement);
        };

        var _resize = function _resize() {
            _canvas.width         = _canvasElement.clientWidth;
            _canvas.height        = _canvasElement.clientHeight;
            _canvas.style.display = 'block';
        };

        var _render = function _render(components) {
            _context.clearRect(0, 0, _canvas.width, _canvas.height);

            if (components) {
                for (var j = 0; j < components.length; j++) {
                    components[j].render(_context);
                }
            }
        };

        var _translatePosition = function _translatePosition(clientX, clientY) {
            var canvasBounds = _canvas.getBoundingClientRect();

            return {
                x: clientX - canvasBounds.left,
                y: clientY - canvasBounds.top
            };
        };

        var _getBoundingBox = function () {
            return new Rectangle(0, 0, _canvas.width, _canvas.height);
        };

        return {
            setup: _setup,
            translatePosition: _translatePosition,
            render: _render,
            resize: _resize,
            getBoundingBox: _getBoundingBox
        };
    });