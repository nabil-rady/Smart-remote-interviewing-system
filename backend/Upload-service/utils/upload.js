/* RabbitMQ */
const amqp = require('amqplib');

const publish = require('./publish').publish;

const Interview = require('../models/interview');
const Video = require('../models/video');
const Keywords = require('../models/keyword');

module.exports.upload = async () => {
  try {
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

        // get the interview
        const interview = await Interview.findOne({
          where: {
            interviewId: answer.interviewId,
          },
        });
        // if the interview does not exist
        if (!interview) {
          const err = new Error('Interview not found');
          err.statusCode = 404;
          throw err;
        }

        // check if this interview has been submited before
        // if (interview.dataValues.submitedAt) {
        //   const err = new Error('This interview has been submited before');
        //   err.statusCode = 403;
        //   throw err;
        // }

        // UPLOAD TO AWS AND GET THE LINK

        // save the video
        await Video.create({
          link: videoLink,
          questionId: answer.questionId,
          interviewId: answer.interviewId,
        });

        // if this is the last video, put the interview on processing queue
        if (answer.lastVideo) {
          let interviewToPublish = {
            interviewId: answer.interviewId,
            questions: [],
          };

          // get the answers
          const answers = await Video.findAll({
            where: {
              interviewId: answer.interviewId,
            },
          });

          for (const video of answers) {
            const keywords = await Keywords.findAll({
              where: {
                questionId: video.dataValues.questionId,
              },
            });
            interviewToPublish.questions.push({
              questionId: video.dataValues.questionId,
              videoLink: video.dataValues.link,
              keywords: keywords.map((k) => {
                return k.value;
              }),
            });
          }

          console.log(interviewToPublish);

          // set the submission date
          interview.submitedAt = Date.now();
          await interview.save();

          // publish the interview to the message queue
          await publish(interviewToPublish);
        }
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
