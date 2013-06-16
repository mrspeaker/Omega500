(function (Ω) {

	"use strict";

	var PlatformGame = Ω.Game.extend({

		canvas: "#board",

		init: function (w, h) {

			var self = this;

			this._super(w, h);

			Ω.evt.progress.push(function (remaining, max) {
				// console.log(remaining, max);
			});


			Ω.input.binds([
				["space", "space"],
				["escape", "escape"],
				["left", "left"],
				["right", "right"],
				["up", "up"],
				["down", "down"],
				["mouse1", "mouse1"]
			]);

			Ω.evt.onload.push(function () {
				self.setScreen(new TitleScreen());
			});

		}

	});

	window.PlatformGame = PlatformGame;

}(Ω));