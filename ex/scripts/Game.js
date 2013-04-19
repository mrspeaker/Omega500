(function (Ω) {

	"use strict";

	var TestGame = Ω.Game.extend({

		canvas: "#board",

		init: function () {

			this._super();
			this.setScreen(new TitleScreen());

		}

	});

	window.TestGame = TestGame;

}(Ω));