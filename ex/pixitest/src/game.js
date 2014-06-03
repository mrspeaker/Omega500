(function (Ω) {

    "use strict";

    var OmegaGame = Ω.Game.extend({

        canvas: "#board",

        init: function (w, h) {

            this._super(w, h);

            this.stage = new PIXI.Stage();
            this.renderer = new PIXI.WebGLRenderer(w, h);
            this.renderer.render(this.stage);
            document.body.appendChild(this.renderer.view);

            Ω.evt.progress.push(function (remaining, max) {
                console.log((((max - remaining) / max) * 100 | 0) + "%");
            });

            Ω.input.bind({
                "space": "space",
                "touch": "touch",
                "escape": "escape",
                "left": "left",
                "right": "right",
                "up": "up",
                "down": "down",
                "moused": "mouse1"
            });

        },

        addChild: function (sprite) {

            this.stage.addChild(sprite);

        },

        load: function () {

            this.setScreen(new MainScreen());

        },

        render: function (gfx) {

            this._super(gfx);
            this.renderer.render(this.stage);

        }

    });

    window.OmegaGame = OmegaGame;

}(Ω));
