(function (Ω) {

	"use strict";

	var Entity = Ω.Class.extend({

		x: 0,
		y: 0,

		anim: null,
		anims: null,
		animGet: function () {
			return this.anim.name;
		},
		animSet: function (animName) {
			var anim = this.anims.filter(function (anim) {
				return anim.name === animName;
			});

			if (anim.length) {
				this.anim = anim[0];
				this.anim.reset();
			}
		},
		animSetIfNot: function (animName) {
			if (this.animGet() === animName) {
				return;
			}
			this.animSet(animName);
		},
		animAdd: function (anim) {

			if (!this.anims) {
				this.anims = [];
				this.anim = anim;
			}
			this.anims.push(anim);

		}

	});

	Ω.Entity = Entity;

}(Ω));
