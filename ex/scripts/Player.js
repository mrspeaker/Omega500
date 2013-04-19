(function (Ω) {

	"use strict";

	var Player = Ω.Entity.extend({

		sheet: new Ω.SpriteSheet("res/charzera.png", 24, 44),

		init: function (startX, color) {

			this.x = startX;
			this.color = color || "#fff";
			this.speed = 1 + Math.random() * 0.2;

		},

		tick: function (d) {

			this.x += d * this.speed;

		},

		render: function (gfx) {

			this.sheet.drawTile(gfx, 3, 0, this.x, 40 + Math.sin(this.x >> 2) * 20);

		}

	});

	window.Player = Player;

}(Ω));
