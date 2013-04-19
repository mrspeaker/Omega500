(function (Ω) {

	"use strict";

	var Player = Ω.Entity.extend({

		sheet: new Ω.SpriteSheet("res/charzera.png", 25, 44),

		init: function (startX, anim) {

			this.x = startX;
			this.anim = anim
			this.speed = 1 + Math.random() * 0.2;

		},

		tick: function (d) {

			this.x += d * this.speed;

		},

		render: function (gfx) {

			if (this.anim) {
				var inp = Ω.input;
				if (Ω.input.isDown("left") || Ω.input.isDown("right")) {
					this.sheet.drawTile(gfx, (Date.now() >> 5 | 0) % 7, 0, this.x, 55);
				} else {
					this.sheet.drawTile(gfx, 0, 0, this.x, 55);
				}
			} else {
				this.sheet.drawTile(gfx, 3, 0, this.x, 40 + Math.sin(this.x >> 2) * 20);
			}

		}

	});

	window.Player = Player;

}(Ω));
