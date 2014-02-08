(function (Ω) {

    "use strict";

    var Bird = Ω.Entity.extend({
        w: 35,
        h: 25,
        ac: -8,

        tick: function () {
            this.ac = Math.min(this.ac + 0.4, 10);
            this.y += this.ac;

            if (Ω.input.pressed("jump")) {
                this.ac = -8;
            }

            if (this.y > Ω.env.h - 112 - this.h) {
                window.game.setScreen(new window.GameOverScreen());
            }

        },

        hit: function (p) {
            window.game.setScreen(new window.GameOverScreen());
        },

        render: function (gfx) {
            window.game.atlas.render(gfx, "bird0_0", this.x - 6, this.y - 12);
        }
    });

    window.Bird = Bird;

}(window.Ω));