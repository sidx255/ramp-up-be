let Brevo = require('@getbrevo/brevo');
const dotenv = require('dotenv');
// config with path to .env file
dotenv.config({ path: '../../../.env' });

let defaultClient = Brevo.ApiClient.instance;
let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

const transactionalEmailsApi = new Brevo.TransactionalEmailsApi();

const sendMail = async (sender, to, subject, htmlContent) => {
  try {
    const sent = await transactionalEmailsApi.sendTransacEmail({
      sender,
      to,
      subject,
      htmlContent
    });
    return sent;
  }
  catch (err) {
    console.log(err);
  }
};


module.exports = { sendMail };