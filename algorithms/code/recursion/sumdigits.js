/**
 * Recursively sum the digits
 * @param {number} number The text to analyze
 */
const recursivelySumDigits = (number) => {
  if (number <= 9) {
    return number;
  } else {
    // recursively sum the digits before the last digit
    // and add the last digit
    const strNum = number.toString();
    return (
      recursivelySumDigits(
        Number.parseInt(strNum.slice(0, strNum.length - 1))
      ) + Number.parseInt(strNum.slice(strNum.length - 1, strNum.length))
    );
  }
};
exports.recursivelySumDigits = recursivelySumDigits;

const iterativelySumDigits = (number) => {
  let sum = 0;
  let strNum = number.toString();
  while (strNum.length > 0) {
    sum += Number.parseInt(strNum.slice(strNum.length - 1, strNum.length));
    strNum = strNum.slice(0, strNum.length - 1);
  }
  return sum;
};

exports.iterativelySumDigits = iterativelySumDigits;
