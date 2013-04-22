(function (Ω) {

	"use strict";

	var Entity = Ω.Class.extend({

		x: 0,
		y: 0,

		init: function () {},

		tick: function (d) {},

		hit: function (entity) {},

		hitBlocks: function(blocks) {},

		move: function (x, y, map) {

			// Temp holder for movement
			var xo = x,
				yo = y,

				xv = this.x + xo,
				yv = this.y + yo,

				hitX = false,
				hitY = false,

				xBlocks,
				yBlocks;


			// check blocks given vertical movement
			yBlocks = map.getBlocks([
				[this.x, yv],
				[this.x, yv + (this.h - 1)],
				[this.x + (this.w - 1), yv],
				[this.x + (this.w - 1), yv + (this.h - 1)]
			]);

			// if overlapping edges, move back a little
			if (y < 0 && (yBlocks[0] || yBlocks[2])) {
				yo = map.getBlockEdge(this.y, "VERT") - this.y;
				hitY = true;
			}
			if (y > 0 && (yBlocks[1] || yBlocks[3])) {
				yo = map.getBlockEdge(yv + (this.h - 1), "VERT") - this.y - this.h;
				hitY = true;
			}

			// Now check blocks given horizontal movement
			xBlocks = map.getBlocks([
				[xv, this.y],
				[xv, this.y + (this.h - 1)],
				[xv + (this.w - 1), this.y],
				[xv + (this.w - 1), this.y + (this.h - 1)]
			]);

			// if overlapping edges, move back a little
			if (x < 0 && (xBlocks[0] || xBlocks[1])) {
				xo = map.getBlockEdge(this.x) - this.x;
				hitX = true;
			}
			if (x > 0 && (xBlocks[2] || xBlocks[3])) {
				xo = map.getBlockEdge(xv + (this.w - 1)) - this.x - this.w;
				hitX = true;
			}

			if (hitX || hitY) {
				this.hitBlocks(hitX ? xBlocks : null, hitY ? yBlocks : null);
			}

			// Add the allowed movement
			this.x += xo;
			this.y += yo;

		},

		render: function (gfx) {}

	});

	Ω.Entity = Entity;

}(Ω));
