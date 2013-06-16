(function (Ω) {

	"use strict";

	/* WIP: map for doing Wolf3D style games */

	var RayCastMap = Ω.Map.extend({

		init: function (sheet, data, entity) {

			this.entity = entity;

			this._super(sheet, data);

		},

		castRays: function (gfx) {

			var idx = 0,
				i,
				rayPos,
				rayDist,
				rayAngle,
				fov = 60 * Math.PI / 180,
				viewDistance = (gfx.w / 2) / Math.tan((fov / 2)),
				numRays = 15,
				w = 16;

			/*for (var i = 0; i < numRays; i++) {
				rayPos = (-numRays / 2 + i) * w;
				rayDist = Math.sqrt(rayPos * rayPos + viewDistance * viewDistance);
				rayAngle = Math.asin(rayPos / rayDist);

				this.castRay(gfx, Math.PI + rayAngle, idx++);
			}*/
			var p = this.entity;
			for (var i = 0; i < Math.PI * 2; i+= 0.2) {
				var hit = Ω.rays.cast(i, p.x + p.w / 2, p.y + p.h / 2, this);

				if (hit) {
					Ω.rays.draw(gfx, p.x + p.w / 2, p.y + p.h / 2, hit.x, hit.y, this);
				}
			}

		},

		render: function (gfx, camera) {

			// TODO: raycast texture draw
			this._super(gfx, camera);

			this.castRays(gfx);

		}

	});

	Ω.RayCastMap = RayCastMap;

}(Ω));
