(function (Ω) {

	"use strict";

	var TrackingCamera = Ω.Camera.extend({

		x: 0,
		y: 0,
		w: 0,
		h: 0,

		init: function (entity, x, y, w, h) {
			this.entity = entity;
			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
			this.xRange = 40;
			this.yRange = 30;
			this.zoom = 1;
		},

		tick: function (d) {

			// TODO: add non-moving box area (like Mario)
			var center = {
					x: this.x + this.w / 2,
					y: this.y + this.h / 2
				},
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

			this._super(gfx, renderables.concat([{
				render: function (gfx, cam) {

					// Temp rendering to show tracking box
					var center = {
						x: cam.x + cam.w / 2,
						y: cam.y + cam.h / 2
					}
					gfx.ctx.strokeStyle = "red";
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
