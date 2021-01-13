const sorts = require("./sorts");
const searches = require("./searches");
const fs = require("fs/promises");
const fsNoAsync = require("fs");
const assert = require("assert");
const random = require("random");
const chalk = require("chalk");
const { performance, PerformanceObserver } = require("perf_hooks");

const User = require("../../../data-structures/code/user");
const { generateData } = require("./generateData");

const perfObserver = new PerformanceObserver((items) => {
  let perf = [];
  try {
    perf = JSON.parse(fsNoAsync.readFileSync("perf.json"));
  } catch (error) {
    // guess it doesnt exist oh well
  }
  items.getEntries().map((item) => {
    perf.push(item);
    // console.log(item);
  });
  fsNoAsync.writeFileSync("perf.json", JSON.stringify(perf));
});

/**
 *
 * @param {int} reps The number of reps to run
 * @param {int} objects The number of objects to generate per rep
 */
const run = async (reps, objects) => {
  // delete old data
  await fs.rm("perf.json");
  await fs.rm("db.json");

  // Setup perf logging
  perfObserver.observe({ entryTypes: ["measure"], buffer: true });

  for (let i = 0; i < reps; i++) {
    // run generator
    await generateData(objects);

    // read vars
    var db = {};
    try {
      const data = await fs.readFile("db.json");
      db = JSON.parse(data);
    } catch (error) {
      console.error(error.message);
    }

    // Throw error if user is empty
    if (!db.user) {
      throw Error("user object is empty");
    } else {
      db.user = new User(db.user);
    }

    // test sorts
    // [...db.user.notifications] is used to make a copy,
    // since these sort functions mutate the array passed to them
    console.log(chalk.bold.underline("\nSorting Algos"));

    performance.mark(`bubbleSort-start-${i}`);
    const bubbleSortedArray = sorts.bubbleSort([...db.user.notifications]);
    performance.mark(`bubbleSort-end-${i}`);
    performance.measure(`bubbleSort-${i}`, `bubbleSort-start-${i}`, `bubbleSort-end-${i}`);

    performance.mark(`insertionSort-start-${i}`);
    const insertionSortedArray = sorts.insertionSort([
      ...db.user.notifications,
    ]);
    performance.mark(`insertionSort-end-${i}`);
    performance.measure(
      `insertionSort-${i}`,
      `insertionSort-start-${i}`,
      `insertionSort-end-${i}`
    );

    performance.mark(`selectionSort-start-${i}`);
    const selectionSortedArray = sorts.selectionSort([
      ...db.user.notifications,
    ]);
    performance.mark(`selectionSort-end-${i}`);
    performance.measure(
      `selectionSort-${i}`,
      `selectionSort-start-${i}`,
      `selectionSort-end-${i}`
    );

    performance.mark(`builtinSort-start-${i}`);
    const builtInSortedArray = [...db.user.notifications].sort(
      sorts.comparator
    );
    performance.mark(`builtinSort-end-${i}`);
    performance.measure(`builtinSort-${i}`, `builtinSort-start-${i}`, `builtinSort-end-${i}`);

    // sanity checks
    assert.deepStrictEqual(bubbleSortedArray, builtInSortedArray);
    assert.deepStrictEqual(insertionSortedArray, builtInSortedArray);
    assert.deepStrictEqual(selectionSortedArray, builtInSortedArray);

    // Log output
    // console.log(JSON.stringify(builtInSortedArray, null, 2));

    // test searches
    console.log(chalk.bold.underline("\nSearching Algos"));

    const randomIdx = random.int(0, db.user.notifications.length - 1);
    const randomSearchNotification = db.user.notifications[randomIdx];

    performance.mark(`linearSearch-start-${i}`);
    const linearSearchIdx = searches.linearSearch(
      db.user.notifications,
      randomSearchNotification
    );
    performance.mark(`linearSearch-end-${i}`);
    performance.measure(
      `linearSearch-${i}`,
      `linearSearch-start-${i}`,
      `linearSearch-end-${i}`
    );

    performance.mark(`binarySearchSort-start-${i}`);
    // sort array
    const binarySearchArray = [...db.user.notifications].sort(sorts.comparator);

    // search array
    performance.mark(`binarySearch-start-${i}`);
    const binarySearchIdx = searches.binarySearch(
      binarySearchArray,
      randomSearchNotification
    );
    performance.mark(`binarySearch-end-${i}`);
    performance.measure(
      `binarySearch-${i}`,
      `binarySearch-start-${i}`,
      `binarySearch-end-${i}`
    );
    performance.measure(
      `binarySearchSort-${i}`,
      `binarySearchSort-start-${i}`,
      `binarySearch-end-${i}`
    );

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
};

run(10, process.argv[2]);
