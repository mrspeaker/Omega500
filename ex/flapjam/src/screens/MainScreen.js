(function (Ω) {

    "use strict";

    var MainScreen = Ω.Screen.extend({

        speed: 2,
        bird: null,
        pipes: null,

        score: 0,

        state: null,

        count: 0,

        init: function () {
            this.state = new Ω.utils.State("BORN");
            this.bird = new window.Bird(Ω.env.w * 0.25, Ω.env.h * 0.45, this);
            this.pipes = [
                new window.Pipe(0, "up", Ω.env.w, Ω.env.h - 170, this.speed),
                new window.Pipe(0, "down", Ω.env.w, - 100, this.speed),

                new window.Pipe(1, "up", Ω.env.w * 1.5, Ω.env.h - 170, this.speed),
                new window.Pipe(1, "down", Ω.env.w * 1.5, - 100, this.speed),

                new window.Pipe(2, "up", Ω.env.w * 2, Ω.env.h - 170, this.speed),
                new window.Pipe(2, "down", Ω.env.w * 2, - 100, this.speed)
            ];

            this.setHeight(0);
            this.setHeight(1);
            this.setHeight(2);
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

            this.count += this.speed;
            if (this.count % 156 === 154) {
                this.score++;
            }

            this.bird.tick();
            this.pipes = this.pipes.filter(function (p) {
                p.tick();
                if (p.reset) {
                    this.setHeight(p.group);
                }
                return true;
            }, this);

            Ω.Physics.checkCollision(this.bird, this.pipes);

        },

        setHeight: function (group) {
            var h = (Math.random() * 160 | 0) + 130;
            this.pipes.filter(function (p) {
                return p.group === group;
            }).forEach(function (p) {
                p.y = p.dir == "up" ? h + 60 : h - p.h - 60;
            });
        },

        render: function (gfx) {

            var atlas = window.game.atlas,
                now = Date.now();

            atlas.render(gfx, "bg_day", 0, 0);

            this.bird.render(gfx);
            this.pipes.forEach(function (p) {
                p.render(gfx);
            });

            var sc = this.score + "";
            for (var i = 0; i < sc.length; i++) {
                atlas.render(gfx, "number_score_0" + sc[i], i * 18 + 130, gfx.h * 0.15);
            }

            atlas.render(gfx, "land", -((now / 7 | 0) % 288), gfx.h - 112);
            atlas.render(gfx, "land", 289 - ((now / 7 | 0) % 288), gfx.h - 112);

        }
    });

    window.MainScreen = MainScreen;

}(window.Ω));
