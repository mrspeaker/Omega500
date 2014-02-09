(function (Ω) {

	"use strict";

	var curIdx = -1,
		palette = [],
		colors;

	colors = {

		set: function (type) {

			palette.length = 0;
			for (var i = 0; i < 36; i++) {
				palette.push("hsl(" + (i * 10 | 0) + ", 50%, 50%)");
			}

		},

		rnd: function (s, l) {

			s = s === undefined ? 50 : s;
			l = l === undefined ? 50 : l;

			return "hsl(" + (Math.random() * 360 | 0) + ", " + s + "%, " + l + "%)";

		},

		next: function () {

			curIdx = (curIdx + 1) % palette.length;
			return palette[curIdx];

		}

	};

	colors.set();

	Ω.utils = Ω.utils || {};
	Ω.utils.colors = colors;

}(window.Ω));
