(function (Ω) {

    "use strict";

    var MainScreen = Ω.Screen.extend({

        speed: 2,
        bird: null,
        pipes: null,

        score: 0,

        state: null,

        count: 0,

        bg: 0,
        bgOffset: 0,

        sounds: {
            "point": new Ω.Sound("res/audio/sfx_point", 1)
        },

        init: function () {
            this.reset();

        },

        reset: function () {
            this.score = 0;
            this.state = new Ω.utils.State("BORN");
            this.bird = new window.Bird(Ω.env.w * 0.25, Ω.env.h * 0.45, this);
            this.bg = Ω.utils.rand(2);
            this.bird.setColor(Ω.utils.rand(3));
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
                    if (this.state.count > 30 && Ω.input.pressed("jump")) {
                        this.state.set("RUNNING");
                    }
                    break;
                case "RUNNING":
                    this.tick_RUNNING();
                    break;
                case "DYING":
                    if (this.state.count > 20) {
                        this.state.set("GAMEOVER");
                    }
                    this.bird.tick();
                    break;
                case "GAMEOVER":
                    if (this.state.first()) {
                        if (this.score > window.game.best) {
                            window.game.best = this.score;
                        }
                    }
                    this.bird.tick();
                    if (this.state.count > 30 && Ω.input.pressed("jump")) {
                        this.reset();
                    }
                    break;
            }

        },

        tick_RUNNING: function () {
            this.count += this.speed;
            if (this.count % 156 === 154) {
                this.score++;
                this.sounds.point.play();
            }
            this.bgOffset -= this.speed;
            if (this.bgOffset < -Ω.env.w) {
                this.bgOffset += Ω.env.w;
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

            atlas.render(gfx, "bg_" + (this.bg === 1 ? "night" : "day"), 0, 0);

            this.pipes.forEach(function (p) {
                p.render(gfx);
            });
            this.bird.render(gfx);

            switch (this.state.get()) {
                case "GETREADY":
                    this.renderGetReady(gfx, atlas);
                    break;
                case "GAMEOVER":
                    this.renderGameOver(gfx, atlas);
                    break;
                case "RUNNING":
                    this.renderRunning(gfx, atlas);
                    break;
            }

            atlas.render(gfx, "land", this.bgOffset, gfx.h - 112);
            atlas.render(gfx, "land", Ω.env.w + this.bgOffset, gfx.h - 112);

        },

        renderRunning: function (gfx, atlas) {
            var sc = this.score + "";
            for (var i = 0; i < sc.length; i++) {
                atlas.render(gfx, "number_score_0" + sc[i], i * 18 + 130, gfx.h * 0.15);
            }
        },

        renderGameOver: function (gfx, atlas) {
            atlas.render(gfx, "text_game_over", 40, gfx.h * 0.25);
            atlas.render(gfx, "score_panel", 24, gfx.h * 0.37);

            var sc = this.score + "";
            for (var i = 0; i < sc.length; i++) {
                atlas.render(gfx, "number_context_0" + sc[i], i * 15 + 200, 227);
            }

            sc = window.game.best + "";
            for (i = 0; i < sc.length; i++) {
                atlas.render(gfx, "number_context_0" + sc[i], i * 15 + 200, 267);
            }

            atlas.render(gfx, "button_play", 20, gfx.h - 172);
            atlas.render(gfx, "button_score", 152, gfx.h - 172);
        },

        renderGetReady: function (gfx, atlas) {
            atlas.render(gfx, "text_ready", 40, gfx.h * 0.25);
            atlas.render(gfx, "tutorial", 90, gfx.h * 0.40);
        }
    });

    window.MainScreen = MainScreen;

}(window.Ω));
