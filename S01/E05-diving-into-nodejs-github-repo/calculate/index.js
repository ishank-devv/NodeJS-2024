// collecting all requires from the calculate folder
// grouping together all these files, making calculate(folder)
// a new module
const { calculateMultiply } = require("./multiply");
const { calculateSum } = require("./sum");

module.exports = { calculateMultiply, calculateSum };
