(function (Ω) {

	"use strict";

	var Physics = Ω.Class.extend({

		checkCollisions: function (entities) {

			var i,
				j,
				a,
				b,
				len = entities.length;

			for (i = 0; i < len - 1; i++) {
				a = entities[i];
				for (j = i + 1; j < len; j++) {
					b = entities[j];

					if (a.x + a.w >= b.x &&
					    a.x <= b.x + b.w &&
					    a.y + a.h >= b.y &&
					    a.y <= b.y + b.h) {
						a.hit(b);
						b.hit(a);
					}
				}
			}
		}

	});

	Ω.Physics = Physics;

}(Ω));


