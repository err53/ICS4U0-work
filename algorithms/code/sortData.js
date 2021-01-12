var sorts = require("./sorts");
var fs = require("fs/promises");
var assert = require("assert");

var User = require("../../data-structures/code/user");

(async () => {
  var db = {};
  try {
    const data = await fs.readFile("db.json");
    db = JSON.parse(data);
  } catch (error) {
    console.error(error.message);
  }

  // Create user if empty
  if (!db.user) {
    throw "user object is empty";
  } else {
    db.user = new User(db.user);
  }

  // Print existing notifications
  // console.log("initial state");
  // console.log(JSON.stringify(db, null, 2));
  // console.log(); // send a newline to space stuff out

  // test sorts

  console.time("bubble sort");
  let bubbleSortedArray = [...db.user.notifications];
  bubbleSortedArray = sorts.bubbleSort(bubbleSortedArray);
  console.timeEnd("bubble sort");

  console.time("insertion sort");
  let insertionSortedArray = [...db.user.notifications];
  insertionSortedArray = sorts.insertionSort(insertionSortedArray);
  console.timeEnd("insertion sort");

  console.time("selection sort");
  let selectionSortedArray = [...db.user.notifications];
  selectionSortedArray = sorts.selectionSort(selectionSortedArray);
  console.timeEnd("selection sort");

  console.time("built-in sort");
  let builtInSortedArray = [...db.user.notifications];
  builtInSortedArray = builtInSortedArray.sort(sorts.comparator);
  console.timeEnd("built-in sort");

  // sanity checks
  assert.notDeepStrictEqual(db.user.notifications, builtInSortedArray);
  assert.deepStrictEqual(bubbleSortedArray, builtInSortedArray);
  assert.deepStrictEqual(insertionSortedArray, builtInSortedArray);
  assert.deepStrictEqual(selectionSortedArray, builtInSortedArray);

  // console.log("final state");
  // console.log(JSON.stringify(db, null, 2));

  // Write to file
  // await fs.writeFile("db.json", JSON.stringify(db));
})();
