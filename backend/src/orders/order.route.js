const express = require("express");
const router = express.Router();
const Order = require("./order.model");  // Ensure you're importing the Order model

// Define the route for getting all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find(); // Fetch all orders from the database
    res.status(200).json(orders); // Send the list of orders
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

// Define the route for getting orders by email
router.get("/email/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const orders = await Order.find({ email }); // Find orders by email
    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this email" });
    }
    res.status(200).json(orders); // Send the found orders
  } catch (err) {
    console.error("Error fetching orders by email:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

// Define the route for creating an order
router.post("/", async (req, res) => {
  const newOrder = req.body;
  try {
    const order = new Order(newOrder); // Create a new order
    await order.save(); // Save the order to the database
    res.status(201).json(order); // Return the created order
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(400).json({ message: "Bad request", error: err });
  }
});

router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { isPaid, isDelivered } = req.body;  // Get fields to update
    
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        id, 
        { isPaid, isDelivered }, 
        { new: true }
      );
      if (!updatedOrder) {
        return res.status(404).send({ message: "Order not found" });
      }
      res.status(200).json(updatedOrder);  // Ensure you return the updated order here
    } catch (err) {
      console.error("Error updating order:", err);
      res.status(400).send({ message: "Bad request", error: err });
    }
  });
  

module.exports = router;
