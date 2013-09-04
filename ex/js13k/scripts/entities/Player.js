(function (Ω) {

	"use strict";

	var Player = Ω.Entity.extend({

		w: 25,
		h: 45,
		dir: 1,

		traits: [
			{trait: Ω.traits.Velocity},
			{trait: Ω.traits.Gravity}
		],

		init: function (startX, startY, screen) {

			this._super(startX, startY);

			this.screen = screen;
			this.speed = 1.4;
			this.projectiles = [];

		},

		setMap: function (map) {

			this.map = map;

		},

		tick: function (map) {

			this.doInput();

			this.projectiles = this.projectiles.filter(function (p) {

				return p.tick(map);

			});

			this._super();
			this.move(this.xo, this.yo, map);

		},

		doInput: function () {

			if (Ω.input.isDown("left")) {
				this.moveBy(-this.speed, 0);
				this.dir = -1;
			}
			if (Ω.input.isDown("right")) {
				this.moveBy(this.speed, 0);
				this.dir = 1;
			}
			if (!this.falling && Ω.input.isDown("up")) {
				this.moveBy(0, -this.speed * 30);
			}
			if (Ω.input.isDown("down")) {
				this.moveBy(0, this.speed);
			}

			if (Ω.input.pressed("fire")) {
				this.projectiles.push(
					new Spear(this.x, this.y, this.dir)
				);
			}

		},

		isMoving: function () {

			return !(Math.abs(this.xo) < 0.05 && Math.abs(this.yo) < 0.05);

		},

		hitBlocks: function (xBlocks, yBlocks) {

		},

		hit: function (by) {

		},

		render: function (gfx, map) {

			this.projectiles.forEach(function (p) {

				return p.render(gfx);

			});

			gfx.ctx.strokeStyle = "rgba(100, 0, 0, 0.3)";
			gfx.ctx.strokeRect(this.x, this.y, this.w, this.h);

		}

	});

	window.Player = Player;

}(Ω));
