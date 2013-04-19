(function (Ω) {

	"use strict";

	var TitleScreen = Ω.Screen.extend({

		time: 0,

		tick: function (d) {

			this.time += d;

			if (this.time > 80) {
				game.setScreen(new MainScreen());
			}

		},

		render: function (gfx) {

			var c = gfx.ctx;

			c.fillStyle = "hsl(135, 40%, 50%)";
			c.fillRect(0, 0, gfx.w, gfx.h);

			c.fillStyle = "#fff";
			c.font = "20pt Monospace";
			c.fillText("Ω500: testin'", 30, 80);

		}

	});

	window.TitleScreen = TitleScreen;

}(Ω));