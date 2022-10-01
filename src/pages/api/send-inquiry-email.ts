import { StatusCodes } from 'http-status-codes';
import { fetchAPI, generateRes } from '../../utils/api';
import { NextApiResponse } from 'next';
import { DetailData } from '../../../types/utils/api.type';
import { ExtendedNextApiRequest } from '../../../types/pages/api/ExtendedNextApiRequest.type';
import { SendInquiryEmailBody } from '../../../types/pages/api/send-inquiry-email.type';
import sanitizeHtml from 'sanitize-html';
import { Ratelimit } from '@upstash/ratelimit';
import { redis } from '../../utils/redis';
import { withRatelimit } from '../../utils/middleware/withRatelimit';

/**
 * Formats and sanitizes a message that will be sent to the email of the website owner.
 * @param message: the message that will be sent.
 * @param senderName: the message sender's name.
 * @param senderEmail: the message sender's email.
 * @returns a formatted and sanitized string in html format that will be sent through email.
 */
const formatAndSanitizeMessage = (
  message: string,
  senderName: string,
  senderEmail: string
): string => {
  // split the message at each line break and wrap each new line in a <p> tag.
  const messageParagraphs = message.split('\n');
  const messageParagraphElements = messageParagraphs.reduce(
    (acc, curr) => acc + `<p>${curr}</p>`,
    ''
  );

  // format the message into its proper html format
  const formattedMessage = `
          <div>
            <p><strong>Sender Name:</strong> ${senderName}</p>
            <p><strong>Sender Email:</strong> ${senderEmail}</p>
            <p><strong>Message:</strong></p> 
            ${messageParagraphElements}
          </div>`;

  // sanitize the formatted message
  const sanitizedMessage = sanitizeHtml(formattedMessage);

  return sanitizedMessage;
};

const sendInquiryEmailHandler = async (
  req: ExtendedNextApiRequest<SendInquiryEmailBody>,
  res: NextApiResponse
) => {
  if (req.method !== 'POST')
    return generateRes<DetailData>(res, StatusCodes.BAD_REQUEST, {
      ok: false,
      detail: 'incorrect method',
    });

  if (!req.body.sender_name || !req.body.email || !req.body.message)
    return generateRes<DetailData>(res, StatusCodes.BAD_REQUEST, {
      ok: false,
      detail: 'body is missing a property',
    });

  const formattedAndSanitizedMessage = formatAndSanitizeMessage(
    req.body.message,
    req.body.sender_name,
    req.body.email
  );

  const { res: emailRes, data } = await fetchAPI(
    'https://emailapi.netcorecloud.net/v5/mail/send',
    'POST',
    {
      from: {
        email: process.env.SMTP_FROM_EMAIL,
        name: `Portfolio Website Inquiry from ${req.body.sender_name}`,
      },
      subject: 'Inquiry',
      content: [
        {
          type: 'html',
          value: formattedAndSanitizedMessage,
        },
      ],
      personalizations: [{ to: [{ email: process.env.SMTP_TO_EMAIL }] }],
    },
    {
      headers: {
        api_key: process.env.PEPIPOST_API_KEY as string,
        'content-type': 'application/json',
      },
    }
  );

  if (emailRes.ok)
    return generateRes<DetailData>(res, StatusCodes.OK, {
      ok: true,
    });
  else {
    console.log(data);
    return generateRes<DetailData>(res, StatusCodes.OK, {
      ok: false,
      detail: 'Email failed to send',
    });
  }
};

// Create a new ratelimiter, that allows 1 request per 60 seconds
const ratelimiter = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(1, '60 s'),
});

export default withRatelimit<DetailData>(
  ratelimiter,
  sendInquiryEmailHandler,
  {}
);
