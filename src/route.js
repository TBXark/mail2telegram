import {Router} from 'itty-router';
import tmaHTML from './tma.html';
import {addAddress, BLOCK_LIST_KEY, loadArrayFromDB, loadMailCache, removeAddress, WHITE_LIST_KEY} from './dao.js';
import {sendTelegramRequest, setMyCommands, telegramWebhookHandler} from './telegram.js';
import {validate} from '@telegram-apps/init-data-node/web';

class HTTPError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

/**
 * Get the status code from the error.
 * @param {Error} e - The error object.
 * @returns {number} The status code.
 */
function statusCodeFromError(e) {
    if (e instanceof HTTPError) {
        return e.status;
    }
    return 500;
}

/**
 * 
 * Create the router.
 * @param {Environment} env - The environment object.
 * @returns {import('itty-router').RouterType} The router object.
 */
export function createRouter(env) {
  const router = Router();
  const {
    TELEGRAM_TOKEN,
    TELEGRAM_ID,
    DOMAIN,
    DB,
  } = env;

  router.get('/', async () => {
    return new Response(null, {
        status: 302,
        headers: {
            'location': 'https://github.com/TBXark/mail2telegram',
        },
        });
   });

  router.get('/init', async () => {
    const webhook = await sendTelegramRequest(TELEGRAM_TOKEN, 'setWebhook', {
      url: `https://${DOMAIN}/telegram/${TELEGRAM_TOKEN}/webhook`,
    });
    const commands = await setMyCommands(TELEGRAM_TOKEN);
    return new Response(JSON.stringify({webhook, commands}));
  });


  /// Telegram Mini Apps

  router.get('/tma', async () => {
    return new Response(tmaHTML, {
      headers: {
        'content-type': 'text/html; charset=utf-8',
      },
    });
  });

  const withTelegramAuthenticated = async (req) => {
    const [authType, authData = ''] = (req.headers.get('Authorization') || '').split(' ');
    if (authType !== 'tma') {
      return new Response(JSON.stringify({
        error: 'Invalid authorization type',
      }), {status: 401});
    }
    try {
      await validate(authData, TELEGRAM_TOKEN, {
        expiresIn: 3600,
      });
      const userRaw = authData.split('&').map(e => e.split('=')).filter(v => v[0] == 'user')[0][1];
      const user = JSON.parse(decodeURIComponent(userRaw));
      for (const id of TELEGRAM_ID.split(',')) {
        if (id === `${user.id}`) {
          return;
        }
      }
      return new Response(JSON.stringify({
        error: 'Permission denied',
      }), {status: 403});
    } catch (e) {
      return new Response(JSON.stringify({
        error: e.message,
      }), {status: 401});
    }
  };

  const addressParamsCheck = (address, type) => {
    if (!address || !type) {
      throw new HTTPError(400, 'Missing address or type');
    }
    if (![BLOCK_LIST_KEY, WHITE_LIST_KEY].includes(type)) {
        throw new HTTPError(400, 'Invalid type');
    }
  };

  const keyMap = {
    block: BLOCK_LIST_KEY,
    white: WHITE_LIST_KEY,
};

  router.post('/api/address/add', withTelegramAuthenticated, async (req) => {
    const {address, type} = await req.json();
    try {
        const key = keyMap[type];
        addressParamsCheck(address, key);
        await addAddress(DB, address, key);
        return new Response('{}');
    } catch (e) {
        return new Response(JSON.stringify({
          error: e.message,
        }), {status: statusCodeFromError(e)});
    }
  });

  router.post('/api/address/remove', withTelegramAuthenticated, async (req) => {
    const {address, type} = await req.json();
    try {
        const key = keyMap[type];
        addressParamsCheck(address, key);
        await removeAddress(DB, address, key);
        return new Response('{}');
    } catch (e) {
        return new Response(JSON.stringify({
            error: e.message,
          }), {status: statusCodeFromError(e)});
    }
  });

  router.get('/api/address/list', withTelegramAuthenticated, async () => {
    const block = await loadArrayFromDB(DB, BLOCK_LIST_KEY);
    const white = await loadArrayFromDB(DB, WHITE_LIST_KEY);
    return new Response(JSON.stringify({block, white}));
  });

  /// Wenbooh

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

  /// Preview

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

  return router;
}
