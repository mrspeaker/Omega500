(function (Ω) {

    "use strict";

    var MainScreen = Ω.Screen.extend({

        speed: 2,
        bird: null,
        pipes: null,

        init: function () {
            this.bird = new window.Bird(Ω.env.w * 0.25, Ω.env.h * 0.5);
            this.pipes = [
                new window.Pipe(Ω.env.w + 10, Ω.env.h - 200, this.speed),
                new window.Pipe(Ω.env.w + 10, 0, this.speed)
            ];
        },

        tick: function () {

            this.bird.tick();
            this.pipes = this.pipes.filter(function (p) {
                return p.tick();
            });

            Ω.Physics.checkCollision(this.bird, this.pipes);

        },

        render: function (gfx) {

            this.clear(gfx, "hsl(195, 40%, 50%)");

            this.bird.render(gfx);
            this.pipes.forEach(function (p) {
                p.render(gfx);
            });

        }
    });

    window.MainScreen = MainScreen;

}(window.Ω));
