(function (Ω) {

    "use strict";

    var Player = Ω.Sprite.extend({
        w: 46,
        h: 54,

        opt: {
            img: "res/indy.png",
            scale: [0.3, 0.3],
            filters: [new PIXI.SepiaFilter()],
            offset: [0, 0]
        },

        tick: function () {
            var xo = 0,
                yo = 0;

            //this.sprite.filters[0].blur = Math.abs(Math.sin(Ω.utils.now() / 2000) * 10);
            if (Ω.input.isDown("left")) xo -= 3;
            if (Ω.input.isDown("right")) xo += 3;
            if (Ω.input.isDown("up")) yo -= 3;
            if (Ω.input.isDown("down")) yo += 3;

            this.move(xo, yo, this.map);

            return true;
        },

        render: function (gfx, camera) {

            this._super(gfx, camera);

            var c = gfx.ctx,
                x = this.x - camera.x,
                y = this.y - camera.y;

            c.fillStyle = "#333";
            c.fillRect(x, y, this.w, this.h);
        }

    });

    window.Player = Player;

}(window.Ω));
