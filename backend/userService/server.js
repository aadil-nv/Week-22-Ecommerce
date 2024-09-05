const express = require('express');
const app = express();
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 7000;
const colors = require('colors');
const userRoutes = require('./Routes/userRoute')

// bkddsdsdsfbkdsdshgfddfggfdgdfbknhgnghnghnhgndsdsdsshdbhfjksbdf
app.use(express.json())
dotenv.config()
connectDB()

app.get('/', (req, res) => {
  res.send('Server is running!');
});
app.use("/api/user",userRoutes)

app.listen(PORT, () => {
  console.log(`user-server is running on http://localhost:${PORT} `.bgGreen.bold.underline);
});
