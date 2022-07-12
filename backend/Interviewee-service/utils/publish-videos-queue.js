/* RabbitMQ */
const amqp = require('amqplib');

module.exports.publish = async (video) => {
  try {
    const amqpServer = process.env.rabbitMQ;
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();
    await channel.assertQueue('Videos');
    const videoToSend = JSON.stringify(video);
    await channel.sendToQueue('Videos', Buffer.from(videoToSend));
    console.log(`Video sent successfully ${videoToSend}`);
    await channel.close();
    await connection.close();
  } catch (error) {
    const err = new Error(`Faild to submit the video to the AI. ${error}`);
    err.statusCode = 500;
    throw error;
  }
};
