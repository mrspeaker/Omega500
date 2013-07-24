(function (Ω) {

	"use strict";

	var Font = Ω.Class.extend({

		init: function (path, w, h) {

			this.w = w;
			this.h = h;

			this.sheet = new Ω.SpriteSheet(path, w, h);

		},

		write: function (gfx, msg, x, y, xo, yo) {

			if (msg === undefined) {
				msg = "";
			}
			msg = msg.toString();

			var cellW = this.sheet.cellW / 2,
				cellH = this.sheet.cellH / 2,
				xo = (xo || 0) * cellW,
				yo = (yo || 0) * cellH;

			for (var i = 0; i < msg.length; i++) {

				// Can set special char to change color!
				// if(msg.charCodeAt(i) % 2 === 1) {
				// 	xo = 1 * cellW;
				// } else {
				// 	xo = 0;
				// }

				// errrrrm.... wat? wat is this special phooey?
				var ch = msg.charCodeAt(i),
					special = [32, 46, 44, 58, 33, 63, 39, 34, -1, 91, 93],
					sindex = special.indexOf(ch),
					off = sindex >= 0 ? 36 + sindex : ch > 96 && ch < 123 ? ch - 97 : ch - 22,
					off2 = ch === 38 ? 44 : off, // Make my ampersand!
					xCell = off2 % cellW,
					yCell = off2 / cellW | 0;

				this.sheet.render(gfx, xo + xCell, yo + yCell, x + (i * this.w), y);

			}

		}

	});

	Ω.Font = Font;

}(Ω));
