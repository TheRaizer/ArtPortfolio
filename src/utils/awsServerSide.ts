import AWS from 'aws-sdk';
import path from 'path';
import fs from 'fs';

if (!process.env.AWS_SDK_ACCESS_KEY || !process.env.AWS_SDK_SECRET_KEY) {
  throw new Error('aws access key or secret is missing');
}

if (!process.env.CLOUDFRONT_KEY_PAIR_ID) {
  throw new Error('cloudfront key pair id or private key is missing');
}

AWS.config.update({
  accessKeyId: process.env.AWS_SDK_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SDK_SECRET_KEY,
  region: process.env.REGION,
  signatureVersion: 'v4',
});

const cloudfrontPrivateKeyPath = path.join(process.cwd(), 'private_key.pem');
const cloudfrontPrivateKey = fs.readFileSync(cloudfrontPrivateKeyPath, 'utf-8');

export const cloudfrontSigner = new AWS.CloudFront.Signer(
  process.env.CLOUDFRONT_KEY_PAIR_ID,
  cloudfrontPrivateKey
);

export const s3 = new AWS.S3({ apiVersion: '2022-09-23' });
