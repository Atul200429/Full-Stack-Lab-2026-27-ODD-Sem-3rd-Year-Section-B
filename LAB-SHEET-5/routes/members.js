const express = require("express");

const router = express.Router();

let members = [
    {
        id: 1,
        name: "Atul Krishna",
        email: "atul@example.com"
    },
    {
        id: 2,
        name: "Rahul Sharma",
        email: "rahul@example.com"
    },
    {
        id: 3,
        name: "Priya Singh",
        email: "priya@example.com"
    }
];

// GET all members
router.get("/", (req, res) => {
    res.json(members);
});

// GET one member
router.get("/:id", (req, res, next) => {
    const id = parseInt(req.params.id);

    const member = members.find(member => member.id === id);

    if (!member) {
        const error = new Error("Member not found");
        error.status = 404;
        return next(error);
    }

    res.json(member);
});

// POST a new member
router.post("/", (req, res) => {
    const newMember = {
        id: members.length + 1,
        name: req.body.name,
        email: req.body.email
    };

    members.push(newMember);

    res.status(201).json(newMember);
});

// PUT a member
router.put("/:id", (req, res, next) => {
    const id = parseInt(req.params.id);

    const member = members.find(member => member.id === id);

    if (!member) {
        const error = new Error("Member not found");
        error.status = 404;
        return next(error);
    }

    member.name = req.body.name ?? member.name;
    member.email = req.body.email ?? member.email;

    res.json(member);
});

// DELETE a member
router.delete("/:id", (req, res, next) => {
    const id = parseInt(req.params.id);

    const memberIndex = members.findIndex(member => member.id === id);

    if (memberIndex === -1) {
        const error = new Error("Member not found");
        error.status = 404;
        return next(error);
    }

    const deletedMember = members.splice(memberIndex, 1);

    res.json({
        message: "Member deleted successfully",
        member: deletedMember[0]
    });
});

module.exports = router;