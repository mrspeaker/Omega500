# Ω500: JS Game Library

Ω500 is a library for making canvas-based games. It focuses on providing an architecturally old-school, straightforward set of tools for creating games: primarily for game jams and rapid prototyping. Check out the online examples: http://mrspeaker.github.io/Omega500/.

![Platform example](http://www.mrspeaker.net/images/omegaPlat.png)

## Ω500 Features:

Main game loop. Screens, dialogs, and transitions. Input handling (keys, mouse, touch, iCade). Image loading and display. SpriteSheet animations. Tile and isometric maps. Repeating maps, with parallax. Entity/Map and Entity/Entity collisions. Velocity acceleration & gravity components. Generate maps from images. Camera'd map, Tracked camera (with box). Audio load/play. Math/random/timer helpers. Asset preloader/progress. Simple particle controller. Raycast against maps. Path finding. Auto-genereated tile sets for prototyping. Text helpers. Font plotter. Mixin system. State machine helper. "Tiled" map editor level support. Fullscreen API support. Flipped spritesheets and images. Spring algo (for camera & entities). Shake effect.

## Some games using Ω500

- [DIGIBOTS & CO](http://www.mrspeaker.net/dev/game/digibots): inside-out Lemmings game where you need to build a path to complete the level. Finalist in the NoFuture contest where it's to become a real-life arcade machine. Neat-o! [Source on GitHub](https://github.com/mrspeaker/digibots).
- [Time Flies Straight](http://mrspeaker.net/dev/ld27): Time Flies Straight. A non-usual game of fractal time - starring Carl Sagan. Made in 48 hours for LD#27 [Source on GitHub](https://github.com/mrspeaker/ld27)
- [Zmore](http://mrspeaker.net/dev/ld26): LD#26 entry on the theme "minimalism". Turn light into darkness and escape minimalist captivity [Source on GitHub](https://github.com/mrspeaker/ld26).

![DIGIBOTS & CO](http://www.mrspeaker.net/images/digibots-title.jpg).
![DIGIBOTS & CO](http://www.mrspeaker.net/images/omegaDigibots.jpg).
![Zmore](http://www.mrspeaker.net/images/omegaZmore.png).
![Time Flies Straight](http://www.mrspeaker.net/images/tfsCarl.png).
![Time Flies Straight](http://www.mrspeaker.net/images/tfsHalls.png)

## Docs

Best just to check the examples and games.

### General idea/notes

Old-school, super-simple architecture: Everything has `tick` and `render(gfx)` methods. Each object manages its children and passes these calls on so the entire heirachy receives the messages. Everyone gets ticked, then rendered.

    .           game            // extend Ω.Game
    .            |
    .          screen           // extend Ω.Screen
    .            |
    .      ____________
    .     |      |     |
    .  player baddies  map      // extend Ω.Entity, Ω.Entity, and Ω.Map
    .     |
    .  bullets                  // extend Ω.Entity

Every loop  the engine calls `tick` on the main game object. This (automatically) calls `tick` on its current screen. The screen (manually) calls `tick` on its children (player, all the baddies in the baddie array, map) and so on. Once the tick is done, the same thing happens with `render`.

That's the rules: if you want something ticked, then `tick` it. If you want something rendered, then `render` it!

**Random helpful notes**

* Most positions in maps etc are given as a 2 element [x, y] array.
* Uses John Resig's simple class with inheritance (see below)
* Project setup: copy/paster `Ω500.js` into your project

### Ω.Game

Extend `Ω.Game` to create ya game. If you need to do stuff in init, don't forget to pass the width and height arguments up to the super class:

    var MyGame = Ω.Game.extend({

    	init: function (w, h) {

    		this._super(w, h);

    	},

    	load: function () {

    		// Called when all resources have loaded

    	}

    });

    var game = new MyGame(640, 480);

The Game super class has some boilerplate, such as accepting a `screen` object to display as well as the `tick` and `render` methods described above (you can override them if you need).

Canvas/DOM container:

The `canvas` property to sets the game canvas: can be a CSS selector to either the canvas element you want to use, or the containing element you want the canvas to be created inside of. Defaults to `"body"`. If an explicit width or height is set on the canvas element this will be used, otherwise it will use the values passed in - or defualt to 400x250.

### Screen

Things inherited from `Ω.Screen` are scene containers to display stuff in. `tick` and `render` will be called automatically by the game if you set using `game.setScreen`. Changing screens will use a small fade transition between the current and the new:

    game.setScreen(new TitleScreen());

If you're just calling it from the game `load` function then it's `this.setScreen(...)`. If you need to do async stuff on load, then set the screen's `loaded` property to `false`. When you're done, set it to `true`.

In render, you can clear the screen to a color (if you need to):

    this.clear(gfx, "#333"); // for clearing

### Entity

Players, bad guys, monsters etc should inherit from `Ω.Entity`. Entities know how to move inside maps, and can have collision detection with other entities.

    var player = new Ω.Entity(100, 100, 18, 24); // x, y, w, h

Has x, y, w, h properties which is used for map/entity collision detection. Width and height are optional if you specify them in the class itself (default is w: 32, h: 32).

There are a couple of conventions for updating collections of entities. For "ticking", call tick on each object - and inside the object's tick method return `true` if it's still alive, and `false` if it should be removed:

    this.baddies = this.baddies.filter(function (baddie) {
        return baddie.tick();
    });

The `entity` base class has a `remove` flag which you can set anywhere in the entity, and return it (negatively) from the tick method:

    ...
    remove: false,

    tick: function () {

        return !(this.remove);

    },
    ...

For rendering, just `forEach` them:

    this.baddies.forEach(function (baddie) {
        baddie.tick(gfx);
    });

How things are rendered is completely up to you. You get the passed the `gfx` object which has the 2D graphics context as property `ctx`. You can draw with canvas primitives, or render images (see images), sprite sheets (see sprite sheets), or animation frames (see animations).

*Bounding boxes*

Sometimes it's useful to see where the bounding box of your entity is. There's no debug mode, but the default rendering of an entity is something like this:

    gfx.ctx.fillStyle = "red";
    gfx.ctx.fillRect(this.x, this.y, this.w, this.h);

You can call `this._super(gfx)` at the end of your entity render function (or draw your own) and you'll get a red box showing where the collision detection is used.

### Classes

Uses John Resig simple classes:

    var MyClass = Ω.Class.extend({
        init: function () {}
    });

    // Extend a base class
    var MySubClass = MyClass.extend({});

    // Instanciate the things
    myClassGuy = new MyClass();
    mySubClassGuy = new MySubClass();

Can call super:

    var Baddie = Ω.Entity.extend({

        init: function (x, y) {

            _this.super(x,y);

            // ... do baddie init
        }

    });

There's also an `init_post` method that will be called after `init`.


### Input

Bind "actions" to key codes. The actions are just strings that make sense for your game... "fire", "jump", "decapitate"... whatever... You match the keycode (or a aliases like "up", "down" - see `Ω.input` for the full list) to the action:

    Ω.input.bind("explodeThings", 32); // Bind space bar (code 32) to action "explodeThings"

Can map multiple at once:

	Ω.input.bind({
        "fire": ["space", "touch", 13], // Bind multiple keys to "fire"
		"left": "left",
		"right": "right",
		"up": "up",
		"down": "down"
    });

This lets you have multiple keys bind to the same action. In the example above the touch screen, space bar, and the enter key (keycode 13 (which incidentally also has the alias "enter")) all trigger the action "fire".

Then to test:

    if (Ω.input.pressed("fire")) // A button with the action "fire" was pressed
	if (Ω.input.released("fire")) // A button with the action "fire" was released
    if (Ω.input.isDown("up")) // Button is being held down
    if (Ω.input.wasDown("left")) // Button was down in the last frame

To force an action to be released (even if user still holding down button):

    Ω.input.release("left")

Reset all keys (stops stuck keys when transitioning screens):

    Ω.input.reset();


### Image

Usually you load the image as a class property (so it is preloaded). Don't be afraid to add the same image in many classes - it will only be loaded once.

    var img = new Ω.Image("res/minecraft.png")

In container render:

    img.render(gfx, 10, 10)

The image can be loaded "flipped" (flip x=1, flip 2=2, flip both=3)

    // Load the image upside down
    new Ω.Image("res/minecraft.png", 2)

### Sound

Usually you load the sound as a class property (so it is preloaded).

    var sound = new Ω.Sound("res/boink.wav")

If you don't put an extension it'll choose .mp3 if supported, else .ogg

To play a sound:

    sound.play();

### Sprite sheets

Specify tile sheet, tile w and tile h.

	var sheet = new Ω.SpriteSheet("res/chars.png", 25, 45);

To draw a tile:

	sheet.render(gfx, frameX, frameY, posX, posY);

Optional param: flipFlags: only flip x = 1, only flip y = 2, flip both=3

    new Ω.SpriteSheet("res/chars.png", 25, 45, 3)

This will create a spritesheet twice as wide, and twice as high as the original. The top left part of the sheet will be the original sprites. The top right will have each cell flipped horizontally. The bottom left will have each cell flipped verticallys, and the bottom right will be flipped both horizonatlly and vertically.


### Animation

Takes a name, a spritesheet, a time-per-frame, and an array of [x,y] offsets into the spritesheet.

Can be grouped with `Ω.Anims`:

    this.anims = new Ω.Anims([
        new Ω.Anim("idle", this.sheet, 500, [[8, 0], [9, 0]]),
        new Ω.Anim("walk", this.sheet, 60, [[0, 0], [1, 0], [2, 0]])
    ]);

In the example, the "idle" animation will loop over the spritesheet frames 8,0 and 9,0 showing each frame for 500 milliseconds.

Set the anim you want to use (defaults to first). You don't have to do this if you are just using a single Anim, rather than grouped Ω.Anims:

    this.anims.set("walk");

Tick it inside the container's tick:

    this.anims.tick();

Render it inside the container's render:

    this.anims.render(gfx, this.x, this.y);

### Map

Maps take a sprite sheet, and a bunch of 2D cells. Usually give it a camera to render.

    sheet: new Ω.SpriteSheet("../res/images/tiles.png", 32, 32)

    ...

    var map = new Ω.Map(this.sheet, [
        [1,1,1,1,1,],
        [1,0,0,0,0,],
        [1,0,1,1,0,],
        [1,0,0,0,0,],
        [1,1,1,1,1,]
    ]);

Optional 3rd parameter that indicates the last number that is "walkable" (or "not solid") for entity collision detection. Default is 0.

*Debug Map*

Doesn't require a spritesheet - it's magically generated (for prototyping)

*Iso Map*

*Collisions*

In your entity's tick method, determine the distance you want it to move for the frame and call `move`. If the entity would end up inside a wall, the move function will push the entity back to be snug up against it. The entity can slide along a wall.

    entity.move(xAmount, yAmount, map);

*Loading a map from an image*

You can paint pixels and use that as your map - mapping different colours to different tiles. Other colours can then be used to set the locations of entities and spawn points etc. Good for rapid prototying and game jams.

    map.imgToCells(path, colorMap, callback, flipFlags)

The callback (if you provide a path to an image, otherwise the return value if you provide an image directly) returns colours from the colour map that were not matched. These (it's assumed) are used for entity locations etc.

### "Tiled Editor" Map loader

For loading maps created with [Tiled Editor](http://www.mapeditor.org/)

### Physics

Collision detection

Check for collision against all entities against each other, and call the enitity's `hit` method, passing the entity that hit it.

    Ω.Physics.checkCollisions([
        this.players,
        this.baddies
    ]);

You can provide an optional second paramater that is the entity method name to call instead of `hit`.

If you only want to check a single entity against other then `checkCollision` (singluar!) checks for a single entity agains an array (or array of arrays) of other entities:

    Ω.Physics.checkCollision(
        this.player,
        [this.baddies, this.monsters],
        "hitEnemy"
    );

### Dialog

Overlay for displaying menus etc.

    game.setDialog(new Ω.Dialog())

Time stops when dialogs are up.
Customiseable "kill key" to remove it.

### Camera

Camera lets you define a viewport and draws only a small part of the world at a time. Pass in anything you want to draw to the camera and it'll be rendered in the correct world location.

It accepts an array of entities, or arrays of entities to render. They are drawn using the painters alogrithm:

    // Camera at pos 0, 0 with viewport size 320x240.
    var camera = new Ω.Camera(0, 0, 320, 240);

    // Draw the map, player and baddies (anything (or array of things) with a render function!)
    camera.render(gfx, [map, player, baddies]);

There's also a TrackingCamera that will follow the entity you pass to it.


### Preloading

Put resources as properties in your classes - they'll get preloaded.
You can track the loading progress in your game object, for making a loading bar:

    Ω.evt.progress.push(function (loadedSoFar, maxToLoad) {
        // console.log(loadedSoFar, maxToLoad);
    });

### Font plotting

Rather than using borin' old ctx text you can use a bitmap font.

    font: new Ω.Font("myfont.png", 16, 16)

in render:

    this.font.write(gfx, "hello, world!", 100, 100)

The font assumes a specific ordering of letters (that seemed to show up on a bunch of different bitmapped fonts I found:

    !"#$%&'()*+,-./0123456789:;<=>?@abcdefghijklmnopqrstuvwxyz[/]^_`abcdefghijklmnopqrstuvwxyz{|}~

 If you have a font with a different ordering of characters, supply this as an argument:

    font: new Ω.Font("myfont.png", 16, 16, "!?abcdefghijklmnopqrstuvwyz.[]")


### Ray casting

Just for hitting maps, not other entities.

### Effects

shake.

### Utils

time: use Ω.utils.now() for everything time related (is paused in dialogs)

*Randoms*

    Ω.utils.rand(10)  // Random whole number between 0 and 9
    Ω.utils.oneIn(10) // 1 in 10 chance of being true
    Ω.utils.rnd.seed = 42 // For seeded random: set the seed
    Ω.utils.rnd.rand(max, min) // Seeded int between min and max 

*Time*

    Ω.utils.now()
    Ω.utils.since(time)
    Ω.utils.toggle(ms, steps) // cycles through 0-steps every ms milliseconds
    Ω.utils.formatTime(time)

*trig/positions*

    Ω.utils.dist(a, b) // Distance between two entities (or [x,y] arrays)
    Ω.utils.angleBetween(a, b)
    Ω.utils.clamp(val, min, max) // clamp value to a range
    Ω.utils.ratio(start, finish, amount)
    Ω.utils.lerp(start, finish, amount)
    Ω.utils.lerpPerc // for a percent
    Ω.utils.smoothstep(start, finish, amount)
    Ω.utils.snap(value, snapSize) // Snap given value to snap size (floored)
    Ω.utils.snapRound(value, snapSize) // // Snap given value to snap size (rounded)
    Ω.utils.center(entity) // get the middle of a rectangle
    Ω.utils.constrain(pos, bounds) // given a [x,y] pos, keep inside a rectangle
    Ω.utils.degToRad()
    Ω.utils.radToDeg()
    
*Ajax*

    Ω.utils.ajax(url, callback)

*Fullscreen API*

Needs to be done inside a user interaction (like a click, keypress) handler.

    Ω.utils.fullscreen.request("#board")
    Ω.utils.fullscreen.cancel()
    Ω.utils.fullscreen.toggle("#board") //toggle between request/cancel


### State helper

    this.state = new Ω.utils.State("BORN") // Init to a state
    this.state.set("RUNNING"); // Set to a state

In container tick:

    this.state.tick();

    switch (this.state.get()) {
        case "BORN": ...
        case "RUNNING": ...
        case "DEAD": ...
    }

Testing state:

    if (this.state.first()) // first frame....
    if (this.state.count > 40) // 40th frame
    if (this.state.is("BORN") // is "BORN"
    if (this.state.isNot("DEAD") // is not "DEAD"
    if (this.state.in("BORN", "RUNNING")) // is any of these
    if (this.state.notIn("DEAD", "RUNNING")) // none of these

### Mixins

Not quite a component/entity system - but will do in a pinch. Just experimenting with some mixins/traits... stay tuned.

Some pre-defined traits

    this.player.mixin([
        {trait: Ω.traits.RemoveAfter, life: 300},
        {trait: Ω.traits.Sin, speed: 70, amp: 10}
    ]);

## WIP/TODO

Most of the components in Ω500 are in their most basic form - just good enough for me to use as a base for writing games. As I need features, I add them. This is why you there are some weirder functions - like map ray casting... because I needed them!

Highest priority and WIP:

- BUG: bad map collision if entity taller/wider than block
- BUG: bad map collision with velocity/gravity when jammed hard left into block (jump straight up and get stuck on upper block)
- BUG: tracking camera box moves on zoom.
- BUG: tracking camera box jumps when map is not as wide as screen, but needs to scroll.
- move traits to game object, maybe

High priority:

- GUI: button
- Assets: Partial loader (don't load all resources on init - maybe a "no preload" flag)
- Perf: Object pooling
- Screens: Multiple screens (as layers)
- BUG: Load from image on retina devices
- Maps: Auto-tiling
- Maps: Tiled image background

Low prority:

- Gfx: DSP on spritesheets
- Gfx: "Post" effects in webgl (see DIGIBOTS & CO.)
- Utils: Serialize/deserialize levels
- Perf: dirty rectangles
- Math: Swarm/flock algo
- Maps: block selecting (iso)
- Jams: Random/classic colour palettes
- Jams: Not Ω, but - but script conversion from WAV/AIFF to MP3 & OGG.
- Jams: Not Ω, but - quick set up for grunt.

## inFAQ:

Q. How do you do that omega symbol thing?  
A. Ω symbol is alt-z, on a mac. I promise to change this stupid name if the lib becomes any good.

Q. When do we get a version bump?  
A. Every time I finish a game with it. Version 1.0 in 7 more games!

Q. License?  
A. [Unlicense](https://github.com/mrspeaker/Omega500/blob/master/%CE%A9/UNLICENSE)!

