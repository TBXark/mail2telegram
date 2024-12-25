import type { ForwardableEmailMessage } from '@cloudflare/workers-types';
import type { EmailCache, Environment } from '../../types';
import { Dao } from '../../db';
import { isMessageBlock, parseEmail, renderEmailListMode } from '../../mail';
import { createTelegramBotAPI } from '../../telegram';

export async function sendMailToTelegram(mail: EmailCache, env: Environment): Promise<void> {
    const {
        TELEGRAM_TOKEN,
        TELEGRAM_ID,
    } = env;
    const req = await renderEmailListMode(mail, env);
    const api = createTelegramBotAPI(TELEGRAM_TOKEN);
    for (const id of TELEGRAM_ID.split(',')) {
        await api.sendMessage({
            chat_id: id,
            ...req,
        });
    }
}

export async function emailHandler(message: ForwardableEmailMessage, env: Environment): Promise<void> {
    const {
        FORWARD_LIST,
        BLOCK_POLICY,
        GUARDIAN_MODE,
        DB,
        MAIL_TTL,
        MAX_EMAIL_SIZE,
        MAX_EMAIL_SIZE_POLICY,
    } = env;

    const dao = new Dao(DB);
    const id = message.headers.get('Message-ID') || '';
    const isBlock = await isMessageBlock(message, env);
    const isGuardian = GUARDIAN_MODE === 'true';
    const blockPolicy = (BLOCK_POLICY || 'telegram').split(',');
    const statusTTL = { expirationTtl: 60 * 60 };
    const status = await dao.loadMailStatus(id, isGuardian);

    // Reject the email
    if (isBlock && blockPolicy.includes('reject')) {
        message.setReject('Blocked');
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
            const ttl = Number.parseInt(MAIL_TTL, 10) || 60 * 60 * 24;
            const maxSize = Number.parseInt(MAX_EMAIL_SIZE || '', 10) || 512 * 1024;
            const maxSizePolicy = MAX_EMAIL_SIZE_POLICY || 'truncate';
            const mail = await parseEmail(message, maxSize, maxSizePolicy);
            await DB.put(mail.id, JSON.stringify(mail), { expirationTtl: ttl });
            await sendMailToTelegram(mail, env);
        }
        if (isGuardian) {
            status.telegram = true;
            await DB.put(id, JSON.stringify(status), statusTTL);
        }
    } catch (e) {
        console.error(e);
    }
}
