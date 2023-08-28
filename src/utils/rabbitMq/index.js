const amqp = require('amqplib');
const rabbitmqURL = 'amqp://localhost';

const setupEmailRabbitMQ = async () => {
  const queueName = 'email_queue';
  const connection = await amqp.connect(rabbitmqURL);
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName, { durable: true });

  return channel;
};

const setupReminderRabbitMQ = async () => {
  const queueName = 'reminder_queue';
  const connection = await amqp.connect(rabbitmqURL);
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName, { durable: true });
  
  return channel;
};

module.exports = {
  setupEmailRabbitMQ,
  setupReminderRabbitMQ
}