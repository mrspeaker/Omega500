(function (Ω) {

	"use strict";

	var TrackingCamera = Ω.Camera.extend({

		x: 0,
		y: 0,
		w: 0,
		h: 0,
		xRange: 40,
		yRange: 30,

		init: function (entity, x, y, w, h) {

			this.w = w;
			this.h = h;
			this.zoom = 1;

			this.track(entity);

		},

		track: function (entity) {
			this.entity = entity;
			this.x = entity.x - (Ω.env.w / 2) + (entity.w / 2);
			this.y = entity.y - (Ω.env.h / 2);
		},

		tick: function () {

			var center = Ω.utils.center(this),
				e = this.entity,
				xr = this.xRange,
				yr = this.yRange;

			if(e.x < center.x - xr) {
				this.x = e.x - (Ω.env.w / 2) + xr;
			}
			if(e.x + e.w > center.x + xr) {
				this.x = e.x + e.w - (Ω.env.w / 2) - xr;
			}
			if(e.y < center.y - yr) {
				this.y = e.y - (Ω.env.h / 2) + yr;
			}
			if(e.y + e.h > center.y + yr) {
				this.y = e.y + e.h - (Ω.env.h / 2) - yr;
			}

		},

		render: function (gfx, renderables) {

			if (!this.debug) {
				this._super(gfx, renderables);
				return;
			}

			this._super(gfx, renderables.concat([{
				render: function (gfx, cam) {

					// Temp rendering to show tracking box
					var center = Ω.utils.center(cam);

					gfx.ctx.strokeStyle = "rgba(200, 0, 0, 0.6)";
					gfx.ctx.strokeRect(
						center.x - cam.xRange,
						center.y - cam.yRange,
						cam.xRange * 2,
						cam.yRange * 2);

				}
			}]));

		}

	});

	Ω.TrackingCamera = TrackingCamera;

}(Ω));
