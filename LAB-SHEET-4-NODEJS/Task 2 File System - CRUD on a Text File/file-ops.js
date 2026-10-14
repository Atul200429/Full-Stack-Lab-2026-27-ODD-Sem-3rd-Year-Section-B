const fs = require("fs");

const fileName = "student.txt";

// Create and write the file
fs.writeFile(
    fileName,
    "Name: Atul Krishna\nCUID: CU24250231\n",
    (err) => {
        if (err) throw err;

        console.log("student.txt created and data written.");

        // Append course name
        fs.appendFile(
            fileName,
            "Course: Node.js\n",
            (err) => {
                if (err) throw err;

                console.log("Course name appended.");

                // Read file
                fs.readFile(
                    fileName,
                    "utf8",
                    (err, data) => {
                        if (err) throw err;

                        console.log("\nFile Content:");
                        console.log(data);

                        // Rename file
                        fs.rename(
                            fileName,
                            "profile.txt",
                            (err) => {
                                if (err) throw err;

                                console.log(
                                    "student.txt renamed to profile.txt"
                                );
                            }
                        );
                    }
                );
            }
        );
    }
);