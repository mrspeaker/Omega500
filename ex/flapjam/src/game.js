(function (Ω) {

    "use strict";

    var OmegaGame = Ω.Game.extend({

        canvas: "#board",

        fps: false,
        best: 0,

        atlas: new Ω.SpriteAtlas("csv", "res/flappyAtlas/atlas"),

        init: function (w, h) {

            this._super(w, h);

            this.loadHi();

            Ω.evt.progress.push(function (remaining, max) {
                console.log((((max - remaining) / max) * 100 | 0) + "%");
            });

            Ω.input.bind({
                "jump": ["space", "mouse1"] ,
                "touch": "touch",
                "escape": "escape",
                "left": "left",
                "right": "right",
                "up": "up",
                "down": "down"
            });

        },

        load: function () {

            this.setScreen(new TitleScreen());

        },

        loadHi: function () {
            try {
                if ("localStorage" in window) {
                    var tmp = localStorage.getItem("flapHi");
                    if (tmp) {
                        this.best = parseInt(tmp, 10) || 0;
                    }
                }
            }
            catch (e) {
                console.log("no localstorage");
                this.best = 0;
            }
        },

        saveHi: function () {
            try {
                if ("localStorage" in window) {
                    localStorage.setItem("flapHi", this.best);
                }
            } catch (e) {

            }
        },

        gotScore: function (score) {
            if (score > window.game.best) {
                window.game.best = score;
                this.saveHi();
                return true;
            }
            return false;
        }

    });

    window.OmegaGame = OmegaGame;

}(Ω));
