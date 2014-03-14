(function (Ω, QUnit) {
    "use strict";

    QUnit.module("utils");

    QUnit.test("Seeded random returns same result", function() {
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

        QUnit.equal(first, second, "Passed!");
    });
}(
    window.Ω,
    window.QUnit
));