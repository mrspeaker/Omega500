(function (Ω) {

	"use strict";

	var Entity = Ω.Class.extend({

		x: 0,
		y: 0,

		init: function () {},

		tick: function (d) {},

		render: function (gfx) {}

	});

	Ω.Entity = Entity;

}(Ω));
