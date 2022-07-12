/* RabbitMQ */
const amqp = require('amqplib');

module.exports.publish = async (params) => {
  try {
    const amqpServer = process.env.rabbitMQ;
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();
    await channel.assertQueue('Upload');
    const videoToSend = JSON.stringify(params);
    await channel.sendToQueue('Upload', Buffer.from(videoToSend));
    console.log(`Video sent successfully to Upload queue, ${videoToSend}`);
    await channel.close();
    await connection.close();
  } catch (error) {
    const err = new Error(
      `Faild to submit the video to the upload queue. ${error}`
    );
    err.statusCode = 500;
    throw error;
  }
};
