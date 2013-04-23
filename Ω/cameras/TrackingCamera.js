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
			this.zoom = 1;
		},

		tick: function (d) {

			// TODO: add non-moving box area (like Mario)

			this.x = this.entity.x - (Ω.env.w / 2);
			this.y = this.entity.y - (Ω.env.h / 2);

		}

	});

	Ω.TrackingCamera = TrackingCamera;

}(Ω));
