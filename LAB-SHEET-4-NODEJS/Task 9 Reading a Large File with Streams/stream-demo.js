const fs = require("fs");

const fileName = "large-file.txt";

// Create a file with 50 lines
let content = "";

for (let i = 1; i <= 50; i++) {
    content += `This is line number ${i}\n`;
}

fs.writeFileSync(fileName, content);

console.log("large-file.txt created with 50 lines.");
console.log("\nReading file using stream...\n");

// Create read stream
const readStream = fs.createReadStream(fileName);

readStream.on("data", (chunk) => {
    console.log("Chunk received:", chunk.length, "bytes");
});

readStream.on("end", () => {
    console.log("\nFinished reading the file.");
});

readStream.on("error", (err) => {
    console.log("Error:", err.message);
});