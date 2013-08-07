(function (Ω) {

	"use strict";

	/* Just draw some colourful squares, eh... */

	var DebugMap = Ω.Map.extend({

		init: function (tileW, tileH, xTiles, yTiles, cells, walkable) {

			var ctx = Ω.gfx.createCanvas(tileW * xTiles, tileH * yTiles),
				data = Ω.gfx.ctx.createImageData(tileW * xTiles,tileH * yTiles),
				pix = data.data,
				numPix = data.width * data.height;

			var off = Math.random() * 255 | 0;

			for (var i = 0; i < numPix; i++) {
				var row = i / data.width | 0,
					col = ((i / tileW) | 0) % data.width % xTiles,
					noise = Math.random() < 0.3 ? (Math.random() * 30) : 0,
					color = ((row / tileH) + 1 + (col * 3) + off) | 0;

				pix[i * 4] = (color * 50) % 255 + noise;
				pix[i * 4 + 1] = (color * 240) % 255 + noise;
				pix[i * 4 + 2] = (color * 80) % 255 + noise;
				pix[i * 4 + 3] = 255;
			}

			ctx.putImageData(data, 0, 0);

			document.body.appendChild(ctx.canvas);

			this._super(
				new Ω.SpriteSheet(ctx.canvas, tileW, tileH),
				cells,
				walkable);

		}

	});

	Ω.DebugMap = DebugMap;

}(Ω));
