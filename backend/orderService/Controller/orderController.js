const asyncHandler = require("express-async-handler");
const Orders = require("../Models/orderModel");
const generateOrderId = require("../config/genarateOrderId");


const createOrder = async (userId, productId, product) => {
  console.log("User ID:", userId);
  console.log("Product ID:", productId);
 const customerId = userId
  if (!userId || !productId) {
    throw new Error("User ID and Product ID are required.");
  }

  if (!product) {
    throw new Error("Product details are required.");
  }

  const orderData = await Orders.create({
    orderNumber: generateOrderId(), 
    customer: customerId, 
    items: [{ product: productId, quantity: 1, price: product.productprice }], 
    totalAmount: product.productprice, 
  });

  return orderData;
};


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
  createOrder,
  cancelOrder,
};
