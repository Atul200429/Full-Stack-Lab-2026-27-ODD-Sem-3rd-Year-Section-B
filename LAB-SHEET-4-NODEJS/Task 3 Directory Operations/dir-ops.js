const fs = require("fs");

const folderName = "uploads";

if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
    console.log("uploads folder created.");
}

// Create 3 empty files
fs.writeFileSync(`${folderName}/file1.txt`, "");
fs.writeFileSync(`${folderName}/file2.txt`, "");
fs.writeFileSync(`${folderName}/file3.txt`, "");

console.log("Three files created.");

// List files
const files = fs.readdirSync(folderName);

console.log("\nFiles in uploads folder:");
files.forEach(file => {
    console.log(file);
});

// Delete one file
fs.unlinkSync(`${folderName}/file2.txt`);

console.log("\nfile2.txt deleted.");

console.log("\nRemaining files:");
fs.readdirSync(folderName).forEach(file => {
    console.log(file);
});