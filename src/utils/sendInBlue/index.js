const { sendMail } = require('./api');

const sendRegistrationEmail = async (email, name, eventName, roomNo, date, time) => {
  const sender = { name: process.env.SENDINBLUE_USERNAME, email: process.env.SENDINBLUE_EMAIL };
  const to = [{ name: name, email: email }];
  const subject = `GetARoom booked - ${eventName} on ${date} at ${time}`;
  const htmlContent =
    `
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  
  <body>
    <div
      style="max-width: 800px; margin: 0 auto; padding: 40px; padding-bottom: 20px; background-color: #051C2C; color:whitesmoke; box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16); border-radius: 6px; text-align: center;">
      <h1 style="margin: 0 0 20px; font-size: 36px; font-weight: bold; ">Room Reservation Confirmed</h1>
      <div style="display: flex; align-items: end">
        <div style="font-size: 35px; color: #2251FF; margin-bottom: 6px;">Dear ${name},</div>
      </div>
      <br>
      <p style="margin: 0 0 20px; font-size: 20px;text-align: justify;">
        Your reservation for
        <span style="font-weight: bold;">${eventName}</span>
        on
        <span style="font-weight: bold;">${date}</span>
        at
        <span style="font-weight: bold;">${time}</span>
        in room
        <span style="font-weight: bold;">${roomNo}</span>
        has been confirmed.
      </p>
      <div style="display: flex; justify-content: space-between;">
        <p>Powered by @GetARoom</p>
      </div>
    </div>
  </body>
  
  </html>
  `;
  await sendMail(sender, to, subject, htmlContent);
  console.log('Email sent');
};

const sendUpdateEmail = async (email, name, eventName, roomNo, date, time) => {
  const sender = { name: process.env.SENDINBLUE_USERNAME, email: process.env.SENDINBLUE_EMAIL };
  const to = [{ name: name, email: email }];
  const subject = `GetARoom updated - ${eventName} on ${date} at ${time}`;
  const htmlContent = `
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  
  <body>
    <div
      style="max-width: 800px; margin: 0 auto; padding: 40px; padding-bottom: 20px; background-color: #051C2C; color:whitesmoke; box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16); border-radius: 6px; text-align: center;">
      <h1 style="margin: 0 0 20px; font-size: 36px; font-weight: bold; ">Room Reservation Updated</h1>
      <div style="display: flex; align-items: end">
        <div style="font-size: 35px; color: #2251FF; margin-bottom: 6px;">Dear ${name},</div>
      </div>
      <br>
      <p style="margin: 0 0 20px; font-size: 20px;text-align: justify;">
        Your reservation for
        <span style="font-weight: bold;">${eventName}</span>
        on
        <span style="font-weight: bold;">${date}</span>
        at
        <span style="font-weight: bold;">${time}</span>
        in room
        <span style="font-weight: bold;">${roomNo}</span>
        has been confirmed.
      </p>
      <div style="display: flex; justify-content: space-between;">
        <p>Powered by @GetARoom</p>
      </div>
    </div>
  </body>
  
  </html>
  `;
  await sendMail(sender, to, subject, htmlContent);
  console.log('Email sent');
};

const sendCancellationEmail = async (email, name, eventName, roomNo, date, time) => {
  const sender = { name: process.env.SENDINBLUE_USERNAME, email: process.env.SENDINBLUE_EMAIL };
  const to = [{ email, name }];
  const subject = `GetARoom cancelled - ${eventName} on ${date} at ${time}`;
  const htmlContent = `
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  
  <body>
    <div
      style="max-width: 800px; margin: 0 auto; padding: 40px; padding-bottom: 20px; background-color: #051C2C; color:whitesmoke; box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16); border-radius: 6px; text-align: center;">
      <h1 style="margin: 0 0 20px; font-size: 36px; font-weight: bold; ">Room Reservation Cancelled</h1>
      <div style="display: flex; align-items: end">
        <div style="font-size: 35px; color: #2251FF; margin-bottom: 6px;">Dear ${name},</div>
      </div>
      <br>
      <p style="margin: 0 0 20px; font-size: 20px;text-align: justify;">
        Your reservation for
        <span style="font-weight: bold;">${eventName}</span>
        on
        <span style="font-weight: bold;">${date}</span>
        at
        <span style="font-weight: bold;">${time}</span>
        in room
        <span style="font-weight: bold;">${roomNo}</span>
        has been cancelled.
      </p>
      <div style="display: flex; justify-content: space-between;">
        <p>Powered by @GetARoom</p>
      </div>
    </div>
  </body>
  
  </html>
  `;
  await sendMail(sender, to, subject, htmlContent);
  console.log('Email sent');
};

const emailHandler = async (email, name, eventName, roomNo, date, time, type) => {
  if (type === 'c') {
    await sendRegistrationEmail(email, name, eventName, roomNo, date, time);
  } else if (type === 'u') {
    await sendUpdateEmail(email, name, eventName, roomNo, date, time);
  } else if (type === 'd') {
    await sendCancellationEmail(email, name, eventName, roomNo, date, time);
  }
};

module.exports = emailHandler;
