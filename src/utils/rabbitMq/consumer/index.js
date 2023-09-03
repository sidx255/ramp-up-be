const {
  setupEmailRabbitMQ,
  setupReminderRabbitMQ
} = require('../');

const emailHandler = require('../../sendInBlue');

const emailConsumer = async () => {
  const queueName = 'email_queue';
  const channel = await setupEmailRabbitMQ();
  
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

const reminderConsumer = async () => {
  const queueName = 'reminder_queue';
  const channel = await setupReminderRabbitMQ();

  channel.consume(queueName, async (message) => {
    const reminderData = JSON.parse(message.content.toString());
    await emailHandler(
      reminderData.organizer,
      reminderData.name,
      reminderData.eventName,
      reminderData.roomNo,
      reminderData.date,
      reminderData.time,
      reminderData.type
    );
    channel.ack(message);

  });
};

module.exports = {
  emailConsumer,
  reminderConsumer
};

