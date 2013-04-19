var Ω = (function() {

	"use strict";

	var images = {},
		audio = {};

	return {
		env: {
			w: 0,
			h: 0
		}
	};

}());

window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

