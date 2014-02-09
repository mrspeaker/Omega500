(function (Ω) {

    "use strict";

    var Bird = Ω.Entity.extend({
        w: 35,
        h: 25,
        ac: -8,

        sounds: {
            "hit": new Ω.Sound("res/audio/sfx_hit", 1)
        },

        init: function (x, y, screen) {
            this._super(x, y);
            this.screen = screen;
        },

        tick: function () {
            this.ac = Math.min(this.ac + 0.4, 10);
            this.y += this.ac;

            if (Ω.input.pressed("jump")) {
                this.ac = -7;
            }

            if (this.y > Ω.env.h - 112 - this.h) {
                this.die();
            }

        },

        die: function () {
            this.sounds.hit.play();
            window.game.setScreen(new window.GameOverScreen(this.screen.score));
        },

        hit: function (p) {
            this.die();
        },

        render: function (gfx) {

            var c = gfx.ctx;

            c.strokeStyle = "green";
            c.strokeRect(this.x, this.y, this.w, this.h);

            c.save();
            c.translate(this.x, this.y);
            c.rotate(-0.35 + (this.ac / 15));
            c.translate(-30, -15);
            window.game.atlas.render(gfx, "bird0_0", 20, 10);
            c.restore();
        }
    });

    window.Bird = Bird;

}(window.Ω));