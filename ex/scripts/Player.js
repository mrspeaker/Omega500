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

			this.anims = new Ω.Anims([
				new Ω.Anim("idle", this.sheet, 500, [[8, 0], [9, 0]]),
				new Ω.Anim("walk", this.sheet, 70, [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]]),
				new Ω.Anim("walkLeft", this.sheet, 70, [[13, 3], [12, 3], [11, 3], [10, 3], [9, 3], [8, 3], [7, 3], [6, 3]])
			]);

			this.x = startX;
			this.y = 51;
			this.speed = 1 + Math.random() * 0.2;

			this.anims.set(isPlayer ? "idle" : "walk");

		},

		tick: function (d, map) {

			var x1 = 0,
				y1 = 0;

			this.anims.tick();

			if (this.isPlayer) {
				if (Ω.input.isDown("left")) {
					this.anims.setTo("walkLeft");
					x1 -= this.speed;
				} else if (Ω.input.isDown("right")) {
					this.anims.setTo("walk");
					x1 += this.speed;
				} else {
					this.anims.setTo("idle");
					if (this.anims.changed) {
						this.sounds.crouch.play();
					}
				}
			} else {
				x1 += d * this.speed;
			}

			this.move(x1, y1, map);

		},

		hitBlocks: function (blocks) {

			this.speed *= -1;

		},

		render: function (gfx) {

			this.anims.render(gfx, this.x, this.y);

		}

	});

	window.Player = Player;

}(Ω));
