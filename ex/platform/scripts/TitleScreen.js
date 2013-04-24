(function (Ω) {

	"use strict";

	var TitleScreen = Ω.Screen.extend({

		time: 0,
		bg: new Ω.Image("res/background.png"),
		theme: new Ω.Sound("res/terminal.wav"),

		init: function () {

			this.theme.play();

		},

		tick: function () {

			this.time += 1;

			if (Ω.input.pressed("space") && this.time > 20) {
				game.setScreen(new MainScreen());
			}

		},

		render: function (gfx) {

			var c = gfx.ctx,
				title = "Ω500: testin'",
				start = "[space]";

			this.bg.render(gfx, 0, 0);

			c.font = "20pt Monospace";
			gfx.text.drawShadowed(title, gfx.w / 2 - gfx.text.getHalfWidth(title), gfx.h * 0.55);
			c.font = "8pt Monospace";
			gfx.text.drawShadowed(start, gfx.w / 2 - gfx.text.getHalfWidth(start), gfx.h * 0.75, 1);

		}

	});

	window.TitleScreen = TitleScreen;

}(Ω));