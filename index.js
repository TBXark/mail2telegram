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
 * Render the email list  mode.
 *
 * @param {EmailCache} mail - The email object.
 * @param {Environment} env - The environment object.
 * @return {Promise<TelegramSendMessageRequest>} The rendered email list mode object.
 */
async function renderEmailListMode(mail, env) {
  const {
    OPENAI_API_KEY,
    DOMAIN,
  } = env;

  const text = `
${mail.subject}

-----------
From\t:\t${mail.from}
To\t\t:\t${mail.to}
  `;
  const preview = `https://${DOMAIN}/email/${mail.id}?mode=text`;
  const fullHTML = `https://${DOMAIN}/email/${mail.id}?mode=html`;
  const keyboard = [
    {
      text: 'Preview',
      callback_data: `p:${mail.id}`,
    },
    {
      text: 'Summary',
      callback_data: `s:${mail.id}`,
    },
    {
      text: 'Text',
      url: preview,
    },
    {
      text: 'HTML',
      url: fullHTML,
    },
  ];

  if (!OPENAI_API_KEY) {
    keyboard.splice(1, 1);
  }
  return {
    text: text,
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: [keyboard],
    },
  };
}

/**
 * Render the email detail.
 *
 * @param {string} text - The email text.
 * @param {string} id - The email ID.
 * @return {TelegramSendMessageRequest} - The rendered email detail.
 */
function renderEmailDetail(text, id) {
  return {
    text: text,
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Back',
            callback_data: `l:${id}`,
          },
        ],
      ],
    },
  };
}

/**
 * Render the email preview  mode.
 *
 * @param {EmailCache} mail - The email object.
 * @param {Environment} env - The environment object.
 * @return {Promise<TelegramSendMessageRequest>} The rendered email list mode object. */
async function renderEmailPreviewMode(mail, env) {
  return renderEmailDetail(mail.text.substring(0, 4096), mail.id);
}

/**
 * Render the email summary  mode.
 *
 * @param {EmailCache} mail - The email object.
 * @param {Environment} env - The environment object.
 * @return {Promise<TelegramSendMessageRequest>} The rendered email list mode object.
 */
async function renderEmailSummaryMode(mail, env) {
  let {
    OPENAI_API_KEY: key,
    OPENAI_COMPLETIONS_API: endpoint,
    OPENAI_CHAT_MODEL: model,
    SUMMARY_TARGET_LANG: targetLang,
  } = env;
  const req = renderEmailDetail('', mail.id);
  endpoint = endpoint || 'https://api.openai.com/v1/chat/completions';
  model = model || 'gpt-3.5-turbo';
  targetLang = targetLang || 'english';
  const prompt = `Summarize the following text in approximately 50 words with ${targetLang}\n\n${mail.text}`;
  req.text = await sendOpenAIRequest(key, endpoint, model, prompt);
  return req;
}


/**
 * Sends a Telegram API request.
 *
 * @param {string} token - The Telegram bot token.
 * @param {string} method - The API method to call.
 * @param {object} body - The JSON body of the request.
 * @return {Promise<void>} A promise that resolves to the response from the API.
 */
async function sendTelegramRequest(token, method, body) {
  const resp = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const result = await resp.json();
  console.log(`Response from Telegram API: ${method}\n${JSON.stringify(result)}`);
}


/**
 * Sends a request to the OpenAI API and returns the first choice.
 *
 * @param {string} key - The API key for authentication.
 * @param {string} endpoint - The endpoint URL for the OpenAI API.
 * @param {string} model - The name of the model to use for completion.
 * @param {string} prompt - The user's prompt for generating completion.
 * @return {Promise<string>} The completed text from the OpenAI API response.
 */
async function sendOpenAIRequest(key, endpoint, model, prompt) {
  const resp = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: model,
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  });
  const body = await resp.json();
  return body.choices[0].message.content;
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
    DB,
  } = env;

  const ttl = parseInt(MAIL_TTL, 10) || 60 * 60 * 24;

  const mail = await parseEmail(message);
  await DB.put(mail.id, JSON.stringify(mail), {expirationTtl: ttl});
  const req = await renderEmailListMode(mail, env);
  req.chat_id = TELEGRAM_ID;
  await sendTelegramRequest(TELEGRAM_TOKEN, 'sendMessage', req);
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
  const callbackId = body?.callback_query?.id;
  const chatId = body?.callback_query?.message?.chat?.id;
  const messageId = body?.callback_query?.message?.message_id;
  const renderMap = {
    p: renderEmailPreviewMode,
    l: renderEmailListMode,
    s: renderEmailSummaryMode,
  };
  const sendAlert = async (text) => {
    await sendTelegramRequest(TELEGRAM_TOKEN, 'answerCallbackQuery', {
      callback_query_id: callbackId,
      text: text,
      show_alert: true,
    });
  };
  if (data.startsWith('p:') || data.startsWith('l:') || data.startsWith('s:')) {
    const id = data.substring(2);
    const render = renderMap[data[0]];
    const raw = await DB.get(id);
    if (raw) {
      try {
        /**
         * @type {EmailCache}
         */
        const value = JSON.parse(raw);
        const req = await render(value, env);
        req.chat_id = chatId;
        req.message_id = messageId;
        await sendTelegramRequest(TELEGRAM_TOKEN, 'editMessageText', req);
      } catch (e) {
        await sendAlert(`Error: ${e.message}`);
        return;
      }
    } else {
      await sendAlert('Email not found');
      return;
    }
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
      return new Response('Invalid token');
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
    const value = JSON.parse(await DB.get(id));
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
  });

  router.all('*', async () => {
    return new Response('It works!');
  });

  return router.handle(request).catch((e) => {
    console.error(e);
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
