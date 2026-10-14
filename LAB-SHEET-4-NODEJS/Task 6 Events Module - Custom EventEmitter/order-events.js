const EventEmitter = require("events").EventEmitter;

const orderEmitter = new EventEmitter();

orderEmitter.on("orderPlaced", (order) => {
    console.log("\n===== ORDER RECEIPT =====");
    console.log("Order ID:", order.id);
    console.log("Item:", order.item);
    console.log("Amount: ₹" + order.amount);
    console.log("=========================");
});

// Emit three orders
orderEmitter.emit("orderPlaced", {
    id: 101,
    item: "Laptop",
    amount: 55000
});

orderEmitter.emit("orderPlaced", {
    id: 102,
    item: "Keyboard",
    amount: 1500
});

orderEmitter.emit("orderPlaced", {
    id: 103,
    item: "Mouse",
    amount: 800
});