(function (Ω) {

	"use strict";

	var TitleScreen = Ω.Screen.extend({

		time: 0,
		bg: new Ω.Image("res/background.png"),

		tick: function (d) {

			this.time += d;

			if (Ω.input.pressed("fire") && this.time > 20) {
				game.setScreen(new MainScreen());
			}

		},

		render: function (gfx) {

			var c = gfx.ctx;

			this.bg.draw(gfx, -50, 0);

			c.font = "20pt Monospace";

			c.fillStyle = "#000";
			c.fillText("Ω500: testin'", 32, 82);

			c.fillStyle = "#fff";
			c.fillText("Ω500: testin'", 30, 80);

		}

	});

	window.TitleScreen = TitleScreen;

}(Ω));