const asyncHandler = require("express-async-handler");
const Category = require("../Models/categoryModel");

const addCategory = asyncHandler(async (req, res) => {
  const { categoryname, categorydescription } = req.body;

  if (!categoryname || categoryname.trim().length < 1) {
    return res.status(400).json({
      message: "Category name is required and must have at least 1 character.",
    });
  }

  if (!categorydescription || categorydescription.trim().length < 3) {
    return res.status(400).json({
      message:
        "Category description is required and must have at least 3 characters.",
    });
  }

  const categoryData = await Category.create({
    categoryname,
    categorydescription
  })
  if(categoryData){
    res.status(200).json({
        _id:categoryData._id,
        categoryname:categoryData.categoryname,
        categorydescription:categoryData.categorydescription
    })
  }else{
    res.status(400).json({message:"Category is not added"})
  }
});


module.exports={
    addCategory
}