(function (Ω) {
    "use strict";

    var Smoke = Ω.Class.extend({

        init: function (x, y, w, h, life) {

            this.x = x;
            this.y = y;
            this.w = w || 32;
            this.h = h || 32;
            this.life = life || 100;
            this.maxLife = this.life;

        },

        tick: function () {

            return --this.life > 0;

        },

        render: function (gfx) {

            var c = gfx.ctx;

            c.fillStyle = "rgba(255,255,255," + (this.life / this.maxLife) + ")";
            c.fillRect(this.x, this.y, this.w, this.h);

        }
    });

    window.Smoke = Smoke;

}(window.Ω));
