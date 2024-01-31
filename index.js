import {Router} from 'itty-router';
import {sendMailToTelegram, sendTelegramRequest, telegramWebhookHandler} from './src/telegram.js';
import {isMessageBlock, loadMailCache, loadMailStatus} from './src/dao.js';
import './src/types.js';


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
    const value = await loadMailCache(id, DB);
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
    BLOCK_POLICY,
    GUARDIAN_MODE,
    DB,
  } = env;
  const id = message.headers.get('Message-ID');
  const isBlock = await isMessageBlock(message, env);
  const isGuardian = GUARDIAN_MODE === 'true';
  const blockPolicy = (BLOCK_POLICY || 'telegram').split(',');
  const statusTTL = {expirationTtl: 60 * 60};
  const status = await loadMailStatus(id, isGuardian, DB);

  // Reject the email
  if (isBlock && blockPolicy.includes('reject')) {
    await message.setReject('Blocked');
    return;
  }

  // Forward to email
  try {
    const blockForward = isBlock && blockPolicy.includes('forward');
    const forwardList = blockForward ? [] : (FORWARD_LIST || '').split(',');
    for (const forward of forwardList) {
      try {
        const add = forward.trim();
        if (status.forward.includes(add)) {
          continue;
        }
        await message.forward(add);
        if (isGuardian) {
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

  // Send to Telegram
  try {
    const blockTelegram = isBlock && blockPolicy.includes('telegram');
    if (!status.telegram && !blockTelegram) {
      await sendMailToTelegram(message, env);
    }
    if (isGuardian) {
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
