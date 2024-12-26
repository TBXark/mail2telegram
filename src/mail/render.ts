import type * as Telegram from 'telegram-bot-api-types';
import type { EmailCache, Environment } from '../types';
import { checkAddressStatus } from './check';
import { sendOpenAIRequest } from './openai';

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
        DOMAIN,
    } = env;
    const text = `${mail.subject}\n\n-----------\nFrom\t:\t${mail.from}\nTo\t\t:\t${mail.to}`;
    const preview = `https://${DOMAIN}/email/${mail.id}?mode=text`;
    const fullHTML = `https://${DOMAIN}/email/${mail.id}?mode=html`;
    const keyboard = [
        {
            text: 'Preview',
            callback_data: `p:${mail.id}`,
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

    if (OPENAI_API_KEY) {
        keyboard.splice(1, 0, {
            text: 'Summary',
            callback_data: `s:${mail.id}`,
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
    let {
        OPENAI_API_KEY: key,
        OPENAI_COMPLETIONS_API: endpoint,
        OPENAI_CHAT_MODEL: model,
        SUMMARY_TARGET_LANG: targetLang,
    } = env;
    const req = renderEmailDetail('', mail.id);
    endpoint = endpoint || 'https://api.openai.com/v1/chat/completions';
    model = model || 'gpt-4o-mini';
    targetLang = targetLang || 'english';
    const prompt = `Summarize the following text in approximately 50 words with ${targetLang}\n\n${mail.text}`;
    req.text = await sendOpenAIRequest(key ?? '', endpoint, model, prompt);
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
