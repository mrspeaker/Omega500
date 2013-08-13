(function (Ω) {

	var TraitRemoveAfter = Ω.Trait.extend({

		makeArgs: function (props) {
			var args = [];
			args.push(props.life);
			return args;
		},

		init_trait: function (t, life) {

			t.life = life || 100;
		},

		tick: function (t) {
			if (t.life-- <= 0) {
				this.remove = true;
			}
		}

	});

	var TraitSin = Ω.Trait.extend({

		makeArgs: function (props) {

			var args = [];
			args.push(props.speed);
			args.push(props.amp);
			args.push(props.target);
			return args;

		},

		init_trait: function (t, speed, amp, target) {

			t.speed = speed || 100;
			t.amp = amp || 5;
			t.target = target || "sineOff"

			t.tick(t); // Set initial value

			return t;

		},

		tick: function (t) {

			this[t.target] = Math.sin(Ω.utils.now() / t.speed) * (t.amp / 10);

		}

	});

	Ω.traits = {
		RemoveAfter: TraitRemoveAfter,
		Sin: TraitSin
	};

}(Ω));
