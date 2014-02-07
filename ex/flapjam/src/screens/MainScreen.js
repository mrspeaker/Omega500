(function (Ω) {

    "use strict";

    var MainScreen = Ω.Screen.extend({

        speed: 2,
        bird: null,
        poles: [],

        init: function () {
            this.poles.push([Ω.env.w + 10, Ω.env.h-100]);

            this.bird = new window.Bird(Ω.env.w * 0.25, Ω.env.h * 0.5);
        },

        tick: function () {

            this.bird.tick();

            this.poles = this.poles.map(function (p) {
                var x = p[0] - this.speed;
                if (x < -60) {
                    return [Ω.env.w, p[1]];
                }
                return [x, p[1]];
            }, this);

        },

        render: function (gfx) {

            var c = gfx.ctx;

            this.clear(gfx, "hsl(195, 40%, 50%)");

            this.bird.render(gfx);

            c.fillStyle = "#0ff";
            this.poles.forEach(function (p) {
                c.fillRect(p[0], p[1], 60, 100);
            });

        }
    });

    window.MainScreen = MainScreen;

}(window.Ω));
