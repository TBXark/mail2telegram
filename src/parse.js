import { convert } from 'html-to-text';
import PostalMime from 'postal-mime';

import './types.js';

/**
 * Converts a ReadableStream to an ArrayBuffer.
 * @param {ReadableStream} stream - The ReadableStream to convert.
 * @param {number} streamSize - The size of the stream.
 * @returns {Promise<Uint8Array>} The converted ArrayBuffer.
 */
async function streamToArrayBuffer(stream, streamSize) {
    const result = new Uint8Array(streamSize);
    const reader = stream.getReader();
    let bytesRead = 0;
    try {
        while (bytesRead < streamSize) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            result.set(value, bytesRead);
            bytesRead += value.length;
        }
    } finally {
        reader.releaseLock();
    }
    return result.slice(0, bytesRead);
}

/**
 * Parse an email message.
 * @param {EmailMessage} message - The email message to be parsed.
 * @param {number} maxSize - The maximum size of the email in bytes.
 * @param {string} maxSizePolicy - The policy of emails that exceed the maximum size.
 * @returns {Promise<EmailCache>} - A promise that resolves to the ID of the saved email.
 */
export async function parseEmail(message, maxSize, maxSizePolicy) {
    const id = crypto.randomUUID();
    const cache = {
        id,
        messageId: message.headers.get('Message-ID'),
        from: message.from,
        to: message.to,
        subject: message.headers.get('Subject'),
    };
    let bufferSize = message.rawSize;
    let currentMode = 'untruncate';
    if (bufferSize > maxSize) {
        switch (maxSizePolicy) {
            case 'unhandled':
                cache.text = `The original size of the email was ${bufferSize} bytes, which exceeds the maximum size of ${maxSize} bytes.`;
                cache.html = cache.text;
                return cache;
            case 'truncate':
                bufferSize = maxSize;
                currentMode = 'truncate';
                break;
            default:
                break;
        }
    }
    try {
        const raw = await streamToArrayBuffer(message.raw, bufferSize);
        const parser = new PostalMime();
        const email = await parser.parse(raw);
        // cache.messageId = email.messageId;
        // cache.subject = email.subject;
        if (email.html) {
            cache.html = email.html;
        }
        if (email.text) {
            cache.text = email.text;
        } else if (email.html) {
            cache.text = convert(email.html, {});
        }
        if (currentMode === 'truncate') {
            cache.text += `\n\n[Truncated] The original size of the email was ${message.rawSize} bytes, which exceeds the maximum size of ${maxSize} bytes.`;
        }
    } catch (e) {
        const msg = `Error parsing email: ${e.message}`;
        cache.text = msg;
        cache.html = msg;
    }
    return cache;
}
