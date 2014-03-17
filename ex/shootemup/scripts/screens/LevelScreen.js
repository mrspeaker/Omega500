(function (Ω) {

	"use strict";

	var LevelScreen = Ω.Screen.extend({

		player: null,
		baddies: null,
		cars: null,

		sheet: new Ω.SpriteSheet("res/tiles.png", 32, 32),

		loaded: false,

		init: function () {

			var self = this;

			this.player = new Player([0, 0], this);

			this.baddies = [];
			this.cars = [];

			this.cam = new Ω.TrackingCamera(this.player, 0, 0, Ω.env.w, Ω.env.h);

			Ω.utils.ajax("data/level00.js?" + Date.now(), function (xhr) {

				var data = JSON.parse(xhr.responseText);

				self.map = new Ω.Map(self.sheet, data.data, 3);
				self.player.setMap(self.map);
				self.player.x = self.map.w / 2;
				self.player.y = self.map.h - 100;

				self.loaded = true;

			});

		},

		tick: function () {

			var self = this;

			this.cam.tick();

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

			// Add some random enemies
			if (Math.random() < 0.01) {
				var b = Math.random() < 0.5 ? BusinessMan : BusinessWoman
				this.baddies.push(
					new b([Math.random() * 400, Math.random() * 400], (Math.random() * 7 | 0) + 1, this.map)
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

			this.cam.render(gfx, [
				this.map,
				this.cars,
				this.baddies,
				this.player,
				{
					// Custom render function to draw the green network lines
					render: function(gfx) {

						var a,
							b,
							i,
							j,
							len;

						for (i = 0, len = self.baddies.length; i < len; i++) {
							a = self.baddies[i];
							for (j = 0; j < i; j++) {
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
