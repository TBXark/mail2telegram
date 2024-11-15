import { loadMailCache } from './dao.js';
import { renderEmailDebugMode, renderEmailListMode, renderEmailPreviewMode, renderEmailSummaryMode } from './render.js';
import 'telegram-bot-api-jsdoc';
import './types.js';

const TmaModeDescription = {
    test: 'Test an email address',
    white: 'Manage the white list',
    block: 'Manage the block list',
};

/**
 * Sends a Telegram API request.
 * @param {string} token - The Telegram bot token.
 * @param {string} method - The API method to call.
 * @param {object} body - The JSON body of the request.
 * @returns {Promise<object>} A promise that resolves to the response from the API.
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
 * @param {EmailCache} mail - The email message to be sent.
 * @param {Environment} env - The environment variables.
 * @returns {Promise<void>} A promise that resolves when the email message is sent successfully.
 */
export async function sendMailToTelegram(mail, env) {
    const {
        TELEGRAM_TOKEN,
        TELEGRAM_ID,
    } = env;
    const req = await renderEmailListMode(mail, env);
    for (const id of TELEGRAM_ID.split(',')) {
        req.chat_id = id;
        await sendTelegramRequest(TELEGRAM_TOKEN, 'sendMessage', req);
    }
}

/**
 * @typedef {Function} TelegramMessageHandler
 * @param {Message} message - The Telegram message object.
 * @returns {Promise<Response>} The fetch response.
 */

/**
 * @typedef {Map<string, TelegramMessageHandler>} CommandHandlerGroup
 */

/**
 * Handles the incoming Telegram command
 * @param {Message} message - The Telegram message object.
 * @param {object} env - The environment object.
 * @returns {Promise<Response>|null} The fetch response.
 */
async function telegramCommandHandler(message, env) {
    let [command] = message.text.split(/ (.*)/);
    if (!command.startsWith('/')) {
        console.log(`Invalid command: ${command}`);
        return;
    }
    command = command.substring(1);
    /**
     * @type {CommandHandlerGroup}
     */
    const handlers = {
        id: handleIDCommand(env),
        start: handleIDCommand(env),
        test: handleOpenTMACommand(env, 'test', null),
        white: handleOpenTMACommand(env, 'white', null),
        block: handleOpenTMACommand(env, 'block', null),
    };

    if (handlers[command]) {
        return await handlers[command](message);
    }
    // 兼容旧版命令返回默认信息
    return handleOpenTMACommand(env, '', `Unknown command: ${command}, try to reinitialize the bot.`)(message);
}

/**
 * Handles the ID command by sending the chat ID to the user.
 * @param {object} env - The environment object containing the Telegram token.
 * @returns {TelegramMessageHandler} - An async function that takes a message object and sends the chat ID to the user.
 */
function handleIDCommand(env) {
    return async (msg) => {
        const text = `Your chat ID is ${msg.chat.id}`;
        return await handleOpenTMACommand(env, '', text)(msg);
    };
}

/**
 * Opens the TMA for the user.
 * @param {object} env - The environment object containing the Telegram token.
 * @param {string} mode - TMA mode.
 * @param {?string} text - The text to be displayed.
 * @returns {TelegramMessageHandler} - An async function that takes a message object and sends the TMA link to the user.
 */
function handleOpenTMACommand(env, mode, text) {
    return async (msg) => {
        const {
            TELEGRAM_TOKEN,
            DOMAIN,
        } = env;
        await sendTelegramRequest(TELEGRAM_TOKEN, 'sendMessage', {
            chat_id: msg.chat.id,
            text: text || TmaModeDescription[mode] || 'Address Manager',
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Open Manager',
                            web_app: {
                                url: `https://${DOMAIN}/tma?mode=${mode}`,
                            },
                        },
                    ],
                ],
            },
        });
    };
}

/**
 * Handles the incoming Telegram callback.
 * @param {CallbackQuery} callback - The Telegram callback object.
 * @param {object} env - The environment object.
 * @returns {Promise<void>} The fetch response.
 */
async function telegramCallbackHandler(callback, env) {
    const {
        TELEGRAM_TOKEN,
        DB,
    } = env;

    // Data格式: action:args
    const data = callback.data;
    const callbackId = callback.id;
    const chatId = callback.message?.chat?.id;
    const messageId = callback.message?.message_id;

    console.log(`Received callback: ${JSON.stringify({ data, callbackId, chatId, messageId })}`);

    const sendAlert = async (text) => {
        await sendTelegramRequest(TELEGRAM_TOKEN, 'answerCallbackQuery', {
            callback_query_id: callbackId,
            text,
            show_alert: true,
        });
    };

    const renderHandlerBuilder = render => async (arg) => {
        const value = await loadMailCache(DB, arg);
        if (!value) {
            throw new Error('Error: Email not found or expired.');
        }
        const req = await render(value, env);
        req.chat_id = chatId;
        req.message_id = messageId;
        await sendTelegramRequest(TELEGRAM_TOKEN, 'editMessageText', req);
    };

    const deleteMessage = async () => {
        await sendTelegramRequest(TELEGRAM_TOKEN, 'deleteMessage', {
            chat_id: chatId,
            message_id: messageId,
        });
    };

    const handlers = {
        p: renderHandlerBuilder(renderEmailPreviewMode),
        l: renderHandlerBuilder(renderEmailListMode),
        s: renderHandlerBuilder(renderEmailSummaryMode),
        d: renderHandlerBuilder(renderEmailDebugMode),
        delete: deleteMessage,
    };

    const [act, arg] = data.split(/:(.*)/);
    if (handlers[act]) {
        try {
            await handlers[act](arg);
        } catch (e) {
            await sendAlert(e.message);
        }
        return;
    }
    console.log(`Unknown data: ${data}`);
}

/**
 * Handles the incoming Telegram webhook request.
 * @param {Request} req - The fetch request object.
 * @param {object} env - The environment object.
 * @returns {Promise<void>} The fetch response.
 */
export async function telegramWebhookHandler(req, env) {
    /**
     * @type {Update}
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
 * @param {string} token - The Telegram bot token.
 * @returns {Promise<any>}
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
                description: `/test - ${TmaModeDescription.test}`,
            },
            {
                command: 'white',
                description: `/white - ${TmaModeDescription.white}`,
            },
            {
                command: 'block',
                description: `/block - ${TmaModeDescription.block}`,
            },
        ],
    };
    return await sendTelegramRequest(token, 'setMyCommands', body);
}
