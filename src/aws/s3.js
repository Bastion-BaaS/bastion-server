// Module that talks to S3
const aws = require('aws-sdk');
const fs = require('fs');
const AWSConfig = {
  accessKeyId: 'AKIATUAONRNAZUELB476',
  accessSecretKey: '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',
  region: "us-east-1"
};
aws.config.update(AWSConfig);
const S3 = new aws.S3();
const multer = require('multer');
const multerS3 = require('multer-s3');

const config = require('../utils/config');
// const bucketName = config.BUCKET_NAME;
// Temporary for development
const bucketName = 'testing-something-important-alican-123519aba2';

const uploadFile = multer({
  storage: multerS3({
    s3: S3,
    bucket: bucketName,
    key: (req, file, cb) => {
      cb(null, `/file${file.originalname}`);
    }
  })
});

const removeFile = async (fileName) => {
  const params = {
    Bucket: bucketName,
    Key: `files/${fileName}`
  };

  try {
    const result = S3Client.send(new DeleteObjectCommand(params));
    console.log('File removed: ', result);
    return result;
  } catch (err) {
    console.log('Error: ', err);
    return err
  }
}

module.exports = { uploadFile, removeFile };
