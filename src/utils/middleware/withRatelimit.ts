import { Ratelimit } from '@upstash/ratelimit';
import { StatusCodes } from 'http-status-codes';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { getClientIp } from 'request-ip';
import { DetailData } from '../../../types/utils/api.type';
import { generateRes, setRatelimitResHeader } from '../api';

export const withRatelimit = <T extends DetailData>(
  ratelimiter: Ratelimit,
  handler: NextApiHandler,
  dataOnRateLimited: Partial<T>
): NextApiHandler => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const ip = getClientIp(req);
    const result = await ratelimiter.limit(ip || '');
    setRatelimitResHeader(result, res);

    if (!result.success) {
      return generateRes<Partial<T>>(res, StatusCodes.TOO_MANY_REQUESTS, {
        ...dataOnRateLimited,
        ok: false,
        detail: 'you are being rate limited',
      });
    }

    return handler(req, res);
  };
};
