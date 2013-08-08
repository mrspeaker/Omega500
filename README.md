# Ω500: JS Game Library

Ω500 is a simple framework for me to make 2D canvas-based games. It focuses on providing an architecturally simple set of tools for creating games in an old-school, straightforward way. Check out the online examples: http://mrspeaker.github.io/Omega500/.

![Platform example](http://www.mrspeaker.net/images/omegaPlat.png)

## Some games using Ω500

[DIGIBOTS & CO](http://www.mrspeaker.net/dev/game/digibots): inside-out Lemmings game where you need to build a path to complete the level. Finalist in the NoFuture contest where it's to become a real-life arcade machine. Neat-o! [Source on GitHub](https://github.com/mrspeaker/digibots)

![DIGIBOTS & CO](http://www.mrspeaker.net/images/digibots-title.jpg)
![DIGIBOTS & CO](http://www.mrspeaker.net/images/omegaDigibots.jpg?a=1)

[Zmore](http://mrspeaker.net/dev/ld26): LD#26 entry on the theme "minimalism". Turn light into darkness and escape minimalist captivity [Source on GitHub](https://github.com/mrspeaker/ld26)

![Zmore](http://www.mrspeaker.net/images/omegaZmore.png)

## Ω500 Features:

Main game loop. Screens, dialogs, and transitions. Input handling (keys, mouse, touch, iCade). Image loading and display. SpriteSheet animations. Tile and isometric maps. Repeating maps, with parallax. Entity/Map and Entity/Entity collisions. Entity gravity/falling. Generate maps from images. Camera'd map, Tracked camera (with box). Audio load/play. Math/random/timer helpers. Asset preloader/progress. Simple particle controller. Raycast against maps. Path finding. Auto-genereated tile sets for prototyping. Text helpers. Font plotter (very specific! fix this). State machine helper. "Tiled" map editor level support. Fullscreen API support. Flipped spritesheets and images. Spring algo (for camera & entities). Shake effect.

## Docs

### General idea/notes

Old-school, super-simple architecture: Everything has `tick` and `render(gfx)` methods. Each object manages its children and passes these calls on so the entire heirachy receives the messages. Everyone gets ticked, then rendered.

    .           game
    .            |
    .       level screen
    .            |
    .      ___ level __
    .     |      |     |
    .  player baddies  map
    .     |
    .  bullets

Every loop the engine calls `tick` on the main game object. This (automatically) calls `tick` on its current screen. The screen (manually) calls `tick` on its main child object (level). Level (manually) calls `tick` on its children (player, all the baddies in the baddie array, map) and so on. Once the tick is done, the same thing happens with `render`. I might generalise this later, so everything really has a concept of "children", but for now it's good enough: if you want something ticked, then `tick` it. If you want something rendered, then `render` it!

Most of the components in Ω500 are in their most basic form - just good enough for me to use as a base for writing games. As I need features, I add them - but it means some stuff only works in one situtation. For example, spritesheets can't contain any margins; no custom bounding boxes etc. These are all easy to fix, but because I'm focusing on finishin' games - it'll take a while before I address everything. Also, it explains why you there are some weirder functions - like map ray casting... because I needed them!


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

If you need to do async stuff on load, then set the screen's `loaded` property to `false`. When you're done, set it to `true`.

In render, you can clear the screen to a color (if you need to):

    this.clear(gfx, "#333"); // for clearing

### Entity

Players, bad guys, monsters etc should inherit from `Ω.Entity`. Entities know how to move inside maps, and can have collision detection with other entities.

Has x, y, w, h properties which is used for map/entity collision detection.

I use a couple of conventions for updating collections of entities. For "ticking", I call tick on each object and inside the object's tick method I return `true` if it's still alive, and `false` if it should be removed:

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

For rendering I just `forEach` them:

    this.baddies.forEach(function (baddie) {
        baddie.tick(gfx);
    });

How things are rendered is completely up to you. You get the passed the `gfx` object which has the 2D graphics context as property `ctx`. You can draw with canvas primitives, or render images (see images), sprite sheets (see sprite sheets), or animation frames (see animations).

*Bounding boxes*

Sometimes it's useful to see where the bounding box of your entity is. There's nothing built in for this (and at the moment there is no easy way to change a bounding box for animation frames etc), so for now just do it yourself at the end of the render method:

    gfx.ctx.strokeStyle = "red";
    gfx.ctx.strokeRect(this.x, this.y, this.w, this.h);

And you'll get a red box showing where the collision detection is used.


### Input

Bind keys to "actions". The actions are just strings that make sense for your game... "fire", "jump", "decapitate"... whatever... You match the keycode (or a label like "up", "down" - see `Ω.input` for the full list) to the action:

	Ω.input.bind([
		["left", "left"],
		["right", "right"],
		["up", "up"],
		["down", "down"],

        ["space", "fire"],
        ["touch", "fire"],
        [13, "fire"],

	]);

This lets you have multiple keys bind to the same action. In the example above the touch screen, space bar, and the enter key (keycode 13 (which incidentally also has the alias "enter")) all trigger the action "fire".

Then to test:

    if (Ω.input.pressed("fire")) // A button with the action "fire" was pressed
	if (Ω.input.released("fire")) // A button with the action "fire" was released
    if (Ω.input.isDown("up")) // Button is being held down
    if (Ω.input.wasDown("left")) // Button was down in the last frame

To force an action to be released (even if user still holding down button):

    Ω.input.release("left")


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

Usually give it a camera to render

### Physics


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

    // Draw the map, player and baddies (anything with a render function!)
    camera.render(gfx, [map, player, baddies]);

There's also a TrackingCamera that will follow the entity you pass to it.


### Preloading

### Ray casting

### Effects

shake.

### Utils

time: use Ω.utils.now() for everything time related (is paused in dialogs)

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

## TODO/ideas

Highest priority and WIP:

- BUG: bad map collision if entity taller/wider than block

High priority:

- Partial loader (don't load all resources on init - maybe a "no preload" flag)
- GUI: button
- Math: add smoothstep/lerp helper
- Support: FPS count
- Multiple screens (as layers)
- Random with seed

Low prority:

- Gfx: DSP on spritesheets
- Gfx: dirty rect optimisations
- Physics: quadtree or map-by-map ents optimisiation
- Math: perlin noise
- Math: Swarm/flock algo
- Maps: block selecting (iso)
- "Post" effects in webgl (see DIGIBOTS & CO.)

## inFAQ:

Q. How do you do that omega symbol thing?
A. Ω symbol is alt-z, on a mac. I promise to change this stupid name if the lib becomes any good.

Q. When do we get a version bump?
A. Every time I finish a game with it. Version 1.0 in 8 more games!


