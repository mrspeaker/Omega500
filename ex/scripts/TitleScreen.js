(function (Ω) {

	"use strict";

	var TitleScreen = Ω.Screen.extend({

		time: 0,
		bg: new Ω.Image("res/background.png"),
		theme: new Ω.Sound("res/terminal.wav"),

		init: function () {

			this.theme.play();

		},

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
			gfx.drawTextShadow("Ω500: testin'", 30, 80);
			gfx.drawTextShadow("[space]", gfx.w / 2 - 20, 110, 1, "8pt Monospace");

		}

	});

	window.TitleScreen = TitleScreen;

}(Ω));