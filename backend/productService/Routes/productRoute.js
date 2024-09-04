const express = require('express')
const productRouter =express.Router()
const productController = require('../Controller/productController')
const isAuthenticated = require('../Middleware/isAuthenticated')

productRouter.post('/add-product',isAuthenticated,productController.addProduct)
productRouter.patch('/update-product',isAuthenticated,productController.editProduct)
productRouter.delete('/delete-product',isAuthenticated,productController.deleteProduct)
productRouter.post('/buy-product',isAuthenticated,productController.buyProduct)

module.exports=productRouter