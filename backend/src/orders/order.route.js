const express = require("express");
const router = express.Router();
const { createAOrder, getOrderByEmail, getAllOrders, updateOrderStatus } = require("./order.controller");

// Define the route for getting all orders
router.get("/", getAllOrders);

// Define the route for getting orders by email
router.get("/email/:email", getOrderByEmail); // This should reference the correct controller function

// Define the route for creating an order
router.post("/", createAOrder);

// Define the route for updating an order
router.patch("/:orderId", updateOrderStatus);

module.exports = router;
