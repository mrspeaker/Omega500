(function (Ω) {

	"use strict";

	var PlatformGame = Ω.Game.extend({

		canvas: "#board",

		init: function (w, h) {

			this._super(w, h);

			Ω.input.bind([
				["space", "space"],
				["escape", "escape"],
				["left", "left"],
				["right", "right"],
				["up", "up"],
				["down", "down"],
				["mouse1", "moused"]
			]);

		},

		load: function () {

			this.setScreen(new TitleScreen());

		}

	});

	window.PlatformGame = PlatformGame;

}(Ω));