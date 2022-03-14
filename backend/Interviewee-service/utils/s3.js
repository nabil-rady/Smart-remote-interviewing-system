const { S3Client } = require('@aws-sdk/client-s3');

const S3_CLIENT = new S3Client({
  region: 'us-east-2',
  credentials: {
    accessKeyId: process.env.AWSAccessKey,
    secretAccessKey: process.env.AWSSecretKey,
  },
});

module.exports = S3_CLIENT;
