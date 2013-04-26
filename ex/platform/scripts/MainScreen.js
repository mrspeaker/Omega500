(function (Ω) {

	"use strict";

	var MainScreen = Ω.Screen.extend({

		players: [],
		sheet: new Ω.SpriteSheet("res/tiles.png", 32),
		bg: new Ω.Image("res/background.png"),
		shake: null,

		init: function () {

			var i,
				self = this;

			this.players = [new Player(Ω.env.w, 51, true, this)];

			for (i = 1; i < 3; i++) {
				this.players.push(new Player(i * 40, 51, false, self));
				this.players.push(new Player(i * 40, 211, false, self));
			}

			this.spring = new Spring(100, 0.3, 0.9, 0);

			this.camera = new Ω.TrackingCamera(this.players[0], 0, 0, Ω.env.w, Ω.env.h);

			this.map = new Ω.Map(this.sheet, [
				[ 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 1, 1, 1, 1, 1, 7, 1, 1, 1,19, 0,19, 1, 1, 1, 1, 1, 1, 1, 1],
				[ 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2],
				[ 7, 0, 0, 1, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 3, 9, 0, 0, 3],
				[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				[ 1, 1, 1, 1, 1, 1, 1, 1, 1,19,19,19, 1, 1, 1, 1, 1, 1, 1, 1]
			]);
			this.players.forEach(function (p) {

				p.setMap(self.map);

			});

			this.physics = new Ω.Physics();

			this.trig = new Teleporter(19, 2, -15, 5);
			this.trig2 = new Teleporter(1, 7, -1, -5);

		},

		tick: function () {

			var self = this;

			this.camera.tick();
			//this.camera.x += (Math.sin(Date.now() / 1000) * 20);
			//this.camera.y += (Math.cos(Date.now() / 2000) * 20);

			var vel = this.spring.tick(this.players[1], this.players[2]);

			this.players.forEach(function (p, i) {

				p.tick(self.map, vel);

			});


			this.trig.tick();
			this.trig2.tick();

			this.physics.checkCollisions([
				this.players,
				this.trig,
				this.trig2
			]);

			if (this.shake && !this.shake.tick()) {
				this.shake = null;
			}

			if (Ω.input.pressed("space")) {
				// Track a random fellow!
				this.camera.track(
					this.players[Ω.utils.rand(this.players.length)]
				);
			}
			if (Ω.input.pressed("escape")) {
				game.setScreen(new TitleScreen());
			}

			if (Ω.input.pressed("mouse1")) {
				console.log(Ω.input.mouse.x | 0);
			}

		},

		render: function (gfx) {

			var c = gfx.ctx,
				self = this;

			c.fillStyle = "hsl(195, 40%, 50%)";
			c.fillRect(0, 0, gfx.w, gfx.h);

			c.save();

			this.bg.render(gfx, 0, 0);

			this.shake && this.shake.render(gfx);

			this.camera.render(gfx, [
				this.map,
				this.players,
				this.trig,
				this.trig2
			]);

			gfx.text.drawShadowed("[esc]", 2, 10, 1, "7pt MonoSpace");

			c.restore();
		}
	});

	window.MainScreen = MainScreen;

}(Ω));
