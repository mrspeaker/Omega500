(function (Ω) {

	"use strict";

	var Map = Ω.Class.extend({

		init: function (sheet, data) {

			this.sheet = sheet;
			this.cells = data;
			this.cellH = this.cells.length;
			this.cellW = this.cells[0].length;
			this.h = this.cellH * this.sheet.h;
			this.w = this.cellW * this.sheet.w;

		},

		render: function (gfx, camera) {

			var tw = this.sheet.w,
				th = this.sheet.h,
				stx = camera.x / tw | 0,
				sty = camera.y / th | 0,
				endx = stx + (camera.w / tw | 0) + 1,
				endy = sty + (camera.h / th | 0) + 1,
				j,
				i;

			for (j = sty; j <= endy; j++) {
				if (j > this.cellH - 1) {
					continue;
				}
				for (i = stx; i <= endx; i++) {
					if (i > this.cellW - 1) {
						continue;
					}

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
