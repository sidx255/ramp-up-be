
const {
  setupEmailRabbitMQ, 
  setupReminderRabbitMQ
} = require('../');
const { calculateReminderTime } = require('../../roomBooking');

const sendEmailToQueue = async (organizerEmail, name, eventName, roomNo, date, time, type) => {
  const channel = await setupEmailRabbitMQ();
  const queueName = 'email_queue';

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

const scheduleReminder = async (organizer, name, eventName, roomNo, date, time, from, type) => {
  const reminderTime = calculateReminderTime(from);
  const channel = await setupReminderRabbitMQ();
  const reminderData = {
    organizer,
    name,
    eventName,
    roomNo,
    date,
    time,
    type,
  };

  const remainingTime = reminderTime - Date.now();
  
  const delayQueueName = 'delay_queue';
  await channel.assertQueue(delayQueueName, {
    durable: true,
    arguments: {
      'x-dead-letter-exchange': '',
      'x-dead-letter-routing-key': 'reminder_queue',
      'x-message-ttl': remainingTime
    }
  });
  const exchangeName = 'delay_exchange';
  await channel.assertExchange(exchangeName, 'direct', {
    durable: true
  });

  await channel.bindQueue(delayQueueName, exchangeName, '');

  await channel.publish(exchangeName, '', Buffer.from(JSON.stringify(reminderData)), {
    persistent: true
  });

};

const cancelScheduledReminder = async (organizer, name, eventName, roomNo, date, time, from) => {
  const queueName = 'delay_queue';
  const channel = await setupReminderRabbitMQ();

  await channel.purgeQueue(queueName, false, {
    'x-match': 'all',
    'organizer': organizer,
    'name': name,
    'eventName': eventName,
    'roomNo': roomNo,
    'date': date,
    'time': time,
    'from': from,
  });
};

module.exports = {
  sendEmailToQueue,
  scheduleReminder,
  cancelScheduledReminder
};