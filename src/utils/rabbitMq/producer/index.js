const queueName = 'email_queue';

const setupRabbitMQ = require('../');

const sendEmailToQueue = async (organizerEmail, name, eventName, roomNo, date, time, type) => {
  const channel = await setupRabbitMQ();

  const emailContent = {
    organizerEmail,
    name,
    eventName,
    roomNo,
    date,
    time,
    type
  };
  
  await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(emailContent)), {
    persistent: true
  });
};

module.exports = sendEmailToQueue;