/**
 * A comparator function to determine the ordering of notifications
 * @param {Notification} a The first notification
 * @param {Notification} b The second notification
 */
function comparator(a, b) {
  if (a.appName == b.appName) {
    return a.date > b.date ? 1 : a.date < b.date ? -1 : 0;
  }
  return a.appName > b.appName ? 1 : -1;
}

exports.comparator = comparator;

/**
 * Use bubble sort to order notifications by name of app,
 * then by notification text
 * @param {Notification[]} notifications An array of Notification objects
 * @returns The sorted array
 */
exports.bubbleSort = (notifications) => {
  let tmp;
  for (let i = 0; i < notifications.length - 1; i++) {
    for (let j = 0; j < notifications.length - i - 1; j++) {
      if (comparator(notifications[j], notifications[j + 1]) == 1) {
        tmp = notifications[j];
        notifications[j] = notifications[j + 1];
        notifications[j + 1] = tmp;
      }
    }
  }
  return notifications;
};

/**
 * Use insertion sort to sort notifications
 * @param {Notifications[]} notifications An array of Notification objects
 * @returns The sorted array
 */
exports.insertionSort = (notifications) => {
  for (let i = 1; i < notifications.length; i++) {
    let tmp = notifications[i];
    let j = i - 1;
    for (; j >= 0 && comparator(notifications[j], tmp) == 1; j--) {
      notifications[j + 1] = notifications[j];
    }
    notifications[j + 1] = tmp;
  }
  return notifications;
};

/**
 * Use selection sort to sort notifications
 * @param {Notification[]} notifications An array of Notification objects
 * @returns The sorted array
 */
exports.selectionSort = (notifications) => {
  // init minimum val
  let minIdx;
  for (let i = 0; i < notifications.length - 1; i++) {
    // assume minimum is first index
    minIdx = i;
    for (let j = i + 1; j < notifications.length; j++) {
      // iterate through remaining indexes to find the true min
      if (comparator(notifications[j], notifications[minIdx]) == -1) {
        minIdx = j;
      }
    }

    // swap min and i
    let tmp = notifications[i];
    notifications[i] = notifications[minIdx];
    notifications[minIdx] = tmp;
  }
  return notifications;
};
