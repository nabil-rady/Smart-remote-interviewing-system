/* RabbitMQ */
const amqp = require('amqplib');
const admin = require('firebase-admin');
const serviceAccount = require('./vividly-notification-firebase-adminsdk-tjcu9-cd989f4539.json');

const Interview = require('../models/interview');
const User = require('../models/user');
const JobListing = require('../models/jobListing');
const RegistartionToken = require('../models/registrationToken');
const Notification = require('../models/notification');
const Result = require('../models/result');

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
        const data = JSON.parse(message.content.toString());
        console.log(
          `###############\n${data.interviewId}\n###############\n arrived`
        );

        // SAVE THE RESULT

        const result = await Result.create({
          interviewId: data.interviewId,
          questionId: data.questionId,
          recommendation: data.recommendation.toFixed(2),
          openPose: data.openPose.toFixed(2),
          happy: data.emotions.Happy.toFixed(2),
          sad: data.emotions.Sad.toFixed(2),
          neutral: data.emotions.Neutral.toFixed(2),
          angry: data.emotions.Angry.toFixed(2),
          surprise: data.emotions.Surprise.toFixed(2),
        });

        // When receive the result of last video of the interview => add avg. for ML results, send notification
        if (data.lastVideo) {
          const interview = await Interview.findOne({
            where: {
              interviewId: data.interviewId,
            },
          });

          // set avg. results
          const results = await Result.findAll({
            where: {
              interviewId: data.interviewId,
            },
          });
          let avgRecommendation = 0,
            avgOpenPose = 0,
            avgHappy = 0,
            avgSad = 0,
            avgSurprise = 0,
            avgAngry = 0,
            avgNeutral = 0;
          for (const r of results) {
            avgRecommendation += r.dataValues.recommendation;
            avgOpenPose += r.dataValues.openPose;
            avgHappy += r.dataValues.happy;
            avgSad += r.dataValues.sad;
            avgSurprise += r.dataValues.surprise;
            avgNeutral += r.dataValues.neutral;
            avgAngry += r.dataValues.angry;
          }
          const numOfResults = results.length;
          avgRecommendation /= numOfResults;
          avgOpenPose /= numOfResults;
          avgHappy /= numOfResults;
          avgSad /= numOfResults;
          avgSurprise /= numOfResults;
          avgNeutral /= numOfResults;
          avgAngry /= numOfResults;

          interview.avgRecommendation = avgRecommendation.toFixed(2);
          interview.avgOpenPose = avgOpenPose.toFixed(2);
          interview.avgHappy = avgHappy.toFixed(2);
          interview.avgSad = avgSad.toFixed(2);
          interview.avgSurprise = avgSurprise.toFixed(2);
          interview.avgNeutral = avgNeutral.toFixed(2);
          interview.avgAngry = avgAngry.toFixed(2);
          interview.processed = true;
          await interview.save();

          // send notification
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

          const title = 'Interview result.';
          const body = `${interview.dataValues.name} interview for ${jobListing.dataValues.positionName} position has been processed.`;
          const pushNotification = {
            notification: {
              title: title,
              body: body,
            },
          };

          // save notification into database.
          const notification = await Notification.create({
            userId: user.dataValues.userId,
            interviewId: interview.dataValues.interviewId,
            title,
            body,
          });

          // send push notification
          admin
            .messaging()
            .sendToDevice(registrationTokens, pushNotification)
            .then((response) => {
              console.log('Successfully sent message:', response);
            })
            .catch((error) => {
              console.log('Error sending message:', error);
            });
        }
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
