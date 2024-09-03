const express = require('express');
const app = express();
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000;
const colors = require('colors');
const orderRoutes = require('./Routes/orderRoute')

app.use(express.json())
dotenv.config()
connectDB()

app.get('/', (req, res) => {
  res.send('Server is running!');
});
app.use("/api/order",orderRoutes)

app.listen(PORT, () => {
  console.log(`user-server is running on http://localhost:${PORT} `.bgGreen.bold.underline);
});
