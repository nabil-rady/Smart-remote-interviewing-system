/* RabbitMQ */
const amqp = require('amqplib');

module.exports.consume = async () => {
  try {
    const amqpServer = process.env.rabbitMQ;
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();
    await channel.assertQueue('Results');
    channel.consume(
      'Results',
      (message) => {
        const result = JSON.parse(message.content.toString());
        console.log(
          `###############\n${result.interviewId}\n###############\n arrived`
        );
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
