(function (Ω) {
    "use strict";

    var Smoke = Ω.Class.extend({
        init: function (x, y) {
            this.x = x;
            this.y = y;
            this.life = 100;
        },
        tick: function () {
            return --this.life > 0;
        },
        render: function (gfx) {
            var c = gfx.ctx;

            c.fillStyle = "rgba(255,255,255," + (this.life/100) + ")";
            c.fillRect(this.x, this.y, 30, 30);
        }
    });

    window.Smoke = Smoke;

}(window.Ω));
