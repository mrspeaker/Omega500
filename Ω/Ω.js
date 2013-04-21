var Ω = (function() {

	"use strict";

	var preloading = true,
		assetsToLoad = 0;

	return {
		_onload: null,
		env: {
			w: 0,
			h: 0
		},
		preload: function () {
			if (!preloading) {
				return function () {};
			}

			assetsToLoad++;
			return function () {
				if (--assetsToLoad === 0) {
					preloading = false;
					Ω._onload && Ω._onload();
				};
			}
		}
	};

}());

window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

