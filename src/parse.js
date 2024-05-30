import PostalMime from 'postal-mime';
import {convert} from 'html-to-text';
import './types.js';


/**
 * Generates a random ID of the specified length.
 *
 * @param {number} length - The length of the random ID to generate.
 * @return {string} - The randomly generated ID.
 */
function randomId(length) {
  const elements =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
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
  const result = new Uint8Array(streamSize);
  let bytesRead = 0;
  const reader = stream.getReader();
   
  while (true) {
    if (bytesRead >= streamSize) {
      break;
    }
    const {done, value} = await reader.read();
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
 * @param {EmailMessage} message - The email message to be parsed.
 * @param {number} maxSize - The maximum size of the email in bytes.
 * @param {string} maxSizePolicy - The policy of emails that exceed the maximum size.
 * @return {Promise<EmailCache>} - A promise that resolves to the ID of the saved email.
 */
export async function parseEmail(message, maxSize, maxSizePolicy) {
  const id = randomId(32);
  const cache = {
    id: id,
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
