(function (Ω) {

	"use strict";

	var LevelScreen = Ω.Screen.extend({

		player: null,
		baddies: null,
		cars: null,

		sheet: new Ω.SpriteSheet("res/tiles.png", 32, 32),

		init: function () {

			this.player = new Player([100, 100], this);

			this.baddies = [];
			this.cars = [];

			this.camera = new Ω.TrackingCamera(this.player, 0, 0, Ω.env.w, Ω.env.h);

			this.map = new Ω.Map(this.sheet, [
				[ 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
				[ 5, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
				[ 5, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
				[ 5, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
				[ 5, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
				[ 5, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
				[ 5, 1, 1, 2, 6, 0, 0, 0, 0, 6, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
				[ 5, 1, 1, 2, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 1, 1, 5, 0, 0, 0, 0, 0, 5],
				[ 5, 1, 1, 2, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 1, 1, 5, 0, 0, 0, 0, 0, 5],
				[ 5, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 5, 0, 0, 0, 0, 0, 5],
				[ 5, 1, 1, 2, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 1, 1, 5, 0, 0, 0, 0, 0, 5],
				[ 5, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 5, 0, 0, 0, 0, 0, 5],
				[ 5, 1, 1, 2, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 1, 1, 5, 0, 0, 0, 0, 0, 5],
				[ 5, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 5, 0, 0, 0, 0, 0, 5],
				[ 5, 1, 1, 2, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 1, 1, 5, 0, 0, 0, 0, 0, 5],
				[ 5, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 5, 0, 0, 0, 0, 0, 5],
				[ 5, 1, 1, 2, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 1, 1, 5, 0, 0, 0, 0, 0, 5],
				[ 5, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 5, 5, 5, 5, 0, 0, 5],
				[ 5, 1, 1, 2, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 5],
				[ 5, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 5],
				[ 5, 1, 1, 2, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 5],
				[ 5, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 5],
				[ 5, 1, 1, 2, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 5],
				[ 5, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 5],
				[ 5, 1, 1, 2, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 5],
				[ 5, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 5],
				[ 5, 1, 1, 2, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 5],
				[ 5, 0, 0, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 5, 5],
				[ 5, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
				[ 5, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
				[ 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
				[ 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
				[ 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
				[ 5, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
				[ 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
			], 3);

			this.player.setMap(this.map);

		},

		tick: function () {

			var self = this;

			this.camera.tick();

			this.player.tick();

			this.baddies = this.baddies.filter(function (b) {

				return b.tick();

			});

			this.cars = this.cars.filter(function (c) {

				return c.tick();

			});

			Ω.Physics.checkCollisions([
				this.player.bullets,
				this.baddies
			]);

			Ω.Physics.checkCollision(
				this.player,
				this.baddies, "hitSegue"
			);

			Ω.Physics.checkCollision(
				this.player,
				this.cars
			);

			if (Math.random() < 0.01) {
				this.baddies.push(
					new BusinessMan([Math.random() * 400, Math.random() * 400], (Math.random() * 7 | 0) + 1, this.map)
				);
			}

			if (Math.random() < 0.01) {
				this.cars.push(
					new Car([Math.random() * 400, this.map.h], 1, this.map)
				);
			}

			if (Ω.input.pressed("escape")) {
				game.setScreen(new TitleScreen());
			}

		},

		killed: function () {

			game.reset();

		},

		render: function (gfx) {

			var c = gfx.ctx,
				self = this;

			this.clear(gfx, "hsl(195, 10%, 50%)");

			this.camera.render(gfx, [
				this.map,
				this.cars,
				this.baddies,
				this.player,
				{
					render: function(gfx) {

						var a, b;

						for (var i = 0, len = self.baddies.length; i < len; i++) {
							a = self.baddies[i];
							for (var j = 0; j < i; j++) {
								b = self.baddies[j];

								if (a.state.is("RUNNING") && b.state.is("RUNNING")) {
									c.strokeStyle = "#0f0";
									c.beginPath();
									c.moveTo(a.x + a.w / 2, a.y + 20);
									c.lineTo(b.x + b.w / 2, b.y + 20);
									c.stroke();
								}
							}
						}

					}
				}
			]);


			gfx.text.drawShadowed("[esc]", 2, 10, 1, "7pt MonoSpace");

		}
	});

	window.LevelScreen = LevelScreen;

}(Ω));
