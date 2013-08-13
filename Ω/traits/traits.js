(function (Ω) {

	/*
		Set the entity's `remove` flag after X ticks
	*/
	var RemoveAfter = Ω.Trait.extend({

		makeArgs: function (props) {

			return [props.ticks];

		},

		init_trait: function (t, ticks) {

			t.ticks = ticks || 100;

		},

		tick: function (t) {

			if (!this.remove && t.ticks-- === 0) {
				this.remove = true;
			}

		}

	});

	/*
		Peform a callback after X ticks
	*/
	var Ticker = Ω.Trait.extend({

		makeArgs: function (props) {

			return [props.ticks, props.cb];

		},

		init_trait: function (t, ticks, cb) {

			t.ticks = ticks || 100;
			t.cb = cb || function () {};

		},

		tick: function (t) {

			if (t.ticks-- === 0) {
				t.cb.call(this, t);
			}

		}

	});


	/*

		Bounce a value over a sine curve
		Defaults to `yo` (to affect the entity's Y movement)

	*/
	var Sin = Ω.Trait.extend({

		makeArgs: function (props) {

			return [props.speed, props.amp, props.target];

		},

		init_trait: function (t, speed, amp, target) {

			t.speed = speed || 100;
			t.amp = amp || 5;
			t.target = target || "yo";

			return t;

		},

		tick: function (t) {

			this[t.target] += Math.sin(Ω.utils.now() / t.speed) * (t.amp / 10);

		}

	});

	Ω.traits = {
		RemoveAfter: RemoveAfter,
		Ticker: Ticker,
		Sin: Sin
	};

}(Ω));
