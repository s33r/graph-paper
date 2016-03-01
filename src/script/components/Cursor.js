define([], function () {
    return function Cursor(entity) {
        var self     = this;
        this.entity  = entity;
        this.visible = false;

        this.render = function (context) {
            if (!!self.entity && !!self.visible) {
                self.entity.render(context);
            }
        };
    };
});