const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer', 
    required: true,
  },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
 
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
