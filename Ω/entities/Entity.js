(function (Ω) {

	"use strict";

	var Entity = Ω.Class.extend({

		x: 0,
		y: 0,
		w: 32,
		h: 32,

		falling: false,
		wasFalling: false,

		init: function () {

		},

		tick: function () {},

		hit: function (entity) {},

		hitBlocks: function(xBlocks, yBlocks) {},

		move: function (x, y, map) {

			// Temp holder for movement
			var xo,
				yo,

				xv,
				yv,

				hitX = false,
				hitY = false,

				xBlocks,
				yBlocks;

			if (this.falling) {
				y += this.ySpeed * 2;
			}
			xo = x;
			yo = y;

			xv = this.x + xo;
			yv = this.y + yo;

			// check blocks given vertical movement TL, BL, TR, BR
			yBlocks = map.getBlocks([
				[this.x, yv],
				[this.x, yv + (this.h - 1)],
				[this.x + (this.w - 1), yv],
				[this.x + (this.w - 1), yv + (this.h - 1)]
			]);

			// if overlapping edges, move back a little
			if (y < 0 && (yBlocks[0] > map.walkable || yBlocks[2] > map.walkable)) {
				yo = map.getBlockEdge(yv + map.sheet.h, "VERT") - this.y;
				hitY = true;
			}
			if (y > 0 && (yBlocks[1] > map.walkable || yBlocks[3] > map.walkable)) {
				yo = map.getBlockEdge(yv + this.h, "VERT") - this.y - this.h;
				hitY = true;
				this.falling = false;
			}

			// Now check blocks given horizontal movement TL, BL, TR, BR
			xBlocks = map.getBlocks([
				[xv, this.y],
				[xv, this.y + (this.h - 1)],
				[xv + (this.w - 1), this.y],
				[xv + (this.w - 1), this.y + (this.h - 1)]
			]);

			// if overlapping edges, move back a little
			if (x < 0 && (xBlocks[0] > map.walkable || xBlocks[1] > map.walkable)) {
				xo = map.getBlockEdge(xv + map.sheet.w) - this.x;
				hitX = true;
			}
			if (x > 0 && (xBlocks[2] > map.walkable || xBlocks[3] > map.walkable)) {
				xo = map.getBlockEdge(xv + this.w) - this.x - this.w;
				hitX = true;
			}

			if (hitX || hitY) {
				this.hitBlocks(hitX ? xBlocks : null, hitY ? yBlocks : null);
			}

			// Add the allowed movement
			this.x += xo;
			this.y += yo;

			return [xo, yo];
		},

		render: function (gfx) {}

	});

	Ω.Entity = Entity;

}(Ω));
