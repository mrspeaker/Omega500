(function (Ω) {

	"use strict";

	var colors = {

		rnd: function (s, l) {

			s = s === undefined ? 50 : s;
			l = l === undefined ? 50 : l;

			return "hsl(" + (Math.random() * 360 | 0) + ", " + s + "%, " + l + "%)";

		}

	};

	Ω.utils = Ω.utils || {};
	Ω.utils.colors = colors;

}(Ω));
