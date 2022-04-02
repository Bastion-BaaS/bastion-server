const aws = require('aws-sdk');
const S3 = new aws.S3();

const config = require('../utils/config');
const bucketName = config.FILE_BUCKET_NAME;

const uploadFile = async (file, fileName) => {
  const uploadOptions = {
    Bucket: bucketName,
    Key: `${fileName}`,
    Body: file,
  }
  return S3.upload(uploadOptions).promise();
};

const removeFile = async (fileName) => {
  const params = {
    Bucket: bucketName,
    Key: `${fileName}`
  };

  return S3.deleteObject(params).promise();
};

const downloadFile = async (fileName) => {
  const downloadOptions = {
    Bucket: bucketName,
    Key: `${fileName}`
  };

  return S3.getObject(downloadOptions).promise();
}

module.exports = { uploadFile, removeFile, downloadFile };
