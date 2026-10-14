const args = process.argv;

const num1 = parseFloat(args[2]);
const num2 = parseFloat(args[3]);
const operator = args[4];

if (isNaN(num1) || isNaN(num2) || !operator) {
    console.log("Usage: node calc-cli.js <number1> <number2> <operator>");
    process.exit();
}

let result;

switch (operator) {
    case "+":
        result = num1 + num2;
        break;

    case "-":
        result = num1 - num2;
        break;

    case "*":
        result = num1 * num2;
        break;

    case "/":
        if (num2 === 0) {
            console.log("Error: Cannot divide by zero.");
            process.exit();
        }

        result = num1 / num2;
        break;

    default:
        console.log("Invalid operator. Use +, -, * or /.");
        process.exit();
}

console.log(`${num1} ${operator} ${num2} = ${result}`);