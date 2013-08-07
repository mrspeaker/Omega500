(function (Ω) {

	"use strict";

	var Map = Ω.Class.extend({

		x: 0, // Position required for camera rendering check
		y: 0,

		walkable: 0,

		repeat: false,
		parallax: 0,

		init: function (sheet, cells, walkable) {

			this.sheet = sheet;
			this.populate(cells || [[]]);

			this.walkable = walkable || 0;

		},

		populate: function (cells) {
			this.cells = cells;
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
				stx = (camera.x - (camera.x * this.parallax)) / tw | 0,
				sty = (camera.y - (camera.y * this.parallax)) / th | 0,
				endx = stx + (camera.w / camera.zoom / tw | 0) + 1,
				endy = sty + (camera.h / camera.zoom / th | 0) + 1,
				j,
				i,
				cell;

			if (this.parallax) {
				gfx.ctx.save();
				gfx.ctx.translate(camera.x * this.parallax | 0, camera.y * this.parallax | 0);
			}

			for (j = sty; j <= endy; j++) {
				if (j < 0 || (!this.repeat && j > this.cellH - 1)) {
					continue;
				}
				for (i = stx; i <= endx; i++) {
					if (!this.repeat && i > this.cellW - 1) {
						continue;
					}

					cell = this.cells[j % this.cellH][i % this.cellW];
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

			if (this.parallax) {
				gfx.ctx.restore();
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

		},

		imgToCells: function (canvas) {

			var ctx = canvas.getContext("2d"),
				pix = ctx.getImageData(0, 0, canvas.width, canvas.height).data,
				out = [];

			for (var j = 0; j < canvas.height; j++) {
				out.push([]);
				for (var i = 0; i < canvas.width; i++) {
					var pixOff = j * canvas.width * 4 + (i * 4);
					if (pix[pixOff + 3] !== 0) {
						out[out.length - 1].push(1);
					} else {
						out[out.length - 1].push(0);
					}
				}
			}


			this.populate(out);

		}

	});

	Ω.Map = Map;

}(Ω));
