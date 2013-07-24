(function (Ω) {

	"use strict";

	var LevelScreen = Ω.Screen.extend({

		init: function () {


		},

		tick: function () {

			var self = this;

			if (Ω.input.pressed("escape")) {
				game.setScreen(new TitleScreen());
			}

		},

		render: function (gfx) {

			var c = gfx.ctx,
				self = this;

			this.clear(gfx, "hsl(195, 40%, 20%)");

			gfx.text.drawShadowed("[esc]", 2, 10, 1, "7pt MonoSpace");

		}
	});

	window.LevelScreen = LevelScreen;

}(Ω));
