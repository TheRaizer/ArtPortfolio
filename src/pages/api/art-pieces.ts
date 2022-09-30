import { StatusCodes } from 'http-status-codes';
import { ArtPiecesData } from './../../../types/utils/api.type';
import { generateRes } from './../../utils/api';
import { NextApiResponse, NextApiRequest } from 'next';
import { cloudfrontSigner, s3 } from '../../utils/awsServerSide';

const artPiecesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { next_continuation_token, page_size } = req.query;

  if (req.method !== 'GET')
    return generateRes<ArtPiecesData>(res, StatusCodes.BAD_REQUEST, {
      ok: false,
      detail: 'incorrect method',
      urls: [],
    });

  // wrap in promise and use resolve and reject since the response will be generated in a callback function.
  return new Promise<void>((resolve, reject) => {
    if (!process.env.ART_PIECES_BUCKET || !process.env.CLOUDFRONT_ENDPOINT) {
      generateRes<ArtPiecesData>(res, StatusCodes.INTERNAL_SERVER_ERROR, {
        ok: false,
        detail: 'env is missing variables',
        urls: [],
      });
      reject();
      return;
    }

    s3.listObjectsV2(
      {
        Bucket: process.env.ART_PIECES_BUCKET,
        ContinuationToken: next_continuation_token as string,
        MaxKeys: parseInt(page_size as string),
      },
      (err, data) => {
        if (err) {
          console.log(err);
          generateRes<ArtPiecesData>(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            ok: false,
            detail: 'error fetching object list',
            urls: [],
          });
          reject();
          return;
        }

        if (!data.Contents) {
          generateRes<ArtPiecesData>(res, StatusCodes.NO_CONTENT, {
            ok: true,
            urls: [],
          });
          resolve();
          return;
        }

        const artPieceKeys = data.Contents.map((content) => content.Key || '');

        // cloud front presigned url will expire 5 minutes after its generated.
        // expires is in seconds, Date.now() is in milliseconds, so we divide by 1000.
        const expires = Math.round(Date.now() / 1000 + 60 * 5);

        const signedUrls = artPieceKeys.map((key) => {
          return cloudfrontSigner.getSignedUrl({
            url: (process.env.CLOUDFRONT_ENDPOINT as string) + '/' + key,
            expires,
          });
        });

        generateRes<ArtPiecesData>(res, StatusCodes.OK, {
          ok: true,
          urls: signedUrls,
          nextContinuationToken: data.NextContinuationToken,
        });
        resolve();
      }
    );
  });
};

export default artPiecesHandler;
