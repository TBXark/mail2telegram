import { renderEmailListMode, renderEmailPreviewMode, renderEmailSummaryMode, renderEmailDebugMode } from './render.js';
import { parseEmail } from './parse.js';
import './types.js';
import { checkAddressStatus, loadArrayFromDB, loadMailCache } from './dao.js';

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
  await DB.put(mail.id, JSON.stringify(mail), { expirationTtl: ttl });
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
  const noArgCommands = ['id', 'start', 'list_white', 'list_block'];
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
    // white list
    add_white: isAddressToDBEnabled(env, addAddressToDB('white', 'WHITE_LIST', env)),
    remove_white: isAddressToDBEnabled(env, removeAddressFromDB('white', 'WHITE_LIST', 'address', env)),
    remove_white_index: isAddressToDBEnabled(env, removeAddressFromDB('white_index', 'WHITE_LIST', 'index', env)),
    list_white: isAddressToDBEnabled(env, listAddressesFromDB('white', 'WHITE_LIST', env)),
    // block list
    add_block: isAddressToDBEnabled(env, addAddressToDB('block', 'BLOCK_LIST', env)),
    remove_block: isAddressToDBEnabled(env, removeAddressFromDB('block', 'BLOCK_LIST', 'address', env)),
    remove_block_index: isAddressToDBEnabled(env, removeAddressFromDB('block_index', 'BLOCK_LIST', 'index', env)),
    list_block: isAddressToDBEnabled(env, listAddressesFromDB('block', 'BLOCK_LIST', env)),
    // test
    test: testAddress(message, env),
  };


  for (const key in authHandlers) {
    if (message.text.startsWith(`/${key}${(noArgCommands.includes(key) ? '' : ' ')}`)) {
      if (`${message.chat.id}` !== TELEGRAM_ID) {
        await sendTelegramRequest(TELEGRAM_TOKEN, 'sendMessage', {
          chat_id: message.chat.id,
          text: 'You are not authorized to use this command.',
        });
        return;
      }
      console.log(`Command: ${key} => ${message.text}`);
      await authHandlers[key](message);
      return;
    }
  }
}


/**
 * Test the address by checking its status and send the result to Telegram.
 * @param {Object} message - The message object received from Telegram.
 * @param {Object} env - The environment object containing configuration variables.
 * @returns {Function} - An async function that takes a message object and performs the address test.
 */
function testAddress(message, env) {
  return async (msg) => {
    // /test abc@def.com
    const address = message.text.substring('/test '.length).trim();
    if (!address) {
      await sendTelegramRequest(env.TELEGRAM_TOKEN, 'sendMessage', {
        chat_id: msg.chat.id,
        text: `Please provide an email address. Example: /test example@mail.com`,
      });
      return;
    }
    const res = await checkAddressStatus([address], env);
    await sendTelegramRequest(env.TELEGRAM_TOKEN, 'sendMessage', {
      chat_id: msg.chat.id,
      text: `Address: ${address}\nResult: ${JSON.stringify(res, null, 2)}`,
    });
  }
}


/**
 * Add an address to the database.
 * @param {Environment} env - The environment object.
 * @param {function(TelegramMessage): Promise<void>} handler - The handler function.
 * @return {(function(TelegramMessage): Promise<void>)}
 */
function isAddressToDBEnabled(env, handler) {
  const {
    LOAD_REGEX_FROM_DB,
    TELEGRAM_TOKEN
  } = env;
  return async (msg) => {
    if (LOAD_REGEX_FROM_DB !== 'true') {
      await sendTelegramRequest(TELEGRAM_TOKEN, 'sendMessage', {
        chat_id: msg.chat.id,
        text: 'This command is disabled. You need to enable LOAD_REGEX_FROM_DB=true in the environment variables.',
      });
      return;
    }
    await handler(msg);
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
    const address = msg.text.substring(`/add_${command} `.length).trim();
    if (!address) {
      await sendTelegramRequest(TELEGRAM_TOKEN, 'sendMessage', {
        chat_id: msg.chat.id,
        text: `Please provide an email address. Example: /add_${command} example@mail.com`,
      });
      return;
    }
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
 * @param {string} mode - Remove mode: index or address.
 * @param {Environment} env - The environment object.
 * @return {(function(TelegramMessage): Promise<void>)}
 */
function removeAddressFromDB(command, key, mode, env) {
  return async (msg) => {
    const {
      TELEGRAM_TOKEN,
      DB,
    } = env;
    const list = await loadArrayFromDB(DB, key);
    const address = msg.text.substring(`/remove_${command} `.length).trim();
    console.log(`Remove: ${JSON.stringify({list, address, key, mode, command})}`);
    switch (mode) {
      case 'address': {
        console.log(`Remove address: ${address}`);
        if (!address) {
          await sendTelegramRequest(TELEGRAM_TOKEN, 'sendMessage', {
            chat_id: msg.chat.id,
            text: `Please provide an email address. Example: /remove_${command} example@mail.com`,
          });
          break;
        }
        if (!list.includes(address)) {
          await sendTelegramRequest(TELEGRAM_TOKEN, 'sendMessage', {
            chat_id: msg.chat.id,
            text: `${address} not found in ${key}`,
            disable_web_page_preview: true,
          });
          break;
        }
        list.splice(list.indexOf(address), 1);
        await DB.put(key, JSON.stringify(list));
        await sendTelegramRequest(TELEGRAM_TOKEN, 'sendMessage', {
          chat_id: msg.chat.id,
          text: `Removed ${address} from ${key}`,
          disable_web_page_preview: true,
        });
        break;
      }
      case 'index': {
        console.log(`Remove index: ${address}`);
        const index = parseInt(address, 10);
        if (isNaN(index) || index < 1 || index > list.length) {
          console.log(`Invalid index: ${index}`);
          await sendTelegramRequest(TELEGRAM_TOKEN, 'sendMessage', {
            chat_id: msg.chat.id,
            text: `Invalid index. Please provide a number between 1 and ${list.length}`,
          });
          break;
        }
        const target = list[index - 1];
        list.splice(index - 1, 1);
        await DB.put(key, JSON.stringify(list));
        await sendTelegramRequest(TELEGRAM_TOKEN, 'sendMessage', {
          chat_id: msg.chat.id,
          text: `Removed ${target} from ${key}`,
          disable_web_page_preview: true,
        });
        break;
      }
      default: {
        throw new Error(`Invalid mode: ${mode}`);
      }
    }
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
    let addresses = ""
    if (list.length === 0) {
      addresses = "Not found.";
    } else {
      for (let i = 0; i < list.length; i++) {
        addresses += `${i + 1}. ${list[i]}\n`;
      }
      addresses = addresses.trim();
    }
    await sendTelegramRequest(TELEGRAM_TOKEN, 'sendMessage', {
      chat_id: msg.chat.id,
      text: `List of ${key}:\n\n${addresses}`,
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

  console.log(`Received callback: ${data}`);

  const renderMap = {
    p: renderEmailPreviewMode,
    l: renderEmailListMode,
    s: renderEmailSummaryMode,
    d: renderEmailDebugMode,
  };
  const sendAlert = async (text) => {
    await sendTelegramRequest(TELEGRAM_TOKEN, 'answerCallbackQuery', {
      callback_query_id: callbackId,
      text: text,
      show_alert: true,
    });
  };
  if (Object.keys(renderMap).findIndex((k) => data.startsWith(`${k}:`)) !== -1) {
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
  if (data === 'delete') {
    await sendTelegramRequest(TELEGRAM_TOKEN, 'deleteMessage', {
      chat_id: chatId,
      message_id: messageId,
    });
    return;
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

/**
 * Bind telegram commands.
 * @param {string} token
 * @return {Promise<any>}
 */
export async function setMyCommands(token) {
  const body = {
    commands: [
      {
        command: 'id',
        description: '/id - Get your chat ID',
      },
      {
        command: 'test',
        description: '/test <address> - Test an email address',
      },
      {
        command: 'add_white',
        description: '/add_white <address> - Add an email address to the white list',
      },
      {
        command: 'remove_white',
        description: '/remove_white <address> - Remove an email address from the white list, Or Use /remove_white_index <index> to emove an email address by index',
      },
      {
        command: 'list_white',
        description: '/list_white - List the email addresses in the white list',
      },
      {
        command: 'add_block',
        description: '/add_block <address> - Add an email address to the block list',
      },
      {
        command: 'remove_block',
        description: '/remove_block <address> - Remove an email address from the block list, Or Use /remove_block_index <index> to remove an email address by index',
      },
      {
        command: 'list_block',
        description: '/list_block - List the email addresses in the block list',
      },
    ],
  };
  return await sendTelegramRequest(token, 'setMyCommands', body);
}
