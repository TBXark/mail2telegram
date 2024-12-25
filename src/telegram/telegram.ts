import type * as Telegram from 'telegram-bot-api-types';
import type { EmailRender } from '../mail';
import type { Environment } from '../types';
import { Dao } from '../db';
import { renderEmailDebugMode, renderEmailListMode, renderEmailPreviewMode, renderEmailSummaryMode } from '../mail';
import { createTelegramBotAPI } from './api';
import { TmaModeDescription } from './const';

type TelegramMessageHandler = (message: Telegram.Message) => Promise<Response>;
type CommandHandlerGroup = Record<string, TelegramMessageHandler>;

function handleIDCommand(env: Environment): TelegramMessageHandler {
    return async (msg: Telegram.Message): Promise<Response> => {
        const text = `Your chat ID is ${msg.chat.id}`;
        return await handleOpenTMACommand(env, '', text)(msg);
    };
}

function handleOpenTMACommand(env: Environment, mode: string, text: string | null): TelegramMessageHandler {
    return async (msg: Telegram.Message): Promise<Response> => {
        const {
            TELEGRAM_TOKEN,
            DOMAIN,
        } = env;
        const params: Telegram.SendMessageParams = {
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
        };
        return await createTelegramBotAPI(TELEGRAM_TOKEN).sendMessage(params);
    };
}

async function telegramCommandHandler(message: Telegram.Message, env: Environment): Promise<void> {
    let [command] = message.text?.split(/ (.*)/) || [''];
    if (!command.startsWith('/')) {
        console.log(`Invalid command: ${command}`);
        return;
    }
    command = command.substring(1);
    const handlers: CommandHandlerGroup = {
        id: handleIDCommand(env),
        start: handleIDCommand(env),
        test: handleOpenTMACommand(env, 'test', null),
        white: handleOpenTMACommand(env, 'white', null),
        block: handleOpenTMACommand(env, 'block', null),
    };

    if (handlers[command]) {
        await handlers[command](message);
        return;
    }
    // 兼容旧版命令返回默认信息
    await handleOpenTMACommand(env, '', `Unknown command: ${command}, try to reinitialize the bot.`)(message);
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
        console.log(`Invalid callback data: ${JSON.stringify({ data, callbackId, chatId, messageId })}`);
        return;
    }

    console.log(`Received callback: ${JSON.stringify({ data, callbackId, chatId, messageId })}`);
    const renderHandlerBuilder = (render: EmailRender) => async (arg: string): Promise<void> => {
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
    }
    if (body?.callback_query) {
        await telegramCallbackHandler(body?.callback_query, env);
    }
}
