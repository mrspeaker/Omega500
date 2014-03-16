(function (Ω) {

    "use strict";

    var Player = Ω.Entity.extend({
        w: 24,
        h: 32,

        tick: function () {

            this.y += Math.sin(Ω.utils.now() / 140) * 5;

            if (Ω.input.isDown("left")) {
                this.x -= 3;
            }
            if (Ω.input.isDown("right")) {
                this.x += 3;
            }
            return true;

        },

        render: function (gfx) {

            var c = gfx.ctx;
            c.fillStyle = "#333";
            c.fillRect(this.x, this.y, this.w, this.h);
        }

    });

    window.Player = Player;

}(window.Ω));