(function (Ω) {

    "use strict";

    var Pipe = Ω.Entity.extend({

        init: function (x, y, speed) {
            this._super(x, y);
            this.w = 48;
            this.h = 320;
            this.speed = speed;
        },

        tick: function () {
            this.x -= this.speed;
            if (this.x < -60) {
                this.x = Ω.env.w;
            }
            return true;
        },

        render: function (gfx) {
            var c = gfx.ctx;
            c.fillStyle = "blue";
            c.fillRect(this.x, this.y, this.w, this.h);
            game.atlas.render(gfx, this.y > gfx.h * 0.5 ? "pipe_up" : "pipe_down", this.x - 2, this.y);
        }
    });

    window.Pipe = Pipe;

}(window.Ω));