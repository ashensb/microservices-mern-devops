const Order = require('../models/orderModel');

// 1. Get All Orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. Create an Order
exports.createOrder = async (req, res) => {
  try {
    const { productId, quantity, totalPrice } = req.body;
    const newOrder = new Order({ productId, quantity, totalPrice });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update Order Status (e.g., Pending -> Completed)
exports.updateOrderStatus = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete/Cancel an Order
exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order Cancelled Successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};