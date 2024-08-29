const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    productname: {
      type: String,
      required: true,
      trim: true,
    },
    productdescription: {
      type: String,
      required: true,
      trim: true,
    },
    productprice: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
   
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
