define(['./colors'], function (colors) {

    var _compilePanelTemplate = function _compilePanelTemplate(itemList) {
        var items = '';
        for (var j = 0; j < itemList.length; j++) {
            items = items + _compilePanelItemTemplate(itemList[j]);
        }

        return items;
    };

    var _compilePanelItemTemplate = function _compilePanelItemTemplate(name) {
        return `<li>${name}</li>`;
    };


    return function TypeAhead(inputElement, panelElement) {
        var _currentText;
        var _colorList = colors;
        var _timeout;

        var _matchColors = function _matchColors(text, colorList) {
            var result = [];

            if (!text || text === '') {
                _colorList = colors;
                return _colorList;
            }

            for (var j = 0; j < colorList.length; j++) {
                if (colorList[j].toLowerCase().startsWith(text.toLowerCase())) {
                    result.push(colorList[j]);
                }
            }

            return result;
        };

        var _setPanelItems = function () {
            panelElement.innerHTML = _compilePanelTemplate(_colorList);
        };


        //panelElement.style.display = 'none';

        console.log('_currentText = %o', _currentText);
        console.log('_colorList = %o', _colorList);

        inputElement.addEventListener('keyup', function (event) {
            var key = event.keyCode || event.which;
            var keychar = String.fromCharCode(key);

            if(key === 13) {

            }



            _currentText = inputElement.value;


            _colorList = _matchColors(_currentText, _colorList);
            _setPanelItems();

            panelElement.style.display = 'block';

            if(_timeout) {
                window.clearTimeout(_timeout);
            }

            _timeout = window.setTimeout(function () {
                panelElement.style.display = 'none';

            }, 1000);

            console.log('_currentText = %o', _currentText);
            console.log('_colorList = %o', _colorList);
        });


    }
});