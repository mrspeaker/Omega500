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

            var c = gfx.ctx;

            //c.fillStyle = "green";
            //c.fillRect(this.x, this.y, this.w, this.h);

            c.save();
            c.translate(this.x, this.y);
            c.rotate(-0.35 + (this.ac / 15));
            c.translate(-20, -10);
            window.game.atlas.render(gfx, "bird0_0", 12, 0);
            c.restore();
        }
    });

    window.Bird = Bird;

}(window.Ω));