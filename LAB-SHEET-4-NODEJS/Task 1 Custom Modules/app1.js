const sum = require("./sum");
const checkEvenOdd = require("./even-odd");

const a = 10;
const b = 20;
const number = 15;

console.log("Sum of", a, "and", b, "=", sum(a, b));
console.log(number, "is", checkEvenOdd(number));