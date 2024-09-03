const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Correct import
const PORT = process.env.PORT || 6000;
const colors = require('colors');
const productRoutes = require('./Routes/productRoute');
const categoryRoutes = require('./Routes/categoryRoute');
const amqp = require('amqplib');

dotenv.config();
connectDB(); // Ensure it's called correctly

app.use(express.json());

(async () => {
  try {
    const conn = await amqp.connect('amqp://localhost:5672');
    const ch = await conn.createChannel();
    const q = 'PRODUCT';
    await ch.assertQueue(q, { durable: false });
    ch.consume(q, (msg) => msg && console.log(`Received: ${msg.content.toString()}`), { noAck: true });
  } catch (err) {
    console.error('AMQP Error:', err);
  }
})();

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.use('/api/product', productRoutes);
app.use('/api/category', categoryRoutes);

app.listen(PORT, () => {
  console.log(`product-server is running on http://localhost:${PORT}`.bgCyan.bold.underline);
});
