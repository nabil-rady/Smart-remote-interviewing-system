/* RabbitMQ */
const amqp = require('amqplib');

const Interview = require('../models/interview');
const User = require('../models/user');
const JobListing = require('../models/jobListing');
const RegistartionToken = require('../models/registrationToken');
const Notification = require('../models/notification');

module.exports.consume = async () => {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    const amqpServer = process.env.rabbitMQ;
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();
    await channel.assertQueue('Videos');
    channel.consume(
      'Videos',
      async (message) => {
        const answer = JSON.parse(message.content.toString());
        console.log(
          answer.interviewId,
          answer.questionId,
          answer.video,
          answer.lastVideo
        );

        // UPLOAD TO AWS
      },
      {
        noAck: true,
      }
    );

    console.log(`Waiting for interview answers...`);
  } catch (error) {
    const err = new Error(`Faild to listen for Videos queue ${error}`);
    err.statusCode = 500;
    throw err;
  }
};
