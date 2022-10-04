import AWS from 'aws-sdk';

if (
  !process.env.AWS_SDK_ACCESS_KEY ||
  !process.env.AWS_SDK_SECRET_KEY ||
  !process.env.AWS_SDK_PRIVATE_KEY
) {
  throw new Error('aws access key, private key, or secret is missing');
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

export const cloudfrontSigner = new AWS.CloudFront.Signer(
  process.env.CLOUDFRONT_KEY_PAIR_ID,
  process.env.AWS_SDK_PRIVATE_KEY.replace(/\\n/g, '\n')
);

export const s3 = new AWS.S3({ apiVersion: '2022-09-23' });
