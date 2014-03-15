(function (Ω, QUnit) {

    "use strict";

    var module = QUnit.module,
        test = QUnit.test,
        ok = QUnit.ok;

    module("Entities");

    var w = 10,
        h = 10,
        Ent = Ω.Entity.extend({
            w: w,
            h: h,
            didCollide: false,
            hit: function () {
                this.didCollide = true;
            },
            reset: function (x, y) {
                this.didCollide = false;
                this.x = x;
                this.y = y;
            }
        }),
        a = new Ent(),
        b = new Ent(),
        c = new Ent();

    test("Entities with overlapping borders collide", function () {

        a.reset(0, 0);
        b.reset(w, h);
        Ω.Physics.checkCollisions([a, b]);
        ok(a.didCollide && b.didCollide, "Bottom-right pixel collided");

        // Check hits bottom edge
        b.reset(w, h);
        a.reset(b.x, b.y + h);
        Ω.Physics.checkCollisions([a, b]);
        ok(a.didCollide && b.didCollide, "Bottom edge collided.");


        // Check hits right edge
        a.reset(w, h);
        b.reset(b.x + w, b.y);
        Ω.Physics.checkCollisions([a, b]);
        ok(a.didCollide && b.didCollide, "Right edge collided.");

        // Check hits top edge
        b.reset(w, h);
        a.reset(b.x, b.y - h);
        Ω.Physics.checkCollisions([a, b]);
        ok(a.didCollide && b.didCollide, "Top edge collided.");
    });

    test("Entities reeaaally close don't collide", function () {
        a.reset(0, 0);
        b.reset(w + 1, 0);
        Ω.Physics.checkCollisions([a, b]);
        ok(!a.didCollide && !b.didCollide, "Right edge did not collide.");

        // check bottom
        b.reset(w, h);
        a.reset(b.x, b.y + h + 1);
        Ω.Physics.checkCollisions([a, b]);

        ok(!a.didCollide && !b.didCollide, "Bottom edge did not collide.");
    });

    test("One entitiy against array of entities collides", function () {
        a.reset(0, 0);
        b.reset(w, h);
        c.reset(0, h);

        Ω.Physics.checkCollision(a, [b, c]);
        ok(a.didCollide && b.didCollide && c.didCollide, "Main collided with both others");

        a.reset(0, 0);
        b.reset(w, h);
        c.reset(0, h + 1);

        Ω.Physics.checkCollision(a, [b, c]);
        ok(a.didCollide && b.didCollide && !c.didCollide, "Main collided with one, missed another");

        a.reset(0, 0);
        b.reset(w + 1, h);
        c.reset(0, h + 1);

        Ω.Physics.checkCollision(a, [b, c]);
        ok(!a.didCollide && !b.didCollide && !c.didCollide, "Main missed both");

    });

    test("Point collision", function () {
        a.reset(0, 0);
        b.reset(w, h);
        a.points = [[w, h]];

        Ω.Physics.checkPointsCollision(a, [b]);
        ok(a.didCollide && b.didCollide, "Point collides with entity");

        a.reset(0, 0);
        b.reset(w, h);
        a.points = [[w - 1, h]];

        Ω.Physics.checkPointsCollision(a, [b]);
        ok(!a.didCollide && !b.didCollide, "Point misses entity");
    });

}(
    window.Ω,
    window.QUnit
));