/* RabbitMQ */
const amqp = require('amqplib');

const Video = require('../models/video');
const Keywords = require('../models/keyword');

const { PutObjectCommand } = require('@aws-sdk/client-s3');
const S3Client = require('../utils/s3');
const Interview = require('../models/interview');

const publish = require('./publish-videos-queue').publish;

module.exports.consume = async () => {
  try {
    const amqpServer = process.env.rabbitMQ;
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();
    await channel.assertQueue('Upload');
    channel.consume(
      'Upload',
      async (message) => {
        const data = JSON.parse(message.content.toString());
        console.log(
          `###############\n${data.params.Key}\n###############\n TO UPLOAD`
        );

        // UPLOAD TO AWS
        const results = await S3Client.send(new PutObjectCommand(data.params));
        console.log(
          'Successfully created ' +
            data.params.Key +
            ' and uploaded it to ' +
            data.params.Bucket +
            '/' +
            data.params.Key
        );

        const link = `https://sris.s3.us-east-2.amazonaws.com/${params.key}`;

        // save the video
        await Video.create({
          link,
          questionId: data.questionId,
          interviewId: data.interviewId,
        });
        // get the question's keywords
        const keywords = await Keywords.findAll({
          where: {
            questionId: data.questionId,
          },
        });

        // put the video on the queue for AI
        const videoToSend = {
          interviewId: data.interviewId,
          questionId: data.questionId,
          link,
          keywords: keywords.map((keyword) => keyword.dataValues.value),
          lastVideo: data.lastVideo,
        };

        // publish the video to the message queue
        await publish(videoToSend);
        if (data.lastVideo) {
          // set the submission date
          await Interview.update(
            {
              submitedAt: Date.now(),
            },
            {
              where: {
                interviewId: data.interviewId,
              },
            }
          );
        }
      },
      {
        noAck: true,
      }
    );

    console.log(`Waiting for videos to upload...`);
  } catch (error) {
    const err = new Error(`Faild to listen for Upload queue ${error}`);
    err.statusCode = 500;
    throw err;
  }
};
