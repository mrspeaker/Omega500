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

            var c = gfx.ctx,
                now = Date.now(),
                atlas = game.atlas;

            atlas.render(gfx, "bg_day", 0, 0);

            var ySin = Math.sin(now / 150) * 7;
            atlas.render(gfx, "title", 55, gfx.h * 0.25);
            atlas.render(
                gfx,
                "bird0_" + ((now / 100 | 0) % 3),
                gfx.w * 0.42,
                gfx.h * 0.38 + ySin - 5
            );


            atlas.render(gfx, "land", -((now / 6 | 0) % 288), gfx.h - 112);
            atlas.render(gfx, "land", 289 - ((now / 6 | 0) % 288), gfx.h - 112);

            atlas.render(gfx, "button_play", 20, gfx.h - 172);
            atlas.render(gfx, "button_score", 152, gfx.h - 172);
            atlas.render(gfx, "button_rate", 106, gfx.h - 242);

            atlas.render(gfx, "brand_copyright", 73, gfx.h - 94);

        }
    });

    window.TitleScreen = TitleScreen;

}(window.Ω, window.MainScreen));
