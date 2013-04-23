(function (Ω) {

	"use strict";

	var IsoMap = Ω.Map.extend({

		init: function (sheet, data) {

			this._super(sheet, data);

		},

		render: function (gfx, camera) {

			// TODO: shouldn't mandate a camera. Draw to current view port?
			if (!camera) {
				console.error("Map needs a camera to render with");
				return;
			}

			var tw = this.sheet.w,
				th = this.sheet.h,
				stx = camera.x / tw | 0,
				sty = camera.y / th | 0,
				endx = stx + (camera.w / camera.zoom / tw | 0) + 1,
				endy = sty + (camera.h / 0.25 / camera.zoom / th | 0) + 1,
				j,
				i,
				cell;

			for (j = sty; j <= endy; j++) {
				if (j < 0 || j > this.cellH - 1) {
					continue;
				}
				for (i = stx; i <= endx; i++) {
					if (i > this.cellW - 1) {
						continue;
					}

					cell = this.cells[j][i];
					if (cell === 0) {
						continue;
					}
					this.sheet.render(
						gfx,
						cell - 1,
						0,
						j % 2 === 0 ? (i * tw) - 64: i * tw,
						j * th * 0.25);
				}
			}

		}

	});

	Ω.IsoMap = IsoMap;

}(Ω));
