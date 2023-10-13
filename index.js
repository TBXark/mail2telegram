import { Router } from "itty-router";

/**
 * Generates a random ID of the specified length.
 *
 * @param {number} length - The length of the random ID to generate.
 * @return {string} - The randomly generated ID.
 */
function randamId(length) {
    const elements =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += elements[Math.floor(Math.random() * elements.length)];
    }
    return result;
}

/**
 * Converts a ReadableStream to an ArrayBuffer.
 *
 * @param {ReadableStream} stream - The ReadableStream to convert.
 * @param {number} streamSize - The size of the stream.
 * @return {Promise<Uint8Array>} The converted ArrayBuffer.
 */
async function streamToArrayBuffer(stream, streamSize) {
    let result = new Uint8Array(streamSize);
    let bytesRead = 0;
    const reader = stream.getReader();
    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        result.set(value, bytesRead);
        bytesRead += value.length;
    }
    return result;
}

/**
 * Parse an email message.
 *
 * @param {Object} message - The email message to be parsed.
 * @return {Promise<Object>} - A promise that resolves to the parsed email message.
 */
async function parseEmail(message) {
    const raw = await streamToArrayBuffer(message.raw, message.rawSize);
    const PostalMime = require("postal-mime");
    const parser = new PostalMime.default();
    return await parser.parse(raw);
}

/**
 * Saves an email to the database.
 *
 * @param {Object} db - The database object.
 * @param {Object} email - The email object.
 * @param {string} email.html - The HTML content of the email.
 * @param {string} email.text - The plain text content of the email.
 * @return {Promise<string>} - A promise that resolves to the ID of the saved email.
 */
async function saveEmailToDB(db, email) {
    const id = randamId(32);
    if (email.html) {
        await db.put(`${id}-html`, email.html, { expirationTtl: 60 * 60 * 24 });
    }
    if (email.text) {
        const html = `
        <!DOCTYPE html>
        <html>
        <body>
        <pre>${email.text}</pre>
        </body>
        </html>
        `;
        await db.put(`${id}-text`, html, { expirationTtl: 60 * 60 * 24 });
    }
    return id;
}

/**
 * Handles the fetch request.
 *
 * @param {Request} req - The fetch request object.
 * @param {Environment} env - The environment object.
 * @param {Context} ctx - The context object.
 * @return {Promise<Response>} The fetch response.
 */
async function fetchHandler(req, env, ctx) {
    const router = Router();
    router.get("/email/:id", async (req) => {
        const id = req.params.id;
        const mode = req.query.mode;
        const value = await env.DB.get(`${id}-${mode}`);
        if (value) {
            return new Response(value, {
                headers: {
                    "content-type": "text/html; charset=utf-8",
                },
            });
        } else {
            return new Response("Not found", {
                status: 404,
            });
        }
    });
    router.all("*", async (req) => {
        return new Response("It works!");
    });
    return router.handle(req);
}

/**
 * Handles incoming email messages.
 *
 * @param {object} message - The email message object.
 * @param {object} env - The environment variables.
 * @param {object} ctx - The context object.
 * @return {Promise<void>} - A promise that resolves when the email is processed.
 */
async function emailHandler(message, env, ctx) {
    const {
        BLOCK_LIST,
        WHITE_LIST,
        FORWARD_LIST,
        TELEGRAM_TOKEN,
        TELEGRAM_ID,
        DOMAIN,
        DB,
    } = env;

    const blockList = JSON.parse(BLOCK_LIST || "[]");
    const whiteList = JSON.parse(WHITE_LIST || "[]");
    const forwardList = JSON.parse(FORWARD_LIST || "[]");

    const matchAddress = (list, address) => {
        for (let i = 0; i < list.length; i++) {
            const regx = new RegExp(list[i]);
            if (regx.test(address)) {
                return true;
            }
        }
        return false;
    };

    if (!matchAddress(whiteList, message.from)) {
        if (matchAddress(blockList, message.from)) {
            return;
        }
    }

    const mail = await parseEmail(message);
    const id = await saveEmailToDB(DB, mail);

    try {
        const text = `
${message.headers.get("subject")}

-----------
From\t:\t${message.from}
To\t\t:\t${message.to}
`;
        const preview = `https://${DOMAIN}/email/${id}?mode=text`;
        const fullHTML = `https://${DOMAIN}/email/${id}?mode=html`;

        await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_ID,
                text: text,
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: "Text",
                                url: preview,
                            },
                            {
                                text: "HTML",
                                url: fullHTML,
                            },
                        ],
                    ],
                },
            }),
        });
    } catch (e) {
        console.error(e);
    }

    for (const forward of forwardList) {
        try {
            await message.forward(forward);
        } catch (e) {
            console.error(e);
        }
    }
}

export default {
    fetch: fetchHandler,
    email: emailHandler,
};
