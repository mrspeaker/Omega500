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

            var c = gfx.ctx;

            this.clear(gfx, "hsl(195, 40%, 50%)");

            c.font = "20pt helvetica";
            c.fillStyle = "#0ff";
            c.fillText("Game Over. Score: 0", 100, 100);

        }
    });

    window.GameOverScreen = GameOverScreen;

}(Ω));
