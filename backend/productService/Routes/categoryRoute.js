const express = require('express')
const CategoryRouter =express.Router()
const categoryController = require('../Controller/categoryController')

CategoryRouter.post('/add-category',categoryController.addCategory)
CategoryRouter.get('/all-categorys',categoryController.allCategory)

module.exports = CategoryRouter 