const express = require('express')
const  orderRouter =express.Router()
const orderControler = require('../Controller/orderController')



orderRouter.post('/add-order',orderControler.addOrder)
orderRouter.patch('/cancel-order',orderControler.cancelOrder)


module.exports = orderRouter