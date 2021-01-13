const fs = require("fs");

const getAlgoAvg = (name, perfData) => {
  const vals = perfData.filter((element) => element.name.includes(name));
  let total = 0;
  vals.forEach((element) => {
    total += element.duration;
  });
  const avg = total / vals.length;
  return avg;
};

const perfData = JSON.parse(fs.readFileSync("perf.json"));

console.log(`bubbleSort: ${getAlgoAvg("bubbleSort", perfData)}`);
console.log(`insertionSort: ${getAlgoAvg("insertionSort", perfData)}`);
console.log(`selectionSort: ${getAlgoAvg("selectionSort", perfData)}`);
console.log(`builtinSort: ${getAlgoAvg("builtinSort", perfData)}`);

console.log(`linearSearch: ${getAlgoAvg("linearSearch", perfData)}`);
console.log(`binarySearch: ${getAlgoAvg("binarySearch", perfData)}`);
console.log(`binarySearchSort: ${getAlgoAvg("binarySearchSort", perfData)}`);
