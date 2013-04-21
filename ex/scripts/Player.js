(function (Ω) {

	"use strict";

	var Player = Ω.Entity.extend({

		w: 25,
		h: 45,

		sheet: new Ω.SpriteSheet("res/charzera.png", 25, 45),
		sounds: {
			"crouch": new Ω.Sound("res/crouch.wav", 0.1)
		},

		init: function (startX, isPlayer) {

			this.isPlayer = isPlayer;

			this.animAdd(new Ω.Anim("idle", this.sheet, 500, [[8, 0], [9, 0]]));
			this.animAdd(new Ω.Anim("walk", this.sheet, 70, [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]]));

			this.x = startX;
			this.speed = 1 + Math.random() * 0.2;

			this.animSet(isPlayer ? "idle" : "walk");

		},

		tick: function (d) {

			this.anim.tick();

			if (this.isPlayer) {
				if (Ω.input.isDown("left")) {
					this.animSetIfNot("walk");
					this.x -= this.speed;
				} else if (Ω.input.isDown("right")) {
					this.animSetIfNot("walk");
					this.x += this.speed;
				} else {
					this.animSetIfNot("idle");
					if (this.anim.changed) {
						this.sounds.crouch.play();
					}
				}
			} else {
				this.x += d * this.speed;
			}

		},

		render: function (gfx) {

			this.anim.draw(gfx, this.x, 52);

		}

	});

	window.Player = Player;

}(Ω));
