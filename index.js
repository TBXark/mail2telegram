import {Router} from 'itty-router';
import {sendMailToTelegram, sendTelegramRequest, telegramWebhookHandler} from './telegram.js';
import './types.js';


/**
 * Checks if the given message can be handled based on the environment.
 *
 * @param {EmailMessage} message - The message to be checked.
 * @param {Environment} env - The environment object containing BLOCK_LIST and WHITE_LIST.
 * @return {Promise<boolean>} A promise that resolves to true if the message can be handled.
 */
async function canHandleMessage(message, env) {
  const loadArrayFromRaw = (raw) => {
    if (!raw) {
      return [];
    }
    let list = [];
    try {
      list = JSON.parse(raw);
    } catch (e) {
      return [];
    }
    if (!Array.isArray(list)) {
      return [];
    }
    return list;
  };
  const loadArrayFromDB = async (db, key) => {
    try {
      const raw = await db.get(key);
      return loadArrayFromRaw(raw);
    } catch (e) {
      return [];
    }
  };
  const matchAddress = (list, address) => {
    for (const item of list) {
      const regex = new RegExp(item);
      if (regex.test(address)) {
        return true;
      }
    }
    return false;
  };
  const {
    BLOCK_LIST,
    WHITE_LIST,
    LOAD_REGEX_FROM_DB,
    DB,
  } = env;
  const blockList = loadArrayFromRaw(BLOCK_LIST);
  const whiteList = loadArrayFromRaw(WHITE_LIST);
  if (LOAD_REGEX_FROM_DB === 'true') {
    blockList.push(...(await loadArrayFromDB(DB, 'BLOCK_LIST')));
    whiteList.push(...(await loadArrayFromDB(DB, 'WHITE_LIST')));
  }
  const address = [];
  if (message.from) {
    address.push(message.from);
  }
  if (message.to) {
    address.push(message.to);
  }
  for (const addr of address) {
    if (!matchAddress(whiteList, addr)) {
      if (matchAddress(blockList, addr)) {
        return false;
      }
    }
  }
  return true;
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
    const resp = await sendTelegramRequest(TELEGRAM_TOKEN, 'setWebhook', {
      url: `https://${DOMAIN}/telegram/${TELEGRAM_TOKEN}/webhook`,
    });
    return new Response(JSON.stringify(resp));
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
    GUARDIAN_MODE,
    DB,
  } = env;
  const id = message.headers.get('Message-ID');
  const statusTTL = {expirationTtl: 60 * 60};
  const isGuardianMode = (GUARDIAN_MODE === 'true');
  let status = {
    telegram: false,
    forward: [],
  };
  if (!(await canHandleMessage(message, env))) {
    console.log(`Message ${id} is blocked`);
    return;
  }
  if (isGuardianMode) {
    try {
      const raw = await DB.get(id);
      if (raw) {
        status = JSON.parse(raw);
      }
    } catch (e) {
      console.error(e);
    }
  }
  try {
    const forwardList = (FORWARD_LIST || '').split(',');
    for (const forward of forwardList) {
      try {
        const add = forward.trim();
        if (status.forward.includes(add)) {
          continue;
        }
        await message.forward(add);
        if (isGuardianMode) {
          status.forward.push(add);
          await DB.put(id, JSON.stringify(status), statusTTL);
        }
      } catch (e) {
        console.error(e);
      }
    }
  } catch (e) {
    console.error(e);
  }
  try {
    if (!status.telegram) {
      await sendMailToTelegram(message, env);
    }
    if (isGuardianMode) {
      status.telegram = true;
      await DB.put(id, JSON.stringify(status), statusTTL);
    }
  } catch (e) {
    console.error(e);
  }
}


export default {
  fetch: fetchHandler,
  email: emailHandler,
};
