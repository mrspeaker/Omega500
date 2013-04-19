(function (Ω) {

	"use strict";

	var MainScreen = Ω.Screen.extend({

		players: [],

		init: function () {

			for (var i = 0; i < 10; i++) {

				this.players.push(new Player(-(i * 30)));

			}

		},

		tick: function (d) {

			this.players.forEach(function (p) {

				p.tick(d);

				if (p.x > Ω.env.w) {
					p.x = -20;
				}

			});

			if (Ω.input.pressed("enter")) {
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
