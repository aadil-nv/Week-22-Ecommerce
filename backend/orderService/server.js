const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;
const colors = require('colors');
const orderRoutes = require('./Routes/orderRoute');
const amqp = require('amqplib');
const { createOrder } = require('../orderService/Controller/orderController');

dotenv.config();
connectDB();
app.use(express.json());

(async () => {
  try {
    const conn = await amqp.connect('amqp://localhost:5672');
    const ch = await conn.createChannel();
    const q = 'ORDER';
    await ch.assertQueue(q, { durable: false });
    ch.consume('ORDER', async (data) => {
      try {
        console.log("publish data : ",JSON.parse(data.content.toString()))
        const { productId, product, userId } = JSON.parse(data.content.toString());
        

        if (!userId) {
          throw new Error('userId is undefined');
        }

        console.log('Consuming order queue');
        console.log('Product ID orderser:', productId);
        console.log('Products:', product);
        console.log('User rrrr ID:', userId);

        const order = await createOrder(userId, productId, product);
        console.log('Order created successfully:', order);
        ch.ack(data);  // Acknowledge the message only after the order is successfully created
      } catch (error) {
        console.error('Order creation failed:', error.message);
      }
    });
  } catch (err) {
    console.error('AMQP Error:', err);
  }
})();

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.use('/api/order', orderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).send('Something went wrong!');
});
app.listen(PORT, () => {
  console.log(`Order server is running on http://localhost:${PORT}`.bgGreen.bold.underline);
});
