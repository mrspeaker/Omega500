(function (Ω) {

	"use strict";

	var Player = Ω.Entity.extend({

		spriteSheet: new Ω.SpriteSheet("resources/main.png"),

		init: function (startX) {

			this.x = startX;
			this.speed = 1 + Math.random() * 0.2;

		},

		tick: function (d) {

			this.x += d * this.speed;

		},

		render: function (gfx) {

			var c = gfx.ctx;

			c.fillStyle = "#fff";
			c.fillRect(this.x, 50 + Math.sin(this.x >> 2) * 20, 15, 35);

		}

	});

	window.Player = Player;

}(Ω));
