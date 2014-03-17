(function (Ω) {

	"use strict";

	var MainScreen = Ω.Screen.extend({

		players: [],

		bg: new Ω.Image("../res/images/background.png", 1),
		sheet: new Ω.SpriteSheet("res/tiles.png", 32, 32),

		shake: null,

		init: function () {

			var i,
				self = this;

			this.players = [new Player(Ω.env.w, 51, true, this)];

			for (i = 1; i < 3; i++) {
				this.players.push(new Player(i * 40, 51, false, self));
				this.players.push(new Player(i * 40, 211, false, self));
			}

			this.map = new Ω.Map(this.sheet, [
				[ 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 1, 1, 1, 1, 1, 7, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[ 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2],
				[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				[ 7, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 9, 0, 0, 3],
				[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
				[ 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2],
				[ 7, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
				[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 9, 0, 0, 1],
				[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			]);

			this.para = new Ω.Map(this.sheet, [
				[23,29,25,31,34],
				[24,32,22,32,30],
				[20,30,28,34,32],
				[31,23,32,31,19],
				[32,21,31, 0,32],
				[34,26,32,25,34]
			]);
			this.para.repeat = true;
			this.para.parallax = 0.5;

			this.cam = new Ω.TrackingCamera(
				this.players[0],
				0,
				0,
				Ω.env.w,
				Ω.env.h,
				[this.map.w, this.map.h]);


			this.players.forEach(function (p) {

				p.setMap(self.map);

			});

			this.teleport1 = new Teleporter(19, 2, -15, 6);
			this.teleport2 = new Teleporter(1, 8, 0, -6);
			this.teleport3 = new Teleporter(18, 14, 0, -12);

		},

		tick: function () {

			var self = this;

			this.cam.tick();

			this.players.forEach(function (p, i) {

				p.tick(self.map);

			});

			this.teleport1.tick();
			this.teleport2.tick();
			this.teleport3.tick();

			Ω.Physics.checkCollisions([
				this.players,
				this.teleport1,
				this.teleport2,
				this.teleport3
			]);

			if (this.shake && !this.shake.tick()) {
				this.shake = null;
			}

			// Handle some inputs
			if (Ω.input.pressed("space")) {
				// Track a random fellow!
				this.cam.track(
					this.players[Ω.utils.rand(this.players.length)]
				);
			}
			if (Ω.input.pressed("escape")) {
				game.setScreen(new TitleScreen());
			}

			if (Ω.input.pressed("moused")) {
				console.log(Ω.input.mouse.x);
			}

		},

		render: function (gfx) {

			var c = gfx.ctx,
				self = this;

			this.clear(gfx, "hsl(195, 40%, 50%)");

			c.save();

			this.bg.render(gfx, 0, 0);

			this.shake && this.shake.render(gfx);

			this.cam.render(gfx, [
				this.para,
				this.map,
				this.players,
				this.teleport1,
				this.teleport2,
				this.teleport3
			]);

			gfx.text.drawShadowed("[esc]", 2, 10, 1, "7pt MonoSpace");

			c.restore();
		}
	});

	window.MainScreen = MainScreen;

}(Ω));
