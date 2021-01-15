const assert = require("assert");
const sumdigits = require("./sumdigits");
const mirrordromes = require("./mirrordromes");

console.log(sumdigits.recursivelySumDigits(126));

assert.deepStrictEqual(
  sumdigits.recursivelySumDigits(126),
  sumdigits.iterativelySumDigits(126)
);

console.log(mirrordromes.recursivelyCountMirrordromes("totally"));
console.log(mirrordromes.iterativelyCountMirrordromes("aeiou"));
