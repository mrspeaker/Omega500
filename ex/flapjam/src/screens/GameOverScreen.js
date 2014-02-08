(function (Ω) {

    "use strict";

    var GameOverScreen = Ω.Screen.extend({

        x: 0,
        y: 0,
        ac: 0,

        init: function () {

        },

        tick: function () {
            this.ac = Math.min(this.ac + 0.1, 5);
            this.y += this.ac;

            if (Ω.input.pressed("jump")) {
                game.setScreen(new TitleScreen());
            }
        },

        render: function (gfx) {

            var c = gfx.ctx,
                atlas = window.game.atlas;

            atlas.render(gfx, "bg_day", 0, 0);

            atlas.render(gfx, "land", 0, gfx.h - 112);

            atlas.render(gfx, "text_game_over", 40, gfx.h * 0.25);
            atlas.render(gfx, "score_panel", 24, gfx.h * 0.37);

            atlas.render(gfx, "button_play", 20, gfx.h - 172);
            atlas.render(gfx, "button_score", 152, gfx.h - 172);

        }
    });

    window.GameOverScreen = GameOverScreen;

}(Ω));
