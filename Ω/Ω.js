var Ω = (function() {

	"use strict";

	var preloading = true,
		assetsToLoad = 0,
		onload = null;

	return {
		onload: function (cb) {
			onload = cb;
		},
		env: {
			w: 0,
			h: 0,
			preload: function () {
				if (!preloading) {
					return function () {};
				}

				assetsToLoad++;
				return function () {
					if (--assetsToLoad === 0) {
						preloading = false;
						// TODO: call go
						onload && onload();
					};
				}
			}
		}
	};

}());

window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

