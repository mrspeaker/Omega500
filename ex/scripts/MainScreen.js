(function (Ω) {

	"use strict";

	var MainScreen = Ω.Screen.extend({

		players: [],

		init: function () {

			var i;

			this.players = [new Player(Ω.env.w / 2, "hsl(20, 90%, 20%)")];

			for (i = 1; i < 10; i++) {
				this.players.push(new Player(-(i * 30)));
			}

		},

		tick: function (d) {

			if (Ω.input.isDown("left")) {
				this.players[0].x -= 5;
			}
			if (Ω.input.isDown("right")) {
				this.players[0].x += 5;
			}

			this.players.forEach(function (p, i) {

				if (i === 0) { return }

				p.tick(d);

				if (p.x > Ω.env.w) {
					p.x = -20;
				}

			});

			if (Ω.input.pressed("escape")) {
				game.setScreen(new TitleScreen());
			}

		},

		render: function (gfx) {

			var c = gfx.ctx;

			c.fillStyle = "hsl(195, 40%, 50%)";
			c.fillRect(0, 0, gfx.w, gfx.h);

			this.players.forEach(function (p) {

				p.render(gfx);

			});

			c.fillStyle = "hsl(195, 40%, 30%)";
			c.fillRect(0, 100, gfx.w, gfx.h - 100);
		}
	});

	window.MainScreen = MainScreen;

}(Ω));
