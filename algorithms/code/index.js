const sorts = require("./sorts");
const searches = require("./searches");
const fs = require("fs/promises");
const assert = require("assert");
const random = require("random");
const chalk = require("chalk");

const User = require("../../data-structures/code/user");
const { error } = require("console");

(async () => {
  var db = {};
  try {
    const data = await fs.readFile("db.json");
    db = JSON.parse(data);
  } catch (error) {
    console.error(error.message);
  }

  // Throw error if user is empty
  if (!db.user) {
    throw new error("user object is empty");
  } else {
    db.user = new User(db.user);
  }

  // test sorts
  // [...db.user.notifications] is used to make a copy,
  // since these sort functions mutate the array passed to them
  {
    console.log(chalk.bold.underline("\nSorting Algos"));

    console.time("bubble sort");
    const bubbleSortedArray = sorts.bubbleSort([...db.user.notifications]);
    console.timeEnd("bubble sort");

    console.time("insertion sort");
    const insertionSortedArray = sorts.insertionSort([
      ...db.user.notifications,
    ]);
    console.timeEnd("insertion sort");

    console.time("selection sort");
    const selectionSortedArray = sorts.selectionSort([
      ...db.user.notifications,
    ]);
    console.timeEnd("selection sort");

    console.time("built-in sort");
    const builtInSortedArray = [...db.user.notifications].sort(
      sorts.comparator
    );
    console.timeEnd("built-in sort");

    // sanity checks
    assert.notDeepStrictEqual(db.user.notifications, builtInSortedArray);
    assert.deepStrictEqual(bubbleSortedArray, builtInSortedArray);
    assert.deepStrictEqual(insertionSortedArray, builtInSortedArray);
    assert.deepStrictEqual(selectionSortedArray, builtInSortedArray);

    // Log output
    // console.log(JSON.stringify(builtInSortedArray, null, 2));
  }

  // test searches

  {
    console.log(chalk.bold.underline("\nSearching Algos"));

    const randomIdx = random.int(0, db.user.notifications.length);
    const randomSearchNotification = db.user.notifications[randomIdx];

    console.time("linear search");
    const linearSearchIdx = searches.linearSearch(
      db.user.notifications,
      randomSearchNotification
    );
    console.timeEnd("linear search");

    console.time("binary search w/ sort");
    // sort array
    const binarySearchArray = [...db.user.notifications].sort(sorts.comparator);

    // search array
    console.time("binary search")
    const binarySearchIdx = searches.binarySearch(
      binarySearchArray,
      randomSearchNotification
    );
    console.timeEnd("binary search")
    console.timeEnd("binary search w/ sort");

    // sanity checks

    assert.deepStrictEqual(
      randomSearchNotification,
      db.user.notifications[linearSearchIdx]
    );
    assert.deepStrictEqual(
      randomSearchNotification,
      binarySearchArray[binarySearchIdx]
    );
  }

  // Write to file
  // await fs.writeFile("db.json", JSON.stringify(db));
})();
