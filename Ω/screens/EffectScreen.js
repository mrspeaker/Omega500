(function (Ω) {

	"use strict";

	var EffectScreen = Ω.Screen.extend({

		effects: [],

		tick: function () {

			this.effects = this.effects.filter(function (e) {

				return this.effect.tick();

			});

		},

		add: function (effect) {

			this.effects.push(effect);

		},

		render: function (gfx) {

			var c = gfx.ctx;

			c.fillStyle = "hsl(0, 0%, 0%)";
			c.fillRect(0, 0, gfx.w, gfx.h);

		}

	});

	Ω.EffectScreen = EffectScreen;

}(Ω));
