(function (Ω) {

	"use strict";

	var PlatformGame = Ω.Game.extend({

		canvas: "#board",

		init: function (w, h) {

			var self = this;

			this._super(w, h);

			Ω._progress = function (cur, max) {
				console.log(cur / max);
			};


			Ω.input.binds([
				["space", "space"],
				["escape", "escape"],
				["left", "left"],
				["right", "right"],
				["up", "up"],
				["down", "down"],
				["mouse1", "mouse1"]
			]);

			Ω._onload = function () {
				self.setScreen(new TitleScreen());
			}

		}

	});

	window.PlatformGame = PlatformGame;

}(Ω));