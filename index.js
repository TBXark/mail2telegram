import { loadMailStatus } from './src/dao.js';
import { isMessageBlock } from './src/helper.js';
import { parseEmail } from './src/parse.js';
import { createRouter } from './src/route.js';
import { sendMailToTelegram } from './src/telegram.js';
import './src/polyfill.js';

import './src/types.js';

/**
 * Handles the fetch request.
 * @param {Request} request - The fetch request object.
 * @param {Environment} env - The environment object.
 * @param {object} ctx - The context object.
 * @returns {Promise<Response>} The fetch response.
 */
// eslint-disable-next-line unused-imports/no-unused-vars
async function fetchHandler(request, env, ctx) {
    const router = createRouter(env);
    return router.fetch(request).catch((e) => {
        return new Response(JSON.stringify({
            error: e.message,
        }), { status: 500 });
    });
}

/**
 * Handles incoming email messages.
 * @param {EmailMessage} message - The email message object.
 * @param {Environment} env - The environment variables.
 * @param {object} ctx - The context object.
 * @returns {Promise<void>} - A promise that resolves when the email is processed.
 */
// eslint-disable-next-line unused-imports/no-unused-vars
async function emailHandler(message, env, ctx) {
    const {
        FORWARD_LIST,
        BLOCK_POLICY,
        GUARDIAN_MODE,
        DB,
        MAIL_TTL,
        MAX_EMAIL_SIZE,
        MAX_EMAIL_SIZE_POLICY,
    } = env;

    const id = message.headers.get('Message-ID');
    const isBlock = await isMessageBlock(message, env);
    const isGuardian = GUARDIAN_MODE === 'true';
    const blockPolicy = (BLOCK_POLICY || 'telegram').split(',');
    const statusTTL = { expirationTtl: 60 * 60 };
    const status = await loadMailStatus(DB, id, isGuardian);

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
            const maxSize = Number.parseInt(MAX_EMAIL_SIZE, 10) || 512 * 1024;
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

export default {
    fetch: fetchHandler,
    email: emailHandler,
};
