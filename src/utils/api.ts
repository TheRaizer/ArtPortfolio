import type { RatelimitResponse } from '@upstash/ratelimit/types/types';
import { StatusCodes } from 'http-status-codes';
import { NextApiResponse } from 'next';
import { Method } from '../../types/utils/api.type';

/**
 * Fetch function for the front end to access the api correctly.
 * @param url - the url for the api
 * @param method - the type of method to assign to the request
 * @param body - the body of the request
 * @param options - other request options
 * @returns the data and response returned from the request
 */
export const fetchAPI = async <T, S = unknown>(
  url: string,
  method: Method,
  body?: S,
  options?: RequestInit
): Promise<{ data: T; res: Response }> => {
  const headers = {
    ...options?.headers,
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  };

  try {
    const res = await fetch(url, {
      ...options,
      body: JSON.stringify(body),
      method: method,
      headers,
    });

    const data: T = (await res.json()) as T;
    return { data, res };
  } catch (err: unknown) {
    console.error(err);
    throw new Error('request failed: ' + (err as { message: string }).message);
  }
};

export const fetchNextAPI = async <T, S = unknown>(
  url: string,
  method: Method,
  body?: S,
  options?: RequestInit
): Promise<{ data: T; res: Response }> => {
  return fetchAPI(`/api/${url}`, method, body, options);
};

export const generateRes = <T>(
  res: NextApiResponse,
  statusCode: StatusCodes,
  data: T
) => {
  return res.status(statusCode).json(data);
};

export const setRatelimitResHeader = (
  result: RatelimitResponse,
  res: NextApiResponse
) => {
  res.setHeader('X-RateLimit-Limit', result.limit);
  res.setHeader('X-RateLimit-Remaining', result.remaining);
};
