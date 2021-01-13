const sorts = require("./sorts");

/**
 * Use linear search to look for a notification date
 * @param {Notification[]} notifications An array of Notification objects
 * @param {Notification} target The notification to search for
 * @returns {int} The index of the notification, or -1 if there is no match
 */
exports.linearSearch = (notifications, target) => {
  for (let i = 0; i < notifications.length; i++) {
    if (sorts.comparator(notifications[i], target) == 0) {
      return i;
    }
  }
  return -1;
};

/**
 * Use binary search to look for a notification date
 * @param {Notification[]} notifications A sorted array of Notification objects
 * @param {Notification} target The notification to search for
 * @returns {int} The index of the notification, or -1 if there is no match
 */
exports.binarySearch = (notifications, target) => {
  let lo = 0,
    hi = notifications.length - 1,
    mid = Math.floor((lo + hi) / 2);
  while (lo <= hi) {

    if (sorts.comparator(target, notifications[mid]) == 0) {
      return mid;
    } else if (sorts.comparator(target, notifications[mid]) == -1) {
      // the desired date is less than the midpoint
      hi = mid - 1;
      mid = Math.floor((lo + hi) / 2);
    } else if (sorts.comparator(target, notifications[mid]) == 1) {
      // the desired date is more than the midpoint
      lo = mid + 1;
      mid = Math.floor((lo + hi) / 2);
    }
  }
  return -1;
};
