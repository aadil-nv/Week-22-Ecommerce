const express = require('express')
const  orderRouter =express.Router()
const orderControler = require('../Controller/orderController')



orderRouter.post('/create-order',orderControler.createOrder)
orderRouter.patch('/cancel-order',orderControler.cancelOrder)


module.exports = orderRouter