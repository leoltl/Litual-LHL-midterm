const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

//helper function to send sms using twilio api
//mo - mobile originated aka sender
//mt - mobile terminated aka receiver
const sendSMS = function (MO, MT, body) {
  client.messages.create({
    to: '+1' + MT,
    from: MO,
    body: body
  })
  .then((message) => console.log(message));
}

module.exports = sendSMS;
