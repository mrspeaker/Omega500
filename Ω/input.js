(function (Ω) {

	"use strict";

	var keys = {},
		keyActions = {},
		input;

	input = {

		KEYS: {
			enter: 13,
			space: 32
		},

		init: function () {
			bindKeys();
		},

		reset: function () {

		},

		bind: function (code, action) {
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
