const accountSid = 'AC04797f986e3f1c3f9a1aeb5084f75991';
const authToken = 'd190c7a6e081ed2d834185d76031fb8b';
const client = require('twilio')(accountSid, authToken);
// //I think it will be easier to send the entire message string into the body when we call the helper function
const sendSMS = function (MO, MT, body) {
  client.messages.create({
    to: '+1' + MT,
    from: MO,
    body: body
  })
  .then((message) => console.log(message));
}

// module.exports = sendSMS;

// //to test this remember to install npm package. npm install twilio
// //testing
// //for DAN and LEO, MO means the originated (sender) and MT means terminated (receiver)
// //welcome to 4 years of mobile qa at samsung. if they deduct mark for this name I will make the complaint!!
const MO = '+16476998007'; //twilio
const MT = '4169106793'; //jay
const message = 'lol hi';

// // sendSMS(MO, MT, message);
