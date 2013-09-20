(function (Ω) {

	"use strict";

	var MainScreen = Ω.Screen.extend({

		players: [],
		baddies: [],

		shake: null,
		sheet: new Ω.SpriteSheet("res/tilesa.png", 19, 24),

		init: function () {

			var i,
				self = this;

			this.players.length = this.baddies.length = 0;

			this.players = [new Player(Ω.env.w / 2, 51, true, this)];

			this.map = new Ω.Map(this.sheet, [
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 1, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 7, 1, 7, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7],
				[ 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 1, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7],
				[ 7, 0, 0, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 7, 7, 1, 7, 7, 7, 5, 5, 5, 5, 5, 5, 2, 5, 5, 5, 5, 7],
				[ 7, 0, 0, 7, 7, 7, 7, 7, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 2, 7, 7, 7, 7, 7],
				[ 0, 5, 0, 0, 0, 6, 0, 6, 0, 6, 0, 6, 0, 6, 0, 6, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 7, 7],
				[ 5, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 7, 7, 7],
				[ 7, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 1, 0, 0, 0, 0, 0, 0, 3, 3, 3, 2, 7, 7],
				[ 7, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 7, 7, 7, 2, 7, 7],
				[ 7, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 7, 7, 7, 7, 2, 7, 7],
				[ 7, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 5, 5, 1, 5, 5, 5, 5, 5, 5, 7, 2, 4, 4, 7, 7],
				[ 7, 0, 0, 6, 0, 6, 0, 6, 0, 6, 0, 6, 0, 6, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 4, 0, 0, 7, 7],
				[ 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 7],
				[ 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
				[ 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
				[ 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 4, 0, 0, 0, 0, 5],
				[ 7, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 2, 5, 5, 5, 5, 5, 5, 5],
				[ 7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 5, 5, 5, 5, 5, 5, 5],
				[ 7, 7, 7, 7, 7, 7, 7, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5],
				[ 7, 7, 7, 7, 7, 7, 7, 7, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5],
				[ 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
			], BLOCKS.walkable);

			/*var cells = [],
				mapW = 20,
				mapH = 25,
				platH = 4,
				ladder = null;

			for (var y = 0; y < mapH; y++) {
				cells[y] = [];
				if (y % platH === 0) {
					ladder = Ω.utils.rand(mapW);
				}
				for (var x = 0; x < mapW; x++) {
					if (y % platH === 0 && Ω.utils.rand(100) > 10) {
						cells[y].push(ladder && x === ladder ? 1 : 5);
						continue;
					}
					cells[y].push(ladder && x === ladder ? 1 : 0)

				}
			}
			this.map.populate(cells);*/

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
			Ω.Physics.checkCollision(this.players[0], this.players[0].projectiles, "hitSpear");

			if (Ω.utils.oneIn(90)) {
				this.baddies.push(
					new Ghoul(50, [24 * 4.5, 24 * 10.5, 24 * 16.5][Ω.utils.rand(3)])
				)
			}

			if (Ω.input.pressed("escape")) {

			}

		},

		render: function (gfx) {

			var c = gfx.ctx,
				self = this;

			this.clear(gfx, "hsl(40, 40%, 10%)");

			c.save();

			this.camera.render(gfx, [
				this.map,
				this.players,
				this.baddies
			]);

			c.restore();
		}
	});

	window.MainScreen = MainScreen;

}(Ω));
