(function (Ω) {

	"use strict";

	var Player = Ω.Entity.extend({

		w: 25,
		h: 45,
		dir: 1,

		state: null,

		onLadder: false,
		wasOnLadder: false,

		traits: [
			{trait: Ω.traits.Velocity},
			{trait: Ω.traits.Gravity}
		],

		init: function (startX, startY, screen) {

			this._super(startX, startY);

			this.screen = screen;
			this.speed = 1.4;
			this.projectiles = [];

			this.state = new Ω.utils.State("BORN");

		},

		setMap: function (map) {

			this.map = map;

		},

		tick: function (map) {

			this.projectiles = this.projectiles.filter(function (p) {

				return p.tick(map);

			});

			this.state.tick();
			switch (this.state.get()) {
			case "BORN":
				this.state.set("ALIVE");
				break;
			case "ALIVE":
				this.doInput();
				break;
			case "HIT":
				if (this.state.count > 40) {
					this.state.set("ALIVE");
				}
				break;
			}

			this._super();
			this.move(this.xo, this.yo, map);

			this.checkBlocks(map);

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
			if (Ω.input.isDown("up")) {
				if (this.onLadder && !this.onTopOfLadder) {
					this.moveBy(0, -this.speed);
				} else {
					if (!this.falling) {
						this.moveBy(0, -this.speed * 30);
					}
				}
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

			if (this.state.is("ALIVE")) {
				this.state.set("HIT");
			}

		},

		checkBlocks: function (map) {

			this.wasOnLadder = this.onLadder;

			var blocks = map.getBlocks([
				[this.x, this.y],
				[this.x, this.y + (this.h - 1)],
				[this.x + (this.w - 1), this.y],
				[this.x + (this.w - 1), this.y + (this.h - 1)]
			]);

			this.onTopOfLadder = false;
			if (blocks.indexOf(1) > -1) {
				if (!this.wasOnLadder) {
					if (blocks[0] !== 1 && blocks[2] !== 1) {
						// Snap to top.
						this.y = Ω.utils.snap(this.y, map.sheet.h) + (map.sheet.h - this.h);
						this.onTopOfLadder = true;
					}
				}
				this.onLadder = true;
				this.falling = false;
			} else {
				this.onLadder = false;
			}


		},

		render: function (gfx, map) {

			this.projectiles.forEach(function (p) {

				return p.render(gfx);

			});

			if (this.state.is("HIT") && Ω.utils.toggle(100, 2)) {
				return;
			}

			gfx.ctx.fillStyle = "rgba(100, 0, 0, 0.3)";
			gfx.ctx.fillRect(this.x, this.y, this.w, this.h);

		}

	});

	window.Player = Player;

}(Ω));
