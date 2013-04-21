# Ω500: Game thingo.

v0.1 by Mr Speaker.

Simple game framework for making 2D games. So I don't have to type this all out for Ludum Dare. In so far:

- [X] Canvas setup
- [X] Set canvas size
- [X] Main game loop
- [X] Screen handling
- [X] Classes with super()
- [X] World object for tick()
- [X] Input handling - keys
- [X] Image loading
- [X] Image display
- [X] SpriteSheet display
- [X] SpriteSheet animations
- [X] Audio load/play
- [X] Helpful math/random functions
- [X] Tiled map
- [X] Camera'd map
- [X] text measuring
- [X] Preload assets
- [X] Loading progress bar
- [X] Entity/Map collisions

Infinite amount of things to add/fix. Stay tuned as I slowly add them. Most important before LD are:

- [ ] Proper timestep for loop
- [ ] Entity/Entity collisions
- [ ] Dialogs
- [ ] FPS count
- [ ] Input handling - mouse

Lower priority:

- [ ] Screen transitions
- [ ] Custom bounding box
- [ ] Simple particle effect controller
- [ ] Handle screen resizing
- [ ] Input handling - touch
- [ ] Flip drawing
- [ ] "Post" effects
- [ ] Tracked camera (with box)
- [ ] Spring camera
- [ ] Some DSP on spritesheets
- [ ] Mobile compatibility
- [ ] iCade/controller support
- [ ] mouse lock
- [ ] fullscreen
- [ ] parralax backgrounds
- [ ] default preload screen - start tick immediately
- [ ] polyfill Array.isArray


## (in)FAQ:

Q. How do you do that omega symbol thing?
A. Ω symbol is alt-z, on a mac. I promise to change this stupid name if the lib becomes any good.


## Docs

ha ha.

### Ω.Game

Extend `Ω.Game` to create ya game. If you need to do stuff in init, don't forget to pass the width and height arguments up to the super class:

    var myGame = Ω.Game.extend({

    	init: function (w, h) {

    		this._super(w, h);

    	}

    });
    new myGame(640, 480);

Canvas/DOM container:

The `canvas` property to sets the game canvas: can be a CSS selector to either the canvas element you want to use, or the containing element you want the canvas to be created inside of. Defaults to `"body"`. If an explicit width or hieght is set on the canvas element this will be used, otherwise it will use the values passed in - or defualt to 400x250.


