import {Router} from 'itty-router';
import {convert} from 'html-to-text';
import './types.js';

/**
 * Generates a random ID of the specified length.
 *
 * @param {number} length - The length of the random ID to generate.
 * @return {string} - The randomly generated ID.
 */
function randomId(length) {
  const elements =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += elements[Math.floor(Math.random() * elements.length)];
  }
  return result;
}

/**
 * Converts a ReadableStream to an ArrayBuffer.
 *
 * @param {ReadableStream} stream - The ReadableStream to convert.
 * @param {number} streamSize - The size of the stream.
 * @return {Promise<Uint8Array>} The converted ArrayBuffer.
 */
async function streamToArrayBuffer(stream, streamSize) {
  const result = new Uint8Array(streamSize);
  let bytesRead = 0;
  const reader = stream.getReader();
  while (true) {
    const {done, value} = await reader.read();
    if (done) {
      break;
    }
    result.set(value, bytesRead);
    bytesRead += value.length;
  }
  return result;
}

/**
 * Parse an email message.
 *
 * @param {EmailMessage} message - The email message to be parsed.
 * @return {Promise<EmailCache>} - A promise that resolves to the ID of the saved email.
 */
async function parseEmail(message) {
  const raw = await streamToArrayBuffer(message.raw, message.rawSize);
  const PostalMime = require('postal-mime');
  // eslint-disable-next-line
  const parser = new PostalMime.default();
  const email = await parser.parse(raw);
  const id = randomId(32);
  const cache = {
    id: id,
    messageId: email.messageId,
    from: message.from,
    to: message.to,
    subject: email.subject,
  };
  if (email.html) {
    cache.html = email.html;
  }
  if (email.text) {
    cache.text = email.text;
  } else if (email.html) {
    cache.text = convert(email.html, {});
  }
  return cache;
}


/**
 * Checks if the given message can be handled based on the environment.
 *
 * @param {EmailMessage} message - The message to be checked.
 * @param {Environment} env - The environment object containing BLOCK_LIST and WHITE_LIST.
 * @return {boolean} - Returns true if the message can be handled, false otherwise.
 */
function canHandleMessage(message, env) {
  const {
    BLOCK_LIST,
    WHITE_LIST,
  } = env;
  const matchAddress = (raw, address) => {
    if (!raw) {
      return false;
    }
    let list = [];
    try {
      list = JSON.parse(raw);
    } catch (e) {
      return false;
    }
    if (!Array.isArray(list)) {
      return false;
    }
    for (const item of list) {
      const regex = new RegExp(item);
      if (regex.test(address)) {
        return true;
      }
    }
    return false;
  };

  const address = [];
  if (message.from) {
    address.push(message.from);
  }
  if (message.to) {
    address.push(message.to);
  }
  for (const addr of address) {
    if (!matchAddress(WHITE_LIST, addr)) {
      if (matchAddress(BLOCK_LIST, addr)) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Sends a Telegram API request.
 *
 * @param {string} token - The Telegram bot token.
 * @param {string} method - The API method to call.
 * @param {object} body - The JSON body of the request.
 * @return {Promise<Response>} A promise that resolves to the response from the API.
 */
async function sendTelegramRequest(token, method, body) {
  return await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}


/**
   * Sends an email message to Telegram.
   *
   * @param {EmailMessage} message - The email message to be sent.
   * @param {Environment} env - The environment variables.
   * @return {Promise<void>} A promise that resolves when the email message is sent successfully.
   */
async function sendMailToTelegram(message, env) {
  const {
    TELEGRAM_TOKEN,
    TELEGRAM_ID,
    MAIL_TTL,
    DOMAIN,
    DB,
  } = env;

  let ttl = MAIL_TTL && parseInt(MAIL_TTL, 10);
  ttl = isNaN(ttl) ? 60 * 60 * 24 : ttl;

  const mail = await parseEmail(message);
  await DB.put(mail.id, JSON.stringify(mail), {expirationTtl: ttl});

  const text = `
${mail.subject}

-----------
From\t:\t${mail.from}
To\t\t:\t${mail.to}
  `;
  const preview = `https://${DOMAIN}/email/${mail.id}?mode=text`;
  const fullHTML = `https://${DOMAIN}/email/${mail.id}?mode=html`;

  await sendTelegramRequest(TELEGRAM_TOKEN, 'sendMessage', {
    chat_id: TELEGRAM_ID,
    text: text,
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Preview',
            callback_data: `p:${mail.id}`,
          },
          {
            text: 'Text',
            url: preview,
          },
          {
            text: 'HTML',
            url: fullHTML,
          },
        ],
      ],
    },
  });
}

/**
 * Handles the incoming Telegram webhook request.
 *
 * @param {Request} req - The fetch request object.
 * @param {object} env - The environment object.
 * @return {Promise<void>} The fetch response.
 */
async function telegramWebhookHandler(req, env) {
  const {
    TELEGRAM_TOKEN,
    DB,
  } = env;
  /**
   * @type {TelegramWebhookRequest}
   */
  const body = await req.json();

  const data = body?.callback_query?.data || '';
  const chatId = body?.callback_query?.message?.chat?.id;
  const messageId = body?.callback_query?.message?.message_id;
  if (data.startsWith('p:')) {
    const id = data.substring(2);
    const value = await DB.get(id).then((value) => JSON.parse(value)).catch(() => null);
    if (value?.text) {
      await sendTelegramRequest(TELEGRAM_TOKEN, 'sendMessage', {
        chat_id: chatId,
        text: value.text.substring(0, 4096),
        disable_web_page_preview: true,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Close',
                callback_data: `d:`,
              },
            ],
          ],
        },
      });
      return;
    }
  }
  if (data === 'd:') {
    await sendTelegramRequest(TELEGRAM_TOKEN, 'deleteMessage', {
      chat_id: chatId,
      message_id: messageId,
    });
    return;
  }
  console.log(`Unknown data: ${data}`);
}

/**
 * Handles the fetch request.
 *
 * @param {Request} request - The fetch request object.
 * @param {Environment} env - The environment object.
 * @param {object} ctx - The context object.
 * @return {Promise<Response>} The fetch response.
 */
async function fetchHandler(request, env, ctx) {
  // eslint-disable-next-line
  const router = Router();
  const {
    TELEGRAM_TOKEN,
    DOMAIN,
    DB,
  } = env;

  router.get('/init', async () => {
    return sendTelegramRequest(TELEGRAM_TOKEN, 'setWebhook', {
      url: `https://${DOMAIN}/telegram/${TELEGRAM_TOKEN}/webhook`,
    });
  });

  router.post('/telegram/:token/webhook', async (req) => {
    if (req.params.token !== TELEGRAM_TOKEN) {
      return;
    }
    try {
      await telegramWebhookHandler(req, env);
    } catch (e) {
      console.error(e);
    }
    return new Response('OK');
  });

  router.get('/email/:id', async (req) => {
    const id = req.params.id;
    const mode = req.query.mode || 'text';
    const value = await DB.get(id).then((value) => JSON.parse(value)).catch(() => null);
    if (value?.[mode]) {
      const headers = {};
      switch (mode) {
        case 'html':
          headers['content-type'] = 'text/html; charset=utf-8';
          break;
        default:
          headers['content-type'] = 'text/plain; charset=utf-8';
          break;
      }
      return new Response(value[mode], {
        headers,
      });
    } else {
      return new Response('Not found', {
        status: 404,
      });
    }
  });

  router.all('*', async () => {
    return new Response('It works!');
  });

  return router.handle(request).catch((e) => {
    return new Response(e.message, {
      status: 500,
    });
  });
}

/**
 * Handles incoming email messages.
 *
 * @param {EmailMessage} message - The email message object.
 * @param {Environment} env - The environment variables.
 * @param {object} ctx - The context object.
 * @return {Promise<void>} - A promise that resolves when the email is processed.
 */
async function emailHandler(message, env, ctx) {
  const {
    FORWARD_LIST,
  } = env;

  if (!canHandleMessage(message, env)) {
    return;
  }

  try {
    await sendMailToTelegram(message, env);
  } catch (e) {
    console.error(e);
  }

  try {
    const forwardList = (FORWARD_LIST || '').split(',');
    for (const forward of forwardList) {
      try {
        await message.forward(forward.trim());
      } catch (e) {
        console.error(e);
      }
    }
  } catch (e) {
    console.error(e);
  }
}


export default {
  fetch: fetchHandler,
  email: emailHandler,
};
