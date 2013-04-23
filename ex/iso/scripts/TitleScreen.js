(function (Ω) {

	"use strict";

	var TitleScreen = Ω.Screen.extend({

		time: 0,

		init: function () {

		},

		tick: function (d) {

			this.time += d;

			if (Ω.input.pressed("fire") && this.time > 20) {
				game.setScreen(new MainScreen());
			}

		},

		render: function (gfx) {

			var c = gfx.ctx,
				title = "Ω500: iso test'",
				start = "[space]";


			c.fillStyle = "hsl(140, 40%, 50%)";
			c.fillRect(0, 0, gfx.w, gfx.h);

			c.font = "20pt Monospace";
			gfx.text.drawShadowed(title, gfx.w / 2 - gfx.text.getHalfWidth(title), gfx.h * 0.55);
			c.font = "8pt Monospace";
			gfx.text.drawShadowed(start, gfx.w / 2 - gfx.text.getHalfWidth(start), gfx.h * 0.75, 1);

		}

	});

	window.TitleScreen = TitleScreen;

}(Ω));