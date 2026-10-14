const express = require("express");

const router = express.Router();

let books = [
    {
        id: 1,
        title: "Clean Code",
        author: "Robert C. Martin"
    },
    {
        id: 2,
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt"
    },
    {
        id: 3,
        title: "JavaScript Guide",
        author: "MDN"
    }
];

// GET all books
router.get("/", (req, res) => {
    res.json(books);
});

// GET one book
router.get("/:id", (req, res, next) => {
    const id = parseInt(req.params.id);

    const book = books.find(book => book.id === id);

    if (!book) {
        const error = new Error("Book not found");
        error.status = 404;
        return next(error);
    }

    res.json(book);
});

// POST a new book
router.post("/", (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };

    books.push(newBook);

    res.status(201).json(newBook);
});

// PUT a book
router.put("/:id", (req, res, next) => {
    const id = parseInt(req.params.id);

    const book = books.find(book => book.id === id);

    if (!book) {
        const error = new Error("Book not found");
        error.status = 404;
        return next(error);
    }

    book.title = req.body.title ?? book.title;
    book.author = req.body.author ?? book.author;

    res.json(book);
});

// DELETE a book
router.delete("/:id", (req, res, next) => {
    const id = parseInt(req.params.id);

    const bookIndex = books.findIndex(book => book.id === id);

    if (bookIndex === -1) {
        const error = new Error("Book not found");
        error.status = 404;
        return next(error);
    }

    const deletedBook = books.splice(bookIndex, 1);

    res.json({
        message: "Book deleted successfully",
        book: deletedBook[0]
    });
});

module.exports = router;