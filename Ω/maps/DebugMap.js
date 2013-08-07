(function (Ω) {

	"use strict";

	/* Just draw some colourful squares, eh... */

	var DebugMap = Ω.Map.extend({

		init: function (w, h, cellW, cellH, cells, walkable) {

			var ctx = Ω.gfx.createCanvas(w * cellW, h * cellH),
				data = Ω.gfx.ctx.createImageData(w * cellW, h * cellH),
				pix = data.data,
				numPix = data.width * data.height;

			for (var i = 0; i < numPix; i++) {
				pix[i * 4] = Math.random() * 255 | 0;
				pix[i * 4 + 1] = Math.random() * 255 | 0;
				pix[i * 4 + 2] = Math.random() * 255 | 0;
				pix[i * 4 + 3] = 255;
			}

			ctx.putImageData(data, 0, 0);

			this._super(
				new Ω.SpriteSheet(ctx.canvas, w, h),
				cells,
				walkable);

		}

	});

	Ω.DebugMap = DebugMap;

}(Ω));
