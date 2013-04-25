# Ω500: Game thingo.

v0.1.1 by Mr Speaker.

*See the things!* http://mrspeaker.github.io/Omega500/

*Read the codez!* https://github.com/mrspeaker/Omega500/

Simple game framework for making 2D games. So I don't have to type this all out for Ludum Dare. Checkout the code in /ex for an example how to use it. Included so far (in order of me adding them!):

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
- [X] Iso map
- [X] Camera'd map
- [X] text measuring
- [X] Preload assets
- [X] Loading progress bar
- [X] Entity/Map collisions
- [X] Entity/Entity collisions
- [X] Simple particle controller
- [X] Tracked camera (with box)
- [X] General purpose timer
- [X] Dialogs
- [X] Raycast against maps
- [X] Screen transitions
- [X] Timestep for game loop
- [X] Shake effect
- [X] Spring algo (for camera & entities)
- [X] Input: mouse handling

Infinite amount of things to add/fix. Stay tuned as I slowly add them. Most important before LD are:

- [ ] Default preload screen (+ start tick immediately)

- [ ] BUG: bad map collision if entity taller than block
- [ ] BUG: ensure preload fires onload (even with no assets)

Lower priority:

- [ ] "Post" effects (webgl)
- [ ] Anims: Custom bounding box
- [ ] Input: touch handling
- [ ] Input: iCade/controller support
- [ ] Input: mouse lock API
- [ ] Physics: gravity
- [ ] Physics: platform functions
- [ ] Gfx: Flip drawing
- [ ] Gfx: DSP on spritesheets
- [ ] Gfx: Flash effect
- [ ] Gfx: Blur effect
- [ ] Gfx: parralax backgrounds
- [ ] Gfx: Fullscreen canvas
- [ ] Gfx: fullscreen resizing
- [ ] Gfx: destructable terrain masks
- [ ] Math: add smoothstep helper
- [ ] Maps: block selecting (iso)
- [ ] Math: pathfinding algo
- [ ] Math: Swarm/flock algo
- [ ] Support: FPS count
- [ ] Support: fullscreen API
- [ ] Support: Work in Ejecta
- [ ] Support: Mobile compatibility
- [ ] Support: polyfill Array.isArray
- [ ] GUI: custom mouse pointer
- [ ] GUI: button

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


