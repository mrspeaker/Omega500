(function (Ω) {

	"use strict";

	var TrackingCamera = Ω.Camera.extend({

		x: 0,
		y: 0,
		w: 0,
		h: 0,
		xRange: 40,
		yRange: 30,

		init: function (entity, x, y, w, h, bounds) {

			this.w = w;
			this.h = h;
			this.zoom = 1;

			this.bounds = bounds;

			this.track(entity);

		},

		track: function (entity) {

			this.entity = entity;
			this.x = entity.x - (this.w / 2) + (entity.w / 2);
			this.y = entity.y - (this.h / 2);

			if (this.x < 0) {
				this.x = 0;
			}
			if (this.y < 0) {
				this.y = 0;
			}

		},

		tick: function () {

			var center = Ω.utils.center(this),
				e = this.entity,
				xr = this.xRange,
				yr = this.yRange,
				newX,
				newY;

			if(e.x < center.x - xr) {
				this.x = e.x - (this.w / 2) + xr;
				if (this.x < 0) {
					this.x = 0;
				}
			}
			if(e.x + e.w > center.x + xr) {
				this.x = e.x + e.w - (this.w / 2) - xr;
				if (this.bounds && this.x + this.w > this.bounds[0]) {
					this.x = this.bounds[0] - this.w;
				};
			}
			if(e.y < center.y - yr) {
				this.y = e.y - (this.h / 2) + yr;
				if (this.y < 0) {
					this.y = 0;
				}
			}
			if(e.y + e.h > center.y + yr) {
				this.y = e.y + e.h - (this.h / 2) - yr;
				if (this.bounds && this.y + this.h > this.bounds[1]) {
					this.y = this.bounds[1] - this.h;
				};
			}

		},

		render: function (gfx, renderables) {

			if (!this.debug) {
				this._super(gfx, renderables);
				return;
			}

			this._super(gfx, renderables.concat([{
				render: function (gfx, cam) {

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
