import { StatusCodes } from 'http-status-codes';
import { enableFetchMocks } from 'jest-fetch-mock';
import { NextApiResponse } from 'next';
import { RatelimitResponse } from '@upstash/ratelimit/types/types';

enableFetchMocks();

import {
  fetchAPI,
  fetchNextAPI,
  generateRes,
  setRatelimitResHeader,
} from '../../utils/api';
import { Method } from '../../../types/utils/api.type';

type FetchMockData = {
  url: string;
  init: RequestInit;
};

const fetchAPIParams: { url: string; method: Method; objectData: unknown }[] = [
  {
    url: '/request-url',
    method: 'GET',
    objectData: { property_1: 'hi', property_2: 'there' },
  },
  {
    url: 'some-url/col',
    method: 'POST',
    objectData: { prop_1: 121, someNumber: 11 },
  },
  {
    url: '/interesting/test/url',
    method: 'PUT',
    objectData: { var: { month: 'jan', air: 'good' }, value: 22.3 },
  },
];

describe('api', () => {
  beforeEach(() => {
    fetchMock.mockImplementation(
      jest.fn((url: string, init: RequestInit) =>
        Promise.resolve({
          json: () => Promise.resolve({ url: url, init: init }),
        })
      ) as jest.Mock
    );
  });

  afterEach(() => {
    fetchMock.mockClear();
  });

  describe('fetchAPI', () => {
    it('should make a request with the proper format', async () => {
      for (let i = 0; i < fetchAPIParams.length; i++) {
        const fetchAPIParam = fetchAPIParams[i];

        const { data } = await fetchAPI<FetchMockData>(
          fetchAPIParam.url,
          fetchAPIParam.method,
          fetchAPIParam.objectData
        );

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(data.url).toStrictEqual(fetchAPIParam.url);
        expect(JSON.parse(data.init.body as string)).toStrictEqual(
          fetchAPIParam.objectData
        );
        expect(
          (data.init.headers as Record<string, string>)['Content-Type']
        ).toStrictEqual('application/json; charset=utf-8');

        fetchMock.mockClear();
      }
    });
  });

  describe('fetchNextAPI', () => {
    it('should make a request with the proper format', async () => {
      for (let i = 0; i < fetchAPIParams.length; i++) {
        const fetchAPIParam = fetchAPIParams[i];

        const { data } = await fetchNextAPI<FetchMockData>(
          fetchAPIParam.url,
          fetchAPIParam.method,
          fetchAPIParam.objectData
        );

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(data.url).toStrictEqual('/api/' + fetchAPIParam.url);
        expect(JSON.parse(data.init.body as string)).toStrictEqual(
          fetchAPIParam.objectData
        );
        expect(
          (data.init.headers as Record<string, string>)['Content-Type']
        ).toStrictEqual('application/json; charset=utf-8');

        fetchMock.mockClear();
      }
    });
  });

  describe('generateRes', () => {
    const datas = [
      {
        objectData: { property_1: 'hi', property_2: 'there' },
        statusCode: StatusCodes.OK,
      },
      {
        objectData: { property_test: 'a thing', a_key: 1 },
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      },
      {
        objectData: { data_1: { season: 'fall' }, temperature: 2.3 },
        statusCode: StatusCodes.ACCEPTED,
      },
    ];

    const jsonMock = jest.fn();
    const statusMock = jest.fn(() => ({ json: jsonMock }));

    const res = {
      status: statusMock,
    };

    it('should modify response status code with the given status code', () => {
      datas.forEach((data) => {
        generateRes(
          res as unknown as NextApiResponse,
          data.statusCode,
          data.objectData
        );

        expect(statusMock).toHaveBeenCalledTimes(1);
        expect(statusMock).toHaveBeenCalledWith(data.statusCode);

        jsonMock.mockClear();
        statusMock.mockClear();
      });
    });

    it('should call .json() function with the given data', () => {
      datas.forEach((data) => {
        generateRes(
          res as unknown as NextApiResponse,
          data.statusCode,
          data.objectData
        );

        expect(jsonMock).toHaveBeenCalledTimes(1);
        expect(jsonMock).toHaveBeenCalledWith(data.objectData);

        jsonMock.mockClear();
        statusMock.mockClear();
      });
    });
  });

  describe('setRatelimitResHeader', () => {
    it('should set the proper response headers', () => {
      const setHeaderMock = jest.fn();
      const res = {
        setHeader: setHeaderMock,
      };

      const ratelimitResults = [
        {
          limit: 5,
          remaining: 2,
        },
        {
          limit: 200,
          remaining: 18,
        },
        {
          limit: 33,
          remaining: -1,
        },
      ];

      ratelimitResults.forEach((ratelimitResult) => {
        setRatelimitResHeader(
          ratelimitResult as unknown as RatelimitResponse,
          res as unknown as NextApiResponse
        );

        expect(setHeaderMock).toHaveBeenCalledTimes(2);
        expect(setHeaderMock).toHaveBeenCalledWith(
          'X-RateLimit-Limit',
          ratelimitResult.limit
        );
        expect(setHeaderMock).toHaveBeenCalledWith(
          'X-RateLimit-Remaining',
          ratelimitResult.remaining
        );

        setHeaderMock.mockClear();
      });
    });
  });
});
