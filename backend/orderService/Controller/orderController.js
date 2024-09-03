const asyncHandler = require("express-async-handler");
const Orders = require("../Models/orderModel");
const generateOrderId = require("../config/genarateOrderId");

const addOrder = asyncHandler(async (req, res) => {
  const { customer, items, totalAmount, shippingAddress, paymentMethod } =
    req.body;

  if (!customer) {
    return res
      .status(400)
      .json({ message: "Customer information is required." });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res
      .status(400)
      .json({ message: "Items must be a non-empty array." });
  }

  for (const item of items) {
    if (!item.product) {
      return res
        .status(400)
        .json({ message: "Each item must have a product reference." });
    }
    if (!item.quantity || item.quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Each item must have a positive quantity." });
    }
    if (!item.price || item.price <= 0) {
      return res
        .status(400)
        .json({ message: "Each item must have a positive price." });
    }
  }

  if (!totalAmount || totalAmount <= 0) {
    return res
      .status(400)
      .json({ message: "Total amount must be a positive number." });
  }

  if (!shippingAddress) {
    return res.status(400).json({ message: "Shipping address is required." });
  }

  if (!paymentMethod) {
    return res.status(400).json({ message: "Payment method is required." });
  }

  const orderData = await Orders.create({
    orderNumber: generateOrderId(),
    customer,
    items,
    totalAmount,
    shippingAddress,
    paymentMethod,
  });

  if (!orderData) {
    return res.status(400).json({ message: "Failed to create order." });
  }

  return res
    .status(201)
    .json({ message: "Order created successfully.", orderData });
});

const cancelOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.body;

  const orderFound = await Orders.findById(orderId);

  if (!orderFound) {
    return res.status(400).json({ message: "OrderId not found" });
  } else {
    await Orders.findByIdAndUpdate(orderId, { status: "canceled" });
    return res
      .status(200)
      .json({ message: "Order status updated to canceled" });
  }
});



module.exports = {
  addOrder,
  cancelOrder,
};
