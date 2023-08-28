const setupRabbitMQ = require('../');

const emailHandler = require('../../sendInBlue');
const queueName = 'email_queue';

const emailConsumer = async () => {
  const channel = await setupRabbitMQ();
  
  channel.consume(queueName, async (message) => {
    const emailContent = JSON.parse(message.content.toString());
    await emailHandler(
      emailContent.organizerEmail, 
      emailContent.name, 
      emailContent.eventName, 
      emailContent.roomNo, 
      emailContent.date, 
      emailContent.time,
      emailContent.type);
    channel.ack(message);
  });
};

module.exports = emailConsumer;

