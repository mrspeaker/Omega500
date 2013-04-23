(function (Ω) {

	"use strict";

	var Timer = Ω.Class.extend({

		init: function (time, cb) {

			Ω.timers.add(this);

			this.time = time;
			this.cb = cb;
		},

		tick: function (d) {

			this.time -= d;
			if (this.time < 0) {
				this.cb && this.cb();
				return false;
			}

			return true;
		}

	});

	Ω.timer = function (time, cb) {
		return new Timer(time, cb);
	};

}(Ω));
