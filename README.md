# Ω500: Game thingo.

v0.0.0.2 by Mr Speaker.

Simple game framework for making 2D games. So I don't have to type this all out for Ludum Dare. In so far:

- [X] Canvas setup
- [X] Main game loop
- [X] Screen handling
- [X] Classes with super()
- [X] World object for tick()
- [X] Input handling - keys
- [X] Image loading
- [X] SpriteSheet display

Infinite amount of things to add/fix. Stay tuned as I slowly add them. Most important before LD are:

- [ ] Proper timestep for loop
- [ ] Set canvas size!
- [ ] Image display
- [ ] Entity collisions
- [ ] Audio load/play
- [ ] Helpful math functions
- [ ] Preload assets

Lower priority:

- [ ] SpriteSheet animations
- [ ] Screen transitions
- [ ] Simple particl effect controller
- [ ] Input handling - mouse
- [ ] Input handling - touch
- [ ] Mobile compatibility
- [ ] iCade/controller support
- [ ] mouse lock
- [ ] fullscreen


## (in)FAQ:

Q. How do you do that omega symbol thing?
A. Ω symbol is alt-z, on a mac. I promise to change this stupid name if the lib becomes any good.


## Docs

ha ha.

### Ω.Game

Extend `Ω.Game` to create ya game:

    var myGame = Ω.Game.extend({

    });
    myGame.go();

Canvas/DOM container:

The `canvas` property to sets the game canvas: can be a CSS selector to either the canvas element you want to use, or the containing element you want the canvas to be created inside of. Defaults to `"body"`


