(function (Ω) {

    "use strict";

    var Bird = Ω.Entity.extend({
        w: 35,
        h: 25,
        ac: -8,

        color: 0,

        sounds: {
            "hit": new Ω.Sound("res/audio/sfx_hit", 1)
        },

        init: function (x, y, screen) {
            this._super(x, y);
            this.screen = screen;
        },

        tick: function () {
            var oldy = this.y;
            this.ac = Math.min(this.ac + 0.4, 10);
            this.y += this.ac;

            if (Ω.input.pressed("jump")) {
                this.ac = -7;
            }

            if (this.y > Ω.env.h - 112 - this.h) {
                this.y = oldy;
                this.die();
            }

        },

        setColor: function (color) {
            this.color = color;
        },

        die: function () {
            if (this.screen.state.is("RUNNING")) {
                this.sounds.hit.play();
                this.screen.state.set("DYING");
                this.ac = 0;
            }
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
            window.game.atlas.render(gfx, "bird" + this.color + "_0", 20, 10);
            c.restore();
        }
    });

    window.Bird = Bird;

}(window.Ω));