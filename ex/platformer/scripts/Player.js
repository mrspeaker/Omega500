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

		traits: [
			{trait: Ω.traits.Velocity},
			{trait: Ω.traits.Gravity}
		],

		init: function (startX, startY, isPlayer, screen) {

			this._super(startX, startY);

			this.screen = screen;

			this.isPlayer = isPlayer;

			this.anims = new Ω.Anims([
				new Ω.Anim("idle", this.sheet, 500, [[8, 0], [9, 0]]),
				new Ω.Anim("walk", this.sheet, 60, [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]]),
				new Ω.Anim("walkLeft", this.sheet, 60, [[14, 0], [15, 0], [16, 0], [17, 0], [18, 0], [19, 0], [20, 0], [21, 0]])
			]);

			this.speed = isPlayer ? 0.8 : 0.4 + Math.random() * 0.2;

			this.anims.set(isPlayer ? "idle" : "walk");

			this.particle = new Ω.Particle({});

			this.rays = [];

		},

		setMap: function (map) {
			this.map = map;
		},

		tick: function (map) {

			this.anims.tick();
			this.particle.tick();

			if (this.isPlayer) {

				if (Ω.input.isDown("touch")) {
					if (Ω.input.touch.x < this.x - this.screen.camera.x) {
						this.anims.setTo("walkLeft");
						this.moveBy(-this.speed, 0);
					}
					if (Ω.input.touch.x > this.x - this.screen.camera.x) {
						this.anims.setTo("walk");
						this.moveBy(this.speed, 0);
					}
				}

				if (Ω.input.isDown("left")) {
					this.anims.setTo("walkLeft");
					this.moveBy(-this.speed, 0);
				}
				if (Ω.input.isDown("right")) {
					this.anims.setTo("walk");
					this.moveBy(this.speed, 0);
				}
				if (!this.falling && Ω.input.isDown("up")) {
					this.moveBy(0, -this.speed * 30);
				}
				if (Ω.input.isDown("down")) {
					this.moveBy(0, this.speed);
				}

			} else {

				if (!this.falling) {
					this.moveBy(this.speed * this.dir, 0);
					this.anims.setTo(this.dir > 0 ? "walk" : "walkLeft");
				}

				if (Ω.utils.rand(500) === 1) {
					this.dir *= -1;
				}
			}

			this._super();

			if (!this.isMoving()) {
				this.anims.setTo("idle");
			}

			this.move(this.xo, this.yo, map);

		},

		isMoving: function () {

			return !(Math.abs(this.xo) < 0.05 && Math.abs(this.yo) < 0.05);

		},

		hitBlocks: function (xBlocks, yBlocks) {

			if (xBlocks && !this.isPlayer) {
				this.flip();
			}

		},

		flip: function () {

			this.dir *= -1;
			this.anims.setTo(this.dir > 0 ? "walk" : "walkLeft");

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
						Ω.rays.render(gfx, this.x + this.w / 2, this.y + this.h / 2, hit.x, hit.y, this.map);
					}
				}
			}

			if (this.falling) {
				this.sheet.render(gfx, 9, 0, this.x, this.y);
			} else {
				this.anims.render(gfx, this.x, this.y);
			}
			this.particle.render(gfx);
			gfx.ctx.strokeStyle = "rgba(100, 0, 0, 0.3)";
			gfx.ctx.strokeRect(this.x, this.y, this.w, this.h);

		}

	});

	window.Player = Player;

}(Ω));
