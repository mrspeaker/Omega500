(function (Ω) {

    "use strict";

    var MainScreen = Ω.Screen.extend({

        x: 0,
        y: 0,
        ac: 0,

        speed: 2,

        poles: [],

        init: function () {

            this.x = Ω.env.w * 0.35;
            this.y = Ω.env.h / 2;

            this.poles.push([Ω.env.w + 10, Ω.env.h-100]);

        },

        tick: function () {

            this.ac = Math.min(this.ac + 0.4, 10);
            this.y += this.ac;

            if (Ω.input.pressed("jump")) {
                this.ac = -8;
            }

            this.poles = this.poles.map(function (p) {
                var x = p[0] - this.speed;
                if (x < -60) {
                    return [Ω.env.w, p[1]];
                }
                return [x, p[1]];
            }, this);

            if (this.y > Ω.env.h - 20) {
                game.setScreen(new GameOverScreen());
            }

        },

        render: function (gfx) {

            var c = gfx.ctx;

            this.clear(gfx, "hsl(195, 40%, 50%)");

            c.fillStyle = "#0ff";
            c.fillRect(this.x, this.y, 30, 20);

            this.poles.forEach(function (p) {
                c.fillRect(p[0], p[1], 60, 100);
            });

        }
    });

    window.MainScreen = MainScreen;

}(Ω));
