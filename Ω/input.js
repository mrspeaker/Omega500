(function (Ω) {

	"use strict";

	var keys = {},
		keyActions = {},
		input;

	input = {

		KEYS: {
			enter: 13,
			space: 32,
			escape: 27,
			up: 38,
			down: 40,
			left: 37,
			right: 39
		},

		init: function () {

			bindKeys();

		},

		reset: function () {

		},

		tick: function () {

			var key;

			for(key in keys) {
				keys[key].wasDown = keys[key].isDown;
			}

		},

		bind: function (code, action) {

			if (typeof code !== "number") {
				code = this.KEYS[code];
				if (!code) {
					console.error("Could not bind key ", code);
					return;
				}
			}

			keys[code] = {
				action: action,
				isDown: false,
				wasDown: false
			};
			if (!keyActions[action]) {
				keyActions[action] = [];
			}
			keyActions[action].push(code);

		},

		binds: function (keys) {

			var self = this;

			keys.forEach(function (k) {

				self.bind(k[0], k[1]);

			});

		},

		pressed: function (action) {

			return this.isDown(action) && !(this.wasDown(action));

		},

		isDown: function (action) {
			var actionCodes = keyActions[action];
			var back = actionCodes.some(function (code) {
				return keys[code].isDown;
			});
			return back;

		},

		wasDown: function (action) {
			var actionCodes = keyActions[action];
			return actionCodes.some(function (k) {
				return keys[k].wasDown;
			});
		}
	}

	function keyed(code, isDown) {
		if (keys[code]) {
			keys[code].wasDown = keys[code].isDown;
			keys[code].isDown = isDown;
		}
	}

	function bindKeys() {
		document.addEventListener('keydown', function(e){
			keyed(e.keyCode, true);
		}, false );
		document.addEventListener('keyup', function(e){
			keyed(e.keyCode, false);
		}, false );
	}

	Ω.input = input;

}(Ω));
