(function (Ω) {

	"use strict";

	var TestGame = Ω.Game.extend({

		canvas: "#board",

		init: function () {

			this._super();

			Ω.input.bind(Ω.input.KEYS.space, "fire");
			Ω.input.bind(13, "enter");

			this.setScreen(new TitleScreen());

		}

	});

	window.TestGame = TestGame;

}(Ω));