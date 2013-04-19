(function (Ω) {

	"use strict";

	Ω.utils = {

		loadScripts: function (scripts, cb) {

			var loaded = 0;

			scripts.forEach(function (path) {

				var script = document.createElement('script'),
					qs = env.desktop ? "?" + new Date().getTime() : "";

				script.src = "scripts/" + path + ".js" + qs;
				script.onload = function () {
					resources.toLoadLoaded++;
					if (loaded++ === scripts.length - 1) {
						cb && cb();
					}
				};

				document.body.appendChild(script);

			});

		}
	};

}(Ω));
