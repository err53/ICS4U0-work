const pairs = {
  i: "i",
  l: "l",
  m: "m",
  n: "n",
  o: "o",
  t: "t",
  u: "u",
  v: "v",
  w: "w",
  x: "x",
  b: "d",
  d: "b",
  p: "q",
  q: "p",
  s: "z",
  z: "s",
};

/**
 * Check whether a single string is a mirrordrome
 * @param {string} string The string to check
 * @returns {boolean} If the string is the mirrordrome
 */
const isMirror = (string) => {
  if (string.length > 0) {
    if (pairs[string[0]] == string[string.length - 1]) {
      return isMirror(string.slice(1, string.length - 1));
    } else {
      return false;
    }
  } else {
    return true;
  }
};

/**
 * Recursively check, removing items from the left side
 * @param {string} string The string to check
 * @returns {string[]} An array of mirrordromes
 */
const recurseL = (string) => {
  let result = [];
  if (isMirror(string)) {
    result.push(string);
  }
  if (string.length > 1) {
    result = result.concat(recurseL(string.slice(1, string.length)));
  }
  return result;
};

/**
 * Recursively check, removing items from the right side
 * @param {string} string The string to check
 * @returns {string[]} An array of mirrordromes
 */
const recurseR = (string) => {
  let result = [];
  if (string.length > 0) {
    // there are things to parse
    result = result.concat(
      recurseL(string),
      recurseR(string.slice(0, string.length - 1))
    );
  }
  return result;
};

exports.recursivelyCountMirrordromes = (string) => {
  return recurseR(string).length;
  // return recurseR(string)
};

/**
 * Iteratively count mirrordromes
 * @param {string} string The string to check
 */
exports.iterativelyCountMirrordromes = (string) => {
  let result = [];
  // two loops, one tracking the front index, one tracking the rear index
  for (let i = 0; i < string.length; i++) {
    for (let j = i; j < string.length; j++) {
      if (pairs[string[i]] == string[j]) {
        // slowly squish in from both sides until the indexes meet
        let ti = i + 1,
          tj = j - 1;
        let valid = true;
        while (ti < tj) {
          if (pairs[string[ti]] == string[tj]) {
            continue;
          } else {
            valid = false;
            break;
          }
        }
        if (valid) {
          result.push(string.slice(i, j + 1));
        }
      }
    }
  }
  return result;
};
