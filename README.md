# Fake Art Portfolio - Nextjs

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

  

## Getting Started

  

First, run the development server:

  

```bash

npm run dev

# or

yarn dev

```

  

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

  

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

  

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

  

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

  

## Services in Use
### 1. AWS S3
The S3 service is used to store the images of art.

### 2. AWS Cloudfront
The Cloudfront service is used to serve the S3 images at edge locations and cache responses. We use a public-private key pair to secure the endpoint. It is also setup with the S3 bucket containing the artwork.

### 3. Pepipost SMTP API
The SMTP API allows the website to send emails to the portfolio owner.

### 4. Upstash Serverless Redis
Used to rate limit NextJs API routes.

## ENV variables
Public:
- ART_PIECES_BUCKET is the name of the S3 bucket holding the art pieces to show
- REGION is the region of your AWS services
- CLOUDFRONT_ENDPOINT is the domain name for your cloudfront distribution
- SMTP_FROM_EMAIL is the email that the SMTP api will send inquiries from
- SMTP_TO_EMAIL is the email that the SMTP api will send inquiries too
- UPSTASH_REDIS_REST_URL is the REST API url that upstash provides to initialize their SDK 

Private:
- AWS_SDK_ACCESS_KEY is the access key AWS provides so you can initialize the JS SDK
- AWS_SDK_SECRET_KEY is the secret key AWS provides so you can initialize the JS SDK
- CLOUDFRONT_KEY_PAIR_ID is the public key id used in the public-private key pairing
- PEPIPOST_API_KEY the api key given from Pepipost that allows sending of emails
- UPSTASH_REDIS_REST_TOKEN the rest token upstash provides to initialize their SDK 
- AWS_SDK_PRIVATE_KEY the private key that corrosponds to the public key registered in Cloudfront. It should be in RSA format however '\n' replaces every line break. Thus you are left with something in the following format:
```javascript
"-----BEGIN PRIVATE KEY-----\nflkdflkdf...\n-----END PRIVATE KEY-----"
```


