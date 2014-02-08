(function (Ω) {

    "use strict";

    var MainScreen = Ω.Screen.extend({

        speed: 2,
        bird: null,
        pipes: null,

        score: 0,

        state: null,

        init: function () {
            this.state = new Ω.utils.State("BORN");
            this.bird = new window.Bird(Ω.env.w * 0.25, Ω.env.h * 0.45);
            this.pipes = [
                new window.Pipe(Ω.env.w + 10, Ω.env.h - 170, this.speed),
                new window.Pipe(Ω.env.w + 10, - 100, this.speed)
            ];
        },

        tick: function () {
            this.state.tick();

            switch (this.state.get()) {
                case "BORN":
                    this.state.set("GETREADY");
                    break;
                case "GETREADY":
                    this.state.set("RUNNING");
                    break;
                case "RUNNING":
                    break;
                case "GAMEOVER":
                    break;
            }

            this.bird.tick();
            this.pipes = this.pipes.filter(function (p) {
                return p.tick();
            });

            Ω.Physics.checkCollision(this.bird, this.pipes);

        },

        render: function (gfx) {

            var atlas = window.game.atlas;

            this.clear(gfx, "hsl(195, 40%, 50%)");

            var now = Date.now();

            atlas.render(gfx, "bg_day", 0, 0);

            this.bird.render(gfx);
            this.pipes.forEach(function (p) {
                p.render(gfx);
            });

            atlas.render(gfx, "number_score_00", gfx.w * 0.45, gfx.h * 0.15);

            atlas.render(gfx, "land", -((now / 7 | 0) % 288), gfx.h - 112);
            atlas.render(gfx, "land", 295 - ((now / 7 | 0) % 288), gfx.h - 112);

        }
    });

    window.MainScreen = MainScreen;

}(window.Ω));
