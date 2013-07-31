(function (Ω) {

	"use strict";

	var LayeredMap = Ω.Class.extend({

		init: function (sheet, maps, walkable) {

			this.maps = maps.map(function(cells)) {

				return new Map(sheet, cells, walkable);

			}

		},

		render: function (gfx, camera) {

			this.maps.forEach(function (m) {

				m.render(gfx, camera);

			});
		}

	});

	Ω.LayeredMap = LayeredMap;

}(Ω));