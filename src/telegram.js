import {renderEmailListMode, renderEmailPreviewMode, renderEmailSummaryMode} from './render.js';
import {parseEmail} from './parse.js';
import './types.js';
import {loadArrayFromDB, loadMailCache} from './dao.js';

/**
 * Sends a Telegram API request.
 *
 * @param {string} token - The Telegram bot token.
 * @param {string} method - The API method to call.
 * @param {object} body - The JSON body of the request.
 * @return {Promise<object>} A promise that resolves to the response from the API.
 */
export async function sendTelegramRequest(token, method, body) {
  const resp = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const result = await resp.json();
  console.log(`Response from Telegram API: ${method}\n${JSON.stringify(result)}`);
  return result;
}

/**
 * Sends an email message to Telegram.
 *
 * @param {EmailMessage} message - The email message to be sent.
 * @param {Environment} env - The environment variables.
 * @return {Promise<void>} A promise that resolves when the email message is sent successfully.
 */
export async function sendMailToTelegram(message, env) {
  const {
    TELEGRAM_TOKEN,
    TELEGRAM_ID,
    MAIL_TTL,
    DB,
    MAX_EMAIL_SIZE,
    MAX_EMAIL_SIZE_POLICY,
  } = env;

  const ttl = parseInt(MAIL_TTL, 10) || 60 * 60 * 24;
  const maxSize = parseInt(MAX_EMAIL_SIZE, 10) || 512 * 1024;
  const maxSizePolicy = MAX_EMAIL_SIZE_POLICY || 'truncate';
  const mail = await parseEmail(message, maxSize, maxSizePolicy);
  await DB.put(mail.id, JSON.stringify(mail), {expirationTtl: ttl});
  const req = await renderEmailListMode(mail, env);
  req.chat_id = TELEGRAM_ID;
  await sendTelegramRequest(TELEGRAM_TOKEN, 'sendMessage', req);
}

/**
 * Handles the incoming Telegram command
 *
 * @param {TelegramMessage} message - The Telegram message object.
 * @param {object} env - The environment object.
 * @return {Promise<void>} The fetch response.
 */
async function telegramCommandHandler(message, env) {
  const {
    TELEGRAM_TOKEN,
    TELEGRAM_ID,
  } = env;
  const idCommand = async (msg) => {
    await sendTelegramRequest(TELEGRAM_TOKEN, 'sendMessage', {
      chat_id: msg.chat.id,
      text: `Your chat ID is ${msg.chat.id}`,
    });
  };
  const handlers = {
    id: idCommand,
    start: idCommand,
  };
  for (const key in handlers) {
    if (message.text.startsWith(`/${key}`)) {
      await handlers[key](message);
      return;
    }
  }
  const authHandlers = {
    add_white: addAddressToDB('white', 'WHITE_LIST', env),
    remove_white: removeAddressFromDB('white', 'WHITE_LIST', env),
    list_white: listAddressesFromDB('white', 'WHITE_LIST', env),
    add_block: addAddressToDB('block', 'BLOCK_LIST', env),
    remove_block: removeAddressFromDB('block', 'BLOCK_LIST', env),
    list_block: listAddressesFromDB('block', 'BLOCK_LIST', env),
  };
  for (const key in authHandlers) {
    if (message.text.startsWith(`/${key}`)) {
      if (`${message.chat.id}` !== TELEGRAM_ID) {
        await sendTelegramRequest(TELEGRAM_TOKEN, 'sendMessage', {
          chat_id: message.chat.id,
          text: 'You are not authorized to use this command.',
        });
        return;
      }
      await authHandlers[key](message);
      return;
    }
  }
}

/**
 * Add an address to the database.
 * @param {string} command - The command name.
 * @param {string} key - The key of the database.
 * @param {Environment} env - The environment object.
 * @return {(function(TelegramMessage): Promise<void>)}
 */
function addAddressToDB(command, key, env) {
  return async (msg) => {
    const {
      TELEGRAM_TOKEN,
      DB,
    } = env;
    const address = msg.text.substring(`/add_${command} `.length);
    const list = await loadArrayFromDB(DB, key);
    if (!list.includes(address)) {
      list.push(address);
      await DB.put(key, JSON.stringify(list));
    }
    await sendTelegramRequest(TELEGRAM_TOKEN, 'sendMessage', {
      chat_id: msg.chat.id,
      text: `Added ${address} to ${key}`,
      disable_web_page_preview: true,
    });
  };
}

/**
 * Remove an address from the database.
 * @param {string} command - The command name.
 * @param {string} key - The key of the database.
 * @param {Environment} env - The environment object.
 * @return {(function(TelegramMessage): Promise<void>)}
 */
function removeAddressFromDB(command, key, env) {
  return async (msg) => {
    const {
      TELEGRAM_TOKEN,
      DB,
    } = env;
    const address = msg.text.substring(`/remove_${command} `.length);
    const list = await loadArrayFromDB(DB, key);
    if (list.includes(address)) {
      list.splice(list.indexOf(address), 1);
      await DB.put(key, JSON.stringify(list));
    }
    await sendTelegramRequest(TELEGRAM_TOKEN, 'sendMessage', {
      chat_id: msg.chat.id,
      text: `Removed ${address} from ${key}`,
      disable_web_page_preview: true,
    });
  };
}

/**
 * List addresses from the database.
 * @param {string} command - The command name.
 * @param {string} key - The key of the database.
 * @param {Environment} env - The environment object.
 * @return {(function(TelegramMessage): Promise<void>)}
 */
function listAddressesFromDB(command, key, env) {
  return async (msg) => {
    const {
      TELEGRAM_TOKEN,
      DB,
    } = env;
    const list = await loadArrayFromDB(DB, key);
    await sendTelegramRequest(TELEGRAM_TOKEN, 'sendMessage', {
      chat_id: msg.chat.id,
      text: `List of ${key}:\n${list.join('\n')}`,
      disable_web_page_preview: true,
    });
  };
}


/**
 * Handles the incoming Telegram callback.
 *
 * @param {TelegramCallbackQuery} callback - The Telegram callback object.
 * @param {object} env - The environment object.
 * @return {Promise<void>} The fetch response.
 */
async function telegramCallbackHandler(callback, env) {
  const {
    TELEGRAM_TOKEN,
    DB,
  } = env;

  const data = callback.data;
  const callbackId = callback.id;
  const chatId = callback.message?.chat?.id;
  const messageId = callback.message?.message_id;

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
  if (Object.keys(renderMap).map((k) => data.startsWith(`${k}:`)).includes(true)) {
    const id = data.substring(2);
    const render = renderMap[data[0]];
    const value = await loadMailCache(id, DB);
    if (value) {
      try {
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
 * Handles the incoming Telegram webhook request.
 *
 * @param {Request} req - The fetch request object.
 * @param {object} env - The environment object.
 * @return {Promise<void>} The fetch response.
 */
export async function telegramWebhookHandler(req, env) {
  /**
   * @type {TelegramWebhookRequest}
   */
  const body = await req.json();
  if (body?.message) {
    await telegramCommandHandler(body?.message, env);
  }
  if (body?.callback_query) {
    await telegramCallbackHandler(body?.callback_query, env);
  }
}
