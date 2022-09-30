import { StatusCodes } from 'http-status-codes';
import { fetchAPI, generateRes } from './../../utils/api';
import { NextApiResponse, NextApiRequest } from 'next';
import { DetailData } from '../../../types/utils/api.type';

const artPiecesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET')
    return generateRes<DetailData>(res, StatusCodes.BAD_REQUEST, {
      ok: false,
      detail: 'incorrect method',
    });

  if (
    !process.env.SMTP_PORT ||
    !process.env.SMTP_HOST ||
    !process.env.PEPSICO_API_KEY ||
    !process.env.SMTP_EMAIL
  )
    return generateRes<DetailData>(res, StatusCodes.INTERNAL_SERVER_ERROR, {
      ok: false,
      detail: 'Missing SMTP port or host',
    });

  //TODO: format this email differently and use data sent into the next request objects body (extend next api request type to use body type)
  //TODO: obtain domain and use it to host netcore email SMTP server.
  const { res: emailRes, data } = await fetchAPI(
    'https://emailapi.netcorecloud.net/v5/mail/send',
    'POST',
    {
      from: {
        email: 'info@pepisandbox.com',
        name: 'Flight confirmation',
      },
      subject: 'Your Barcelona flight e-ticket : BCN2118050657714',
      content: [
        {
          type: 'html',
          value: 'Hello Lionel, Your flight for Barcelona is confirmed.',
        },
      ],
      personalizations: [{ to: [{ email: 'finalfantasyflips@gmail.com' }] }],
    },
    {
      headers: {
        api_key: process.env.PEPSICO_API_KEY,
        'content-type': 'application/json',
      },
    }
  );

  console.log(data);
  console.log(emailRes);

  return generateRes<DetailData>(res, StatusCodes.OK, {
    ok: true,
  });
};

export default artPiecesHandler;
