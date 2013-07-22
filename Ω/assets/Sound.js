(function (Ω) {

	"use strict";

	var sounds = {},
		Sound;

	Sound = Ω.Class.extend({

		ext: document.createElement('audio').canPlayType('audio/mpeg;') === "" ? ".ogg" : ".mp3",

		init: function (path, volume, loop) {

			var audio,
				resolve,
				onload;

			if (!sounds[path]) {
				audio = new window.Audio();
				resolve = Ω.preload(path);
				onload = function () {
					// Check if already loaded, 'cause Firefox fires twice
					if (this._loaded) {
						return;
					}
					this._loaded = true;
					resolve();
				};

				audio.src = path.indexOf(".") > 0 ? path : path + this.ext;

				audio._loaded = false;

				// Fixme: crazyies in firefox... fires twice?
				audio.addEventListener("canplaythrough", onload, false);

				audio.addEventListener("error", function () {
					console.error("Error loading audio resource:", audio.src);
					onload.call(this);
				});
				audio.load();

				sounds[path] = audio;
			}

			audio = sounds[path];
			audio.volume = volume || 1;
			audio._volume = audio.volume;
			audio.loop = loop;

			this.audio = audio;

		},

		rewind: function () {
			this.audio.pause();
			try{
	        	this.audio.currentTime = 0;
	    	} catch(err){
	        	//console.log(err);
	    	}

		},

		play: function () {

			this.rewind();
			this.audio.play();
		},

		stop: function () {

			this.audio.pause();

		}

	});

	Sound._reset = function () {

		var path,
			sound;

		// Should check for canplaythrough before doing anything...
		for (path in sounds) {
			sound = sounds[path];
			if (!sound._loaded) continue;
			sound.pause();
			try {
				sound.currentTime = 0;
			} catch (err) {
				console.log("err");
			}
		}
	};

	Sound._setVolume = function (v) {

		for (var path in sounds) {
			sounds[path].pause();
			try {
				sounds[path].volume = sounds[path]._volume * v;
			} catch (err) {
				console.log("err");
			}
		}

	};

	Ω.Sound = Sound;

}(Ω));
