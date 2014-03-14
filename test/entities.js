(function (Ω, QUnit) {

    "use strict";

    var module = QUnit.module,
        test = QUnit.test,
        //equal = QUnit.equal,
        ok = QUnit.ok;

    module("Entities");

    var Ent = Ω.Entity.extend({
            w: 10,
            h: 10,
            didCollide: false,
            hit: function () {
                this.didCollide = true;
            }
        }),
        a = new Ent(),
        b = new Ent();

    test("Entities with overlapping borders collide", function () {
        b.x = a.w;
        b.y = a.h;

        Ω.Physics.checkCollisions([a, b]);

        ok(a.didCollide && b.didCollide, "Collided.");
    });

    test("Entities reeaaally close don't collide", function () {
        b.x = a.w + 1;
        b.y = a.y;

        Ω.Physics.checkCollisions([a, b]);

        ok(a.didCollide && b.didCollide, "Did not collide.");
    });

}(
    window.Ω,
    window.QUnit
));