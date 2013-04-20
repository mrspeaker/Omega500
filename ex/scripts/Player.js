(function (Ω) {

	"use strict";

	var Player = Ω.Entity.extend({

		sheet: new Ω.SpriteSheet("res/charzera.png", 25, 45),

		init: function (startX, isPlayer) {

			this.isPlayer = isPlayer;

			this.animAdd(new Ω.Anim("idle", this.sheet, 100, [[13, 0]]));
			this.animAdd(new Ω.Anim("walk", this.sheet, 100, [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]]));

			this.x = startX;
			this.speed = 1 + Math.random() * 0.2;

			this.animSet(isPlayer ? "idle" : "walk");

		},

		tick: function (d) {

			this.anim.tick();

			if (this.isPlayer) {
				var inp = Ω.input;
				if (Ω.input.isDown("left")) {
					this.animSetIfNot("walk");
					this.x -= this.speed;
				} else if (Ω.input.isDown("right")) {
					this.animSetIfNot("walk");
					this.x += this.speed;
				} else {
					this.animSetIfNot("idle");
				}
			} else {
				this.x += d * this.speed;
			}


		},

		render: function (gfx) {

			this.anim.draw(gfx, this.x, 57);

		}

	});

	window.Player = Player;

}(Ω));
