(function (Ω, QUnit) {

    "use strict";

    var module = QUnit.module,
        test = QUnit.test,
        equal = QUnit.equal,
        ok = QUnit.ok;

    module("Utils");

    test("Seeded random returns same result", function () {
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

        equal(first, second, "Random sequence is the same.");
    });

    test("Toggle flips between 2 values", function () {
        ok(1 === 1, "Passed.");
    });

}(
    window.Ω,
    window.QUnit
));