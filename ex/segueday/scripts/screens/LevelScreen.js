(function (Ω) {

	"use strict";

	var LevelScreen = Ω.Screen.extend({

		player: null,

		init: function () {

			this.player = new Player([100, 100], this);

		},

		tick: function () {

			var self = this;

			this.player.tick();

			if (Ω.input.pressed("escape")) {
				game.setScreen(new TitleScreen());
			}

		},

		render: function (gfx) {

			var c = gfx.ctx,
				self = this;

			this.clear(gfx, "hsl(195, 10%, 50%)");

			this.player.render(gfx);

			gfx.text.drawShadowed("[esc]", 2, 10, 1, "7pt MonoSpace");

		}
	});

	window.LevelScreen = LevelScreen;

}(Ω));
