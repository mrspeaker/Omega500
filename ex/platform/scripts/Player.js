(function (Ω) {

	"use strict";

	var Player = Ω.Entity.extend({

		w: 25,
		h: 45,
		dir: 1,

		vel: [0, 0],

		sheet: new Ω.SpriteSheet("res/charzera.png", 25, 45, 3),
		sounds: {
			"crouch": new Ω.Sound("../res/audio/crouch.wav", 1)
		},

		init: function (startX, startY, isPlayer, screen) {

			this.screen = screen;

			this.isPlayer = isPlayer;

			this.anims = new Ω.Anims([
				new Ω.Anim("idle", this.sheet, 500, [[8, 0], [9, 0]]),
				new Ω.Anim("walk", this.sheet, 60, [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]]),
				new Ω.Anim("walkLeft", this.sheet, 60, [[14, 0], [15, 0], [16, 0], [17, 0], [18, 0], [19, 0], [20, 0], [21, 0]])
			]);

			this.x = startX;
			this.y = startY;
			this.speed = isPlayer ? 2 : 1 + Math.random() * 0.2;

			this.anims.set(isPlayer ? "idle" : "walk");

			this.particle = new Ω.Particle({});

			this.rays = [];

		},

		setMap: function (map) {
			this.map = map;
		},

		tick: function (map) {

			var x1 = 0,
				y1 = 0;

			this.anims.tick();
			this.particle.tick();

			if (this.isPlayer) {
				if (Ω.input.isDown("left")) {
					this.anims.setTo("walkLeft");
					x1 -= this.speed;
				}
				if (Ω.input.isDown("right")) {
					this.anims.setTo("walk");
					x1 += this.speed;
				}
				if (Ω.input.isDown("up")) {
					y1 -= this.speed;
				}
				if (Ω.input.isDown("down")) {
					y1 += this.speed;
				}

				if(x1 === 0 && y1 === 0) {
					this.anims.setTo("idle");
					if (this.anims.changed()) {
						//this.anims.setTo("idleLeft");
					}
				}

			} else {
				x1 += this.speed * this.dir;

				if (Ω.utils.rand(500) === 1) {
					this.dir *= -1;
					this.anims.setTo(this.dir > 0 ? "walk" : "walkLeft");
				}
			}

			this.move(x1, y1, map);

		},

		hitBlocks: function (xBlocks, yBlocks) {

			if (!this.isPlayer) {
				this.dir *= -1;
				this.anims.setTo(this.dir > 0 ? "walk" : "walkLeft");
			}

		},

		hit: function (by) {

			if (this.isPlayer) {
				if (!this.particle.running) {
					this.particle.play(this.x + (this.w / 2), this.y + 10);
					this.sounds.crouch.play();
				}
				this.screen.shake = new Ω.Shake(6);
			}

		},

		render: function (gfx, map) {

			// Test raycastin'
			if (this.isPlayer) {
				for (var i = 0; i < Math.PI * 2; i+= 0.2) {
					var hit = Ω.rays.cast(i, this.x + this.w / 2, this.y + this.h / 2, this.map);

					if (hit) {
						Ω.rays.draw(gfx, this.x + this.w / 2, this.y + this.h / 2, hit.x, hit.y, this.map);
					}
				}
			}

			this.anims.render(gfx, this.x, this.y);
			this.particle.render(gfx);
			gfx.ctx.strokeStyle = "rgba(100, 0, 0, 0.3)";
			gfx.ctx.strokeRect(this.x, this.y, this.w, this.h);

		}

	});

	window.Player = Player;

}(Ω));
