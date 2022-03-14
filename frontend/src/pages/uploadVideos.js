import React, { useState } from 'react';
// import AWS from 'aws-sdk';
import { connect } from 'mqtt';
const S3_BUCKET = 'sris';
const REGION = 'us-east-2';

// AWS.config.update({
//   accessKeyId: null,
//   secretAccessKey: null,
// });

// const myBucket = new AWS.S3({
//   params: { Bucket: S3_BUCKET },
//   region: REGION,
// });

const UploadImageToS3WithNativeSdk = () => {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = async (file) => {
    try {
      const amqpServer =
        'amqps://eruaznuc:5M0l6vzd4hZqSbcXPnokAeOtC4Uzk78u@woodpecker.rmq.cloudamqp.com/eruaznuc';
      const options = {
        protocol: 'mqtt',
        port: 1883,
        username: 'eruaznuc:eruaznuc',
        password: '5M0l6vzd4hZqSbcXPnokAeOtC4Uzk78u',
        // hostname: 'woodpecker.rmq.cloudamqp.com',
      };

      const client = await connect(amqpServer, options);
      console.log('connected');
      await client.publish('Videos', 'hello!');
      console.log('published');
      client.end();
    } catch (error) {
      // console.log(error);
      // const err = new Error('Faild to submit the interview to the AI.');
      // err.statusCode = 500;
      throw error;
    }
  };

  return (
    <div>
      <div>Native SDK File Upload Progress is {progress}%</div>
      <input type="file" onChange={handleFileInput} />
      <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
    </div>
  );
};

export default UploadImageToS3WithNativeSdk;
