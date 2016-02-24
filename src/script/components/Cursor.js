define([], function () {
    return function Cursor(entity) {
        var self = this;
        this.entity = entity;

        this.render = function (context) {
            if (self.entity) {
                self.entity.render(context);
            }
        }
    };
});