(function (Ω) {

	"use strict";

	var Entity = Ω.Class.extend({

		x: 0,
		y: 0,
		w: 32,
		h: 32,

		gravity: 0,
		falling: false,
		wasFalling: false,

		remove: false,

		init: function () {

		},

		tick: function () {

			return !(this.remove);

		},

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
				yBlocks,
				yBlocksWithXMove;

			if (this.falling) {
				y += this.gravity;
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

				// Hmmm... why only this guy needs to be floored?
				yo = map.getBlockEdge((yv | 0) + map.sheet.h, "VERT") - this.y;
				hitY = true;
			}
			if (y > 0 && (yBlocks[1] > map.walkable || yBlocks[3] > map.walkable)) {
				yo = map.getBlockEdge(yv + this.h, "VERT") - this.y - this.h;
				hitY = true;
				this.falling = false;
			}

			// Add the allowed Y movement
			this.y += yo;

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

			// Add the allowed X movement
			this.x += xo;

			// check if we're falling
			yBlocks = map.getBlocks([
				[this.x, this.y + this.h],
				[this.x + (this.w - 1), this.y + this.h]
			]);
			if (yBlocks[0] <= map.walkable && yBlocks[1] <= map.walkable) {
				this.falling = true;
			}

			return [xo, yo];
		},

		render: function (gfx) {}

	});

	Ω.Entity = Entity;

}(Ω));
