(function (Ω) {

	"use strict";

	var Map = Ω.Class.extend({

		x: 0, // Position required for camera rendering check
		y: 0,

		init: function (sheet, data) {

			this.sheet = sheet;
			this.cells = data;
			this.cellH = this.cells.length;
			this.cellW = this.cells[0].length;
			this.h = this.cellH * this.sheet.h;
			this.w = this.cellW * this.sheet.w;

		},

		render: function (gfx, camera) {

			if (!camera) {
				camera = {
					x: 0,
					y: 0,
					w: gfx.w,
					h: gfx.h,
					zoom: 1
				}
			}

			var tw = this.sheet.w,
				th = this.sheet.h,
				cellW = this.sheet.cellW,
				cellH = this.sheet.cellH,
				stx = camera.x / tw | 0,
				sty = camera.y / th | 0,
				endx = stx + (camera.w / camera.zoom / tw | 0) + 1,
				endy = sty + (camera.h / camera.zoom / th | 0) + 1,
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
						(cell - 1) % cellW  | 0,
						(cell - 1) / cellW | 0,
						i * tw,
						j * th);
				}
			}

		},

		getBlock: function (block) {

			var row = block[1] / this.sheet.h | 0,
				col = block[0] / this.sheet.w | 0;

			if (row < 0 || row > this.cellH - 1) {
				return;
			}

			return this.cells[row][col];

		},

		getBlocks: function (blocks) {

			var self = this;

			return blocks.map(function (b, i) {

				var row = b[1] / self.sheet.h | 0,
					col = b[0] / self.sheet.w | 0;

				if (row < 0 || row > self.cellH - 1) {
					return;
				}

				return self.cells[row][col];
			});

		},

		getBlockEdge: function(pos, vertical) {

			var snapTo = vertical ? this.sheet.h : this.sheet.w;

		    return Ω.utils.snap(pos, snapTo);

		},

		setBlock: function (pos, block) {

			var row = pos[1] / this.sheet.h | 0,
				col = pos[0] / this.sheet.w | 0;

			if (row < 0 || row > this.cellH - 1 || col < 0 || col > this.cellW - 1) {
				return;
			}

			this.cells[row][col] = block;

		}

	});

	Ω.Map = Map;

}(Ω));
