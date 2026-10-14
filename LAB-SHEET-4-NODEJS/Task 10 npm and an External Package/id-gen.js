const { nanoid } = require("nanoid");

console.log("Five Unique IDs:");

for (let i = 1; i <= 5; i++) {
    console.log(i + ".", nanoid());
}