(function (Ω) {

    "use strict";

    var MainScreen = Ω.Screen.extend({

        sheet: new Ω.SpriteSheet("res/RPGpack_sheet.png", 64, 64),
        texture: PIXI.Texture.fromImage("res/RPGpack_sheet.png"),

        init: function () {

            this.cam = new Ω.Camera(0, 0, Ω.env.w, Ω.env.h);

            this.map = new PixiMap(this.sheet, this.texture, [
                [1,2,3,45,11,12,13,45,45,45],
                [1,0,0,0,0,0,0,0,0,0],
                [1,0,0,0,0,0,0,0,0,0],
                [1,0,0,0,0,0,0,0,0,0],
                [1,0,0,0,0,0,0,0,0,0],
                [1,0,2,0,0,4,0,4,0,0],
                [1,0,2,0,0,0,0,0,0,0],
                [1,0,2,2,2,2,2,2,2,2],
                [1,0,0,0,0,0,0,0,0,0],
                [1,1,1,1,1,1,1,1,1,1]
            ]);

            this.player = new Player(100, 100);
            this.player.map = this.map;
        },

        tick: function () {

            this.player.tick();
            this.cam.x = this.player.x - (Ω.env.w / 2);
            this.cam.y = this.player.y - (Ω.env.h / 2);
        },

        render: function (gfx) {

            this.clear(gfx, "hsl(195, 40%, 40%)");
            this.cam.render(gfx, [this.map]);
            this.player.render(gfx, this.cam);

        }
    });

    window.MainScreen = MainScreen;

}(window.Ω));
