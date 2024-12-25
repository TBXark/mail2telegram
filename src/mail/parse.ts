import type { ForwardableEmailMessage, ReadableStream } from '@cloudflare/workers-types';
import type { EmailCache, MaxEmailSizePolicy } from '../types';
import { convert } from 'html-to-text';
import PostalMime from 'postal-mime';

async function streamToArrayBuffer(stream: ReadableStream<Uint8Array>, streamSize: number): Promise<Uint8Array> {
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

export async function parseEmail(message: ForwardableEmailMessage, maxSize: number, maxSizePolicy: MaxEmailSizePolicy): Promise<EmailCache> {
    const id = crypto.randomUUID();
    const cache: EmailCache = {
        id,
        messageId: message.headers.get('Message-ID') || id,
        from: message.from,
        to: message.to,
        subject: message.headers.get('Subject') || '',
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
        const msg = `Error parsing email: ${(e as Error).message}`;
        cache.text = msg;
        cache.html = msg;
    }
    return cache;
}
