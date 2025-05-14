import type * as Telegram from 'telegram-bot-api-types';
import type { EmailRender } from '../mail';
import type { Environment } from '../types';
import { Dao } from '../db';
import { renderEmailDebugMode, renderEmailListMode, renderEmailPreviewMode, renderEmailSummaryMode, replyToEmail } from '../mail';
import { createTelegramBotAPI } from './api';
import { tmaModeDescription } from './const';

type TelegramMessageHandler = (message: Telegram.Message) => Promise<Response>;
type CommandHandlerGroup = Record<string, TelegramMessageHandler>;

function handleIDCommand(env: Environment): TelegramMessageHandler {
    return async (msg: Telegram.Message): Promise<Response> => {
        const text = `Your chat ID is ${msg.chat.id}`;
        return await handleOpenTMACommand('', text, env)(msg);
    };
}

function handleOpenTMACommand(mode: string, text: string | null, env: Environment): TelegramMessageHandler {
    return async (msg: Telegram.Message): Promise<Response> => {
        const {
            TELEGRAM_TOKEN,
            DOMAIN,
        } = env;
        const params: Telegram.SendMessageParams = {
            chat_id: msg.chat.id,
            text: text || tmaModeDescription[mode] || 'Address Manager',
        };
        
        if (msg.chat.type === 'private') {
            params.reply_markup = {
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
            };
        }

        return await createTelegramBotAPI(TELEGRAM_TOKEN).sendMessage(params);
    };
}

async function handleReplyEmailCommand(message: Telegram.Message, env: Environment): Promise<void> {
    const {
        TELEGRAM_TOKEN,
        RESEND_API_KEY,
        DB,
    } = env;
    const dao = new Dao(DB);
    const api = createTelegramBotAPI(TELEGRAM_TOKEN);
    const reply = async (text: string) => {
        await api.sendMessage({
            chat_id: message.chat.id,
            reply_parameters: {
                message_id: message.message_id,
            },
            text,
        });
    };
    if (!RESEND_API_KEY) {
        await reply('Resend API is not enabled.');
        return;
    }
    if (!message.text) {
        await reply('Please provide a message to resend.');
        return;
    }
    try {
        const messageID = message.reply_to_message?.message_id;
        if (!messageID) {
            await reply('Please reply to a message to resend.');
            return;
        }
        const mailID = await dao.telegramIDToMailID(`${messageID}`);
        if (!mailID) {
            await reply('Message not found.');
            return;
        }
        const mail = await dao.loadMailCache(mailID);
        if (!mail) {
            await reply('Message not found or expired.');
            return;
        }
        await replyToEmail(RESEND_API_KEY, mail, message.text);
        await reply('Reply sent successfully.');
    } catch (e) {
        await reply((e as Error).message);
    }
}

async function telegramCommandHandler(message: Telegram.Message, env: Environment): Promise<void> {
    if (message?.reply_to_message) {
        await handleReplyEmailCommand(message, env);
        return;
    }
    let [command] = message.text?.split(/ (.*)/) || [''];
    if (!command.startsWith('/')) {
        console.log(`Invalid command: ${command}`);
        return;
    }
    command = command.substring(1);
    const handlers: CommandHandlerGroup = {
        id: handleIDCommand(env),
        start: handleIDCommand(env),
        test: handleOpenTMACommand('test', null, env),
        white: handleOpenTMACommand('white', null, env),
        block: handleOpenTMACommand('block', null, env),
    };

    if (handlers[command]) {
        await handlers[command](message);
        return;
    }
    // 兼容旧版命令返回默认信息
    await handleOpenTMACommand('', `Unknown command: ${command}, try to reinitialize the bot.`, env)(message);
}

async function telegramCallbackHandler(callback: Telegram.CallbackQuery, env: Environment): Promise<void> {
    const {
        TELEGRAM_TOKEN,
        DB,
    } = env;

    const data = callback.data;
    const callbackId = callback.id;
    const chatId = callback.message?.chat?.id;
    const messageId = callback.message?.message_id;
    const api = createTelegramBotAPI(TELEGRAM_TOKEN);
    const dao = new Dao(DB);

    if (!data || !chatId || !messageId) {
        return;
    }

    console.log(`Received callback: ${JSON.stringify({ data, callbackId, chatId, messageId })}`);
    const renderHandlerBuilder = (render: EmailRender): (arg: string) => Promise<void> => {
        return async (arg: string): Promise<void> => {
            const value = await dao.loadMailCache(arg);
            if (!value) {
                throw new Error('Error: Email not found or expired.');
            }
            const req = await render(value, env);
            const params: Telegram.EditMessageTextParams = {
                chat_id: chatId,
                message_id: messageId,
                ...req,
            };
            await api.editMessageText(params);
        };
    };

    // eslint-disable-next-line unused-imports/no-unused-vars
    const deleteMessage = async (arg: string): Promise<void> => {
        await api.deleteMessage({
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
    } as { [key: string]: (arg: string) => Promise<void> };

    const [act, arg] = data.split(/:(.*)/) as [string, string];
    if (handlers[act]) {
        try {
            await handlers[act](arg);
        } catch (e) {
            await api.answerCallbackQuery({
                callback_query_id: callbackId,
                text: (e as Error).message,
                show_alert: true,
            });
        }
        return;
    }
    console.log(`Unknown data: ${data}`);
}

export async function telegramWebhookHandler(req: Request, env: Environment): Promise<void> {
    const body = await req.json() as Telegram.Update;
    if (body?.message) {
        await telegramCommandHandler(body?.message, env);
        return;
    }
    if (body?.callback_query) {
        await telegramCallbackHandler(body?.callback_query, env);
    }
}
