define(['./mouse', 'components/brushes', './TypeAhead'], function (mouse, brushes, TypeAhead) {

    var _currentBrush;
    var _updateBrush = function _updateBrush(brushPicker) {
        _currentBrush = brushPicker.value;
    };

    var _currentColor;
    var _updateColor = function _updateColor(colorPicker) {
        _currentColor = colorPicker.value;
    };

    var typeAhead;

    var _defaults =  {
            color: 'blue',
            brush: 'line'
        };

    var _setup = function _setup(defaults) {
        if (!defaults) {
            defaults = _defaults;
        }

        var collapseButton = document.getElementById('toggleCollapseButton');
        var mainMenu = document.getElementById('mainMenu');
        var colorPicker = document.getElementById('colorPicker');
        var brushPicker = document.getElementById('brushPicker');
        var colorPickerDropdown = document.getElementById('colorPickerDropdown');

        //typeAhead = new TypeAhead(colorPicker, colorPickerDropdown);

        var mainMenuDisplay = mainMenu.style.display;
        collapseButton.addEventListener('click', function (e) {
            if (mainMenu.style.display === mainMenuDisplay) {
                mainMenu.style.display = 'none';
            } else {
                mainMenu.style.display = mainMenuDisplay;
            }
        });

        colorPicker.value = defaults.color || _defaults.color;
        brushPicker.value = defaults.brush || _defaults.brush;
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
            selectedColor: _currentColor || _defaults.color,
            selectedBrush: _currentBrush || _defaults.brush
        };
    };

    return {
        setup: _setup,
        update: _update,
        getFormData: _getFormData
    }

});