const asyncHandler = require("express-async-handler");
const Orders = require('../Models/orderModel')



const addOrder = asyncHandler(async (req,res)=>{
    console.log("data is came here ");
    
})


module.exports = {
    addOrder
}