import { StatusCodes } from 'http-status-codes';
import { fetchAPI, generateRes } from './../../utils/api';
import { NextApiResponse, NextApiRequest } from 'next';
import { DetailData } from '../../../types/utils/api.type';
import { createTransport } from 'nodemailer';

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

  const { res: emailRes, data } = await fetchAPI(
    'https://emailapi.netcorecloud.net/v5/mail/send',
    'POST',
    {
      from: {
        email: 'confirmation@pepisandbox.com',
        name: 'Flight confirmation',
      },
      subject: 'Your Barcelona flight e-ticket : BCN2118050657714',
      content: [
        {
          type: 'html',
          value: 'Hello Lionel, Your flight for Barcelona is confirmed.',
        },
      ],
      personalizations: [
        { to: [{ email: 'aidan.fu000@gmail.com', name: 'Aidan Fu' }] },
      ],
    },
    {
      headers: {
        api_key: process.env.PEPSICO_API_KEY,
        'content-type': 'application/json',
      },
    }
  );

  console.log(emailRes);

  return generateRes<DetailData>(res, StatusCodes.OK, {
    ok: true,
  });
};

export default artPiecesHandler;
