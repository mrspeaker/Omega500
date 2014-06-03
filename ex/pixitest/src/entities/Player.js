(function (Ω) {

    "use strict";

    var Player = Ω.Entity.extend({
        w: 24,
        h: 32,

        sprite: new PIXI.Sprite(
            PIXI.Texture.fromImage("res/indy.png")
        ),

        init: function (x, y) {
            var sprite = this.sprite;
            this._super(x, y);

            sprite.filters = [new PIXI.SepiaFilter()];
            sprite.scale.x = sprite.scale.y = 0.3;

            game.addChild(sprite);
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
            var c = gfx.ctx,
                x = this.x - camera.x,
                y = this.y - camera.y,
                sprite = this.sprite;

            c.fillStyle = "#333";
            c.fillRect(x, y, this.w, this.h);

            sprite.y = y;
            sprite.x = x;
        }

    });

    window.Player = Player;

}(window.Ω));
