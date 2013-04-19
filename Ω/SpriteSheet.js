(function (Ω) {

	"use strict";

	var SpriteSheet = Ω.Class.extend({

		init: function (path) {

			console.log("new spritesheet.", path);

		}

	});

	Ω.SpriteSheet = SpriteSheet;

}(Ω));
