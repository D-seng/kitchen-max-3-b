const S3 = require('aws-sdk/clients/s3')
const fs = require('fs')
const dotenv = require('dotenv')
const crypto = require('crypto')
require('dotenv').config()

dotenv.config({ path: 'variables.env' })

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY_2
const secretAccessKey = process.env.AWS_SECRET_KEY_2

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

async function generateDownloadUrl (fileName) {
  if (fileName) {
    return s3.getSignedUrlPromise('getObject', {
      Bucket: bucketName,
      Key: fileName,
      Expires: 3600
    })
  }
}

async function generateUploadUrl () {
  const rawBytes = await crypto.randomBytes(16)
  const imageName = rawBytes.toString('hex')
  // const imageName = 'randomimagename'
  // console.log(process.env)
  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 3600
  })
  const uploadUrl = await s3.getSignedUrlPromise('putObject', params)
  console.log(uploadUrl)
  return { uploadUrl, imageName }
}

// uploads a file to s3

// downloads a file from s3

const uploadFile = (file) => {
  const fileStream = fs.createReadStream(file.path)
  console.log('file')
  console.log(file)
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }
  return s3.upload(uploadParams).promise()
}

const getFileStream = (fileKey) => {
  const downloadParams = {
    Key: '2021-05-01T18:18:09.249Zbeach-work.jpg',
    Bucket: bucketName
  }
  return s3.getObject(downloadParams).createReadStream()
  // create arrayBuffer
}

module.exports = {
  uploadFile,
  getFileStream,
  generateUploadUrl,
  generateDownloadUrl
}
