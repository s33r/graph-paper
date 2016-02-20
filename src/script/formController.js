define(['mouse', 'brushes'], function (mouse, brushes) {

    var _currentBrush;
    var _updateBrush = function _updateBrush(brushPicker) {
        var brushName;
        for (var j = 0; j < brushPicker.options.length; j++) {
            if (brushPicker.options[j].selected) {
                brushName = brushPicker.options[j].value;
                break;
            }
        }

        _currentBrush = brushes[brushName] || null;
    };

    var _currentColor;
    var _updateColor = function _updateColor(colorPicker) {
        _currentColor = colorPicker.value;
    };

    var _setup = function _setup(defaults) {
        var _defaults = defaults || {
                color: 'blue',
                brush: 'line'
            };

        var collapseButton = document.getElementById('toggleCollapseButton');
        var mainMenu = document.getElementById('mainMenu');
        var colorPicker = document.getElementById('colorPicker');
        var brushPicker = document.getElementById('brushPicker');

        var mainMenuDisplay = mainMenu.style.display;
        collapseButton.addEventListener('click', function (e) {
            console.log('menu = %o', mainMenuDisplay);
            if (mainMenu.style.display === mainMenuDisplay) {
                mainMenu.style.display = 'none';
            } else {
                mainMenu.style.display = mainMenuDisplay;
            }
        });

        colorPicker.value = _defaults.color;

        for (var j = 0; j < brushPicker.options.length; j++) {
            if (brushPicker.options[j].text === _defaults.brush) {
                brushPicker.options[j].selected = true;
            } else {
                brushPicker.options[j].false = true;
            }
        }
    };

    var _updateMousePosition = function (mousePositionLabel) {
        var mousePosition = mouse.getPosition();

        mousePositionLabel.innerHTML = "(" + mousePosition.cell.x + ', ' + mousePosition.cell.y + ')';
    };

    var _update = function _update() {
        _updateMousePosition(document.getElementById('mousePositionLabel'));

        _updateColor(document.getElementById('colorPicker'));
        _updateBrush(document.getElementById('brushPicker'));
    };

    var _getFormData = function _getFormData() {
        return {
            selectedColor: _currentColor,
            selectedBrush: _currentBrush
        };
    };

    return {
        setup: _setup,
        update: _update,
        getFormData: _getFormData
    }

});