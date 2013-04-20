(function (Ω) {

	"use strict";

	var Map = Ω.Class.extend({

		init: function (sheet, data) {

			this.sheet = sheet;
			this.cells = data;

		},

		draw: function (gfx) {

			var tw = this.sheet.w,
				th = this.sheet.h,
				j,
				i;

			for (j = 0; j < this.cells.length; j++) {
				for (i = 0; i < this.cells[0].length; i++) {
					var cell = this.cells[j][i];
					if (cell === 0) {
						continue;
					}
					this.sheet.draw(gfx, cell - 1, 0, i * tw, j * th);
				}
			}

		}

	});

	Ω.Map = Map;

}(Ω));
