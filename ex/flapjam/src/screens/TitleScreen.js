(function (Ω, MainScreen) {

    "use strict";

    var TitleScreen = Ω.Screen.extend({

        x: 0,
        y: 0,
        ac: 0,

        init: function () {

        },

        tick: function () {
            this.ac = Math.min(this.ac + 0.1, 5);
            this.y += this.ac;

            if (Ω.input.pressed("jump")) {
                window.game.setScreen(new MainScreen());
            }
        },

        render: function (gfx) {

            var c = gfx.ctx;

            this.clear(gfx, "hsl(195, 40%, 50%)");

            c.font = "20pt helvetica";
            c.fillStyle = "#0ff";
            c.fillText("Crappy Bird", 100, 100);

        }
    });

    window.TitleScreen = TitleScreen;

}(window.Ω, window.MainScreen));
