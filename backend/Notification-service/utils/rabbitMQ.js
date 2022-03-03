/* RabbitMQ */
const amqp = require('amqplib');
const admin = require('firebase-admin');
const serviceAccount = require('./vividly-notification-firebase-adminsdk-tjcu9-cd989f4539.json');

const Interview = require('../models/interview');
const User = require('../models/user');
const JobListing = require('../models/jobListing');
const RegistartionToken = require('../models/registrationToken');

module.exports.consume = async () => {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    const amqpServer = process.env.rabbitMQ;
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();
    await channel.assertQueue('Results');
    channel.consume(
      'Results',
      async (message) => {
        const result = JSON.parse(message.content.toString());
        console.log(
          `###############\n${result.interviewId}\n###############\n arrived`
        );

        const interview = await Interview.findOne({
          where: {
            interviewId: result.interviewId,
          },
        });

        const jobListing = await JobListing.findOne({
          where: {
            jobListingId: interview.dataValues.jobListingId,
          },
        });

        const user = await User.findOne({
          where: {
            userId: jobListing.dataValues.userId,
          },
        });

        const fetchedRegistrationTokens = await RegistartionToken.findAll({
          where: {
            userId: user.dataValues.userId,
          },
        });

        const registrationTokens = fetchedRegistrationTokens.map(
          (token) => token.dataValues.token
        );

        // const registrationTokens = 'eWlqQ6xC7Ot7Vyo1KyQYNZ:APA91bFFD_WdwoyAkR39Ix4UZHJVldySqTPPMQ2QB8GegI_jnTOE5Xw31Vg0Xh1MeRjU4HSxGycYtbeBRETp_TSMKc-pbjHu2LT_4NxVlgaK-5TQoVXH0dPbAUHLkNeMCcbwG_b4Ik1V';

        const notification = {
          notification: {
            title: 'Interview result!!',
            body: `${interview.dataValues.name} interview for ${jobListing.dataValues.positionName} position has been processed.`,
          },
        };

        admin
          .messaging()
          .sendToDevice(registrationTokens, notification)
          .then((response) => {
            console.log('Successfully sent message:', response);
          })
          .catch((error) => {
            console.log('Error sending message:', error);
          });

        // Save to data base
      },
      {
        noAck: true,
      }
    );

    console.log(`Waiting for interview results...`);
  } catch (error) {
    const err = new Error(`Faild to listen for Results queue ${error}`);
    err.statusCode = 500;
    throw err;
  }
};