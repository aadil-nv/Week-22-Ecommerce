const express = require('express');
const app = express();
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 6000;
const colors = require('colors');
const productRoutes = require('./Routes/productRoute')
const categoryRoutes = require('./Routes/categoryRoute')

app.use(express.json())
dotenv.config()
connectDB()

app.get('/', (req, res) => {
  res.send('Server is running!');
});
app.use("/api/product",productRoutes)
app.use("/api/category",categoryRoutes)

app.listen(PORT, () => {
  console.log(`product-server is running on http://localhost:${PORT}`.bgCyan.bold.underline);
});
