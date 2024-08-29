const express = require('express')
const productRouter =express.Router()
const productController = require('../Controller/productController')


productRouter.post('/add-product',productController.addProduct)
productRouter.patch('/update-product',productController.editProduct)
productRouter.delete('/delete-product',productController.deleteProduct)


module.exports=productRouter