(function (Ω) {

    "use strict";

    var Pipe = Ω.Entity.extend({
        init: function (x, y, speed) {
            this._super(x, y);
            this.w = 70;
            this.h = 200;
            this.speed = speed;
        },
        tick: function () {
            this.x -= this.speed;
            if (this.x < -60) {
                this.x = Ω.env.w;
            }
            return true;
        }
    });

    window.Pipe = Pipe;

}(window.Ω));