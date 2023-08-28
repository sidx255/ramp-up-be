const amqp = require('amqplib');
const rabbitmqURL = 'amqp://localhost';
const queueName = 'email_queue';

const setupRabbitMQ = async () => {
  const connection = await amqp.connect(rabbitmqURL);
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName, { durable: true });

  return channel;
};

module.exports = setupRabbitMQ;