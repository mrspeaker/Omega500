(function (Ω) {

	"use strict";

	var MainScreen = Ω.Screen.extend({

		players: [],
		baddies: [],

		shake: null,

		init: function () {

			var i,
				self = this;

			this.players.length = this.baddies.length = 0;

			this.players = [new Player(Ω.env.w / 2, 51, true, this)];

			this.map = new Ω.DebugMap(38, 48, 10, 10, [
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
				[ 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
				[ 5, 0, 0, 5, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
				[ 0, 5, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 5, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 5, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 5],
				[ 5, 0, 0, 0, 5, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 5],
				[ 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 5],
				[ 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 5, 1, 5, 5, 5, 5, 1, 5, 5, 5],
				[ 5, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
				[ 5, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0],
				[ 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
				[ 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0],
				[ 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 5],
				[ 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
			], 1);

			this.camera = new Ω.TrackingCamera(
				this.players[0],
				0,
				0,
				Ω.env.w,
				Ω.env.h,
				[this.map.w, this.map.h]);
			this.camera.yRange = 80;
			this.camera.xRange = 100;


			this.players.forEach(function (p) {

				p.setMap(self.map);

			});

		},

		tick: function () {

			this.camera.tick();

			this.players.forEach(function (p, i) {

				p.tick(this.map);

			}, this);

			this.baddies = this.baddies.filter(function (b, i) {

				return b.tick(this.map);

			}, this);

			Ω.Physics.checkCollision(this.players[0], this.baddies);
			Ω.Physics.checkCollisions([this.baddies, this.players[0].projectiles]);

			if (Ω.utils.oneIn(90)) {
				this.baddies.push(
					new Ghoul(50, [48 * 2, 48 * 8, 48 * 14][Ω.utils.rand(3)])
				)
			}

			if (Ω.input.pressed("escape")) {

			}

		},

		render: function (gfx) {

			var c = gfx.ctx,
				self = this;

			this.clear(gfx, "hsl(195, 40%, 50%)");

			c.save();

			this.camera.render(gfx, [
				this.map,
				this.players,
				this.baddies
			]);

			gfx.text.drawShadowed("[esc]", 2, 10, 1, "7pt MonoSpace");

			c.restore();
		}
	});

	window.MainScreen = MainScreen;

}(Ω));
