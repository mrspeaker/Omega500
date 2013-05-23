(function (Ω) {

	"use strict";

	var Physics = Ω.Class.extend({

		checkCollision: function (entity, entities, cbName) {

			var i,
				j,
				a = entity,
				b,
				cbName = cbName || "hit",
				len = entities.length;

			for (i = 0; i < len; i++) {

				b = entities[i];

				if (a.x + a.w >= b.x &&
				    a.x <= b.x + b.w &&
				    a.y + a.h >= b.y &&
				    a.y <= b.y + b.h) {
					a[cbName](b);
					b[cbName](a);
				}
			}

		},

		checkCollisions: function (entities, cbName) {

			var i,
				j,
				a,
				b,
				cbName = cbName || "hit",
				all = entities.reduce(function (ac, e) {
					if (Array.isArray(e)) {
						return ac.concat(e);
					}
					ac.push(e);
					return ac;

				}, []),
				len = all.length;

			for (i = 0; i < len - 1; i++) {
				a = all[i];
				for (j = i + 1; j < len; j++) {
					b = all[j];

					if (a.x + a.w >= b.x &&
					    a.x <= b.x + b.w &&
					    a.y + a.h >= b.y &&
					    a.y <= b.y + b.h) {
						a[cbName](b);
						b[cbName](a);
					}
				}
			}
		}

	});

	Ω.Physics = Physics;

}(Ω));
