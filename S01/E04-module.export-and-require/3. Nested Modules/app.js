// const { x, calculateSum } = require("./calculate/sum");
// const { calculateMultiply } = require("./calculate/multiply");

//version 2 - using index.js to collect all requires
const { calculateSum, calculateMultiply } = require("./calculate/index");

calculateSum(4, 3);

calculateMultiply(6, 5);

const data = require("./data.json");
console.log(data);
console.log(JSON.stringify(data));

const util = require("node:util");
