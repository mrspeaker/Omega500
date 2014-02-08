(function (Ω) {

    "use strict";

    var GameOverScreen = Ω.Screen.extend({

        x: 0,
        y: 0,
        ac: 0,
        newBest: false,

        ticks: 0,

        init: function (score) {
            this.score = score;
            if (score > window.game.best) {
                this.newBest = true;
                window.game.best = score;
            }
            this.best = window.game.best;
        },

        tick: function () {
            this.ac = Math.min(this.ac + 0.1, 5);
            this.y += this.ac;

            if (this.ticks++ > 30 && Ω.input.pressed("jump")) {
                game.setScreen(new TitleScreen());
            }
        },

        render: function (gfx) {

            var atlas = window.game.atlas;

            atlas.render(gfx, "bg_day", 0, 0);

            atlas.render(gfx, "land", 0, gfx.h - 112);

            atlas.render(gfx, "text_game_over", 40, gfx.h * 0.25);
            atlas.render(gfx, "score_panel", 24, gfx.h * 0.37);

            var sc = this.score + "";
            for (var i = 0; i < sc.length; i++) {
                atlas.render(gfx, "number_context_0" + sc[i], i * 15 + 200, 227);
            }

            sc = this.best + "";
            for (i = 0; i < sc.length; i++) {
                atlas.render(gfx, "number_context_0" + sc[i], i * 15 + 200, 267);
            }

            atlas.render(gfx, "button_play", 20, gfx.h - 172);
            atlas.render(gfx, "button_score", 152, gfx.h - 172);

        }
    });

    window.GameOverScreen = GameOverScreen;

}(Ω));
