const express = require("express");

const router = express.Router();

router.get("/:id", (req, res) => {
    const id = req.params.id;

    res.json({
        id: id,
        message: "Student details"
    });
});

module.exports = router;