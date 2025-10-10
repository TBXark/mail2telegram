import type * as Telegram from 'telegram-bot-api-types';
import type { EmailCache, Environment } from '../types';
import { checkAddressStatus } from './check';
import { summarizedByOpenAI, summarizedByWorkerAI } from './summarization';

export interface EmailDetailParams {
    text: string;
    reply_markup: Telegram.InlineKeyboardMarkup;
    link_preview_options: Telegram.LinkPreviewOptions;
}

export type EmailRender = (mail: EmailCache, env: Environment) => Promise<EmailDetailParams>;

export async function renderEmailListMode(mail: EmailCache, env: Environment): Promise<EmailDetailParams> {
    const {
        DEBUG,
        OPENAI_API_KEY,
        WORKERS_AI_MODEL,
        AI,
        DOMAIN,
    } = env;
    const text = `${mail.subject}\n\n-----------\nFrom\t:\t${mail.from}\nTo\t\t:\t${mail.to}`;
    const keyboard: Telegram.InlineKeyboardButton[] = [
        {
            text: 'Preview',
            callback_data: `p:${mail.id}`,
        },
    ];
    if ((AI && WORKERS_AI_MODEL) || OPENAI_API_KEY) {
        keyboard.push({
            text: 'Summary',
            callback_data: `s:${mail.id}`,
        });
    }
    if (mail.text) {
        keyboard.push({
            text: 'Text',
            url: `https://${DOMAIN}/email/${mail.id}?mode=text`,
        });
    }
    if (mail.html) {
        keyboard.push({
            text: 'HTML',
            url: `https://${DOMAIN}/email/${mail.id}?mode=html`,
        });
    }
    if (DEBUG === 'true') {
        keyboard.push({
            text: 'Debug',
            callback_data: `d:${mail.id}`,
        });
    }
    return {
        text,
        reply_markup: {
            inline_keyboard: [keyboard],
        },
        link_preview_options: {
            is_disabled: true,
        },
    };
}

function renderEmailDetail(text: string | undefined | null, id: string): EmailDetailParams {
    return {
        text: text || 'No content',
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Back',
                        callback_data: `l:${id}`,
                    },
                    {
                        text: 'Delete',
                        callback_data: 'delete',
                    },
                ],
            ],
        },
        link_preview_options: {
            is_disabled: true,
        },
    };
}

// eslint-disable-next-line unused-imports/no-unused-vars
export async function renderEmailPreviewMode(mail: EmailCache, env: Environment): Promise<EmailDetailParams> {
    return renderEmailDetail(mail.text?.substring(0, 4096), mail.id);
}

export async function renderEmailSummaryMode(mail: EmailCache, env: Environment): Promise<EmailDetailParams> {
    const {
        AI,
        OPENAI_API_KEY,
        WORKERS_AI_MODEL,
        OPENAI_COMPLETIONS_API = 'https://api.openai.com/v1/chat/completions',
        OPENAI_CHAT_MODEL = 'gpt-4o-mini',
        SUMMARY_TARGET_LANG = 'english',
    } = env;

    const req = renderEmailDetail('', mail.id);
    const prompt = `Summarize the following text in approximately 50 words with ${SUMMARY_TARGET_LANG}\n\n${mail.text}`;

    try {
        if (AI && WORKERS_AI_MODEL) {
            req.text = await summarizedByWorkerAI(AI, WORKERS_AI_MODEL, prompt);
        } else if (OPENAI_API_KEY) {
            req.text = await summarizedByOpenAI(OPENAI_API_KEY, OPENAI_COMPLETIONS_API, OPENAI_CHAT_MODEL, prompt);
        } else {
            req.text = 'Sorry, no summarization provider is configured.';
        }
    } catch (e) {
        req.text = `Failed to summarize the email: ${(e as Error).message}`;
    }
    return req;
}

export async function renderEmailDebugMode(mail: EmailCache, env: Environment): Promise<EmailDetailParams> {
    const addresses = [
        mail.from,
        mail.to,
    ];
    const res = await checkAddressStatus(addresses, env);
    const obj = {
        ...mail,
        block: res,
    };
    delete obj.html;
    delete obj.text;
    const text = JSON.stringify(obj, null, 2);
    return renderEmailDetail(text, mail.id);
}
