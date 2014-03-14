(function (Ω, QUnit) {

    "use strict";

    var module = QUnit.module,
        test = QUnit.test,
        equal = QUnit.equal,
        notEqual = QUnit.notEqual;

    module("Utils");

    test("Ω.utils.rnd: seeded random returns same result", function () {
        var res = [],
            first,
            second,
            i;

        Ω.utils.rnd.seed = 42;
        for (i = 0; i < 10; i++) {
            res.push(Ω.utils.rnd.rand(100));
        }
        first = res.join(",");

        // Reset seed
        Ω.utils.rnd.seed = 42;
        res = [];
        for (i = 0; i < 10; i++) {
            res.push(Ω.utils.rnd.rand(100));
        }
        second = res.join(",");

        equal(first, second, "Sequence with same seed is the same.");

        // Reset seed
        Ω.utils.rnd.seed = 43;
        res = [];
        for (i = 0; i < 10; i++) {
            res.push(Ω.utils.rnd.rand(100));
        }
        second = res.join(",");
        notEqual(first, second, "Sequence with different initial seed is different.");
    });

    test("Ω.utils.toggle flips between values over time", function () {
        var time = 0,
            vals,
            milliseconds = 10;

        Ω.utils.now = function () {
            return time;
        };

        vals = [];
        for (var i = 0; i < 10; i++) {
            vals.push(Ω.utils.toggle(milliseconds, 2));
            time += 5;
        }

        equal(vals.join(","), "0,0,1,1,0,0,1,1,0,0", "Toggles between 2 values");

        vals = [];
        time = 0;
        for (i = 0; i < 10; i++) {
            vals.push(Ω.utils.toggle(milliseconds, 3));
            time += 5;
        }

        equal(vals.join(","), "0,0,1,1,2,2,0,0,1,1", "Toggles between 3 values");

        vals = [];
        time = 0;
        for (i = 0; i < 10; i++) {
            vals.push(Ω.utils.toggle(milliseconds / 2, 4));
            time += 5;
        }

        equal(vals.join(","), "0,1,2,3,0,1,2,3,0,1", "Toggles between 4 values");
    });

}(
    window.Ω,
    window.QUnit
));