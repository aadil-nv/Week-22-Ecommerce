const amqp = require('amqplib');

let connection;
let channel;

async function connectRabbitMQ() {
  try {
    connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue('ORDER', { durable: true });
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
    throw error;
  }
}

function getChannel() {
  if (!channel) {
    throw new Error('Channel is not initialized');
  }
  return channel;
}

module.exports = { connectRabbitMQ, getChannel };
