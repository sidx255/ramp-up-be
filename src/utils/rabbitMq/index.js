const amqp = require('amqplib');
const rabbitmqURL = 'amqp://localhost';

const setupEmailRabbitMQ = async () => {
  try {
    const queueName = 'email_queue';
    const connection = await amqp.connect(rabbitmqURL);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });

    return channel;
  }
  catch (error) {
    console.log(error);
  }
};

const setupReminderRabbitMQ = async () => {
  try {
    const queueName = 'reminder_queue';
    const connection = await amqp.connect(rabbitmqURL);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });
  
    return channel;
  } catch (error)
  {
    console.log(error);
  }
};

module.exports = {
  setupEmailRabbitMQ,
  setupReminderRabbitMQ
};