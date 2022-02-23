/* RabbitMQ */
const amqp = require('amqplib');

module.exports.publish = async (interviewId) => {
  try {
    const amqpServer = process.env.rabbitMQ;
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();
    await channel.assertQueue('Interviews');
    const interview = JSON.stringify(interviewId);
    await channel.sendToQueue('Interviews', Buffer.from(interview));
    console.log(`Interview sent successfully ${interview}`);
    await channel.close();
    await connection.close();
  } catch (error) {
    const err = new Error('Faild to submit the interview to the AI.');
    err.statusCode = 500;
    throw err;
  }
};
