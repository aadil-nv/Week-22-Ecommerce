const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
  {
    categoryname: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    categorydescription: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, 
  }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
