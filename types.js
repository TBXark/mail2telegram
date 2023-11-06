
/**
 * @typedef {object} EmailMessage
 * @property {string} from - The sender of the email.
 * @property {string} to - The recipient of the email.
 * @property {Headers} headers - The headers of the email.
 * @property {ReadableStream} raw - The raw content of the email.
 * @property {number} rawSize - The size of the raw content of the email.
 * @property {function(string): void} setReject - Reject the email with the specified reason.
 * @property {function(string, Headers?): Promise<void>} forward - Forward the email to the specified recipient.
 * @property {function(EmailMessage): Promise<void>} reply - Reply the email to the sender.
 */

/**
 * @typedef {object} Database
 * @property {function(string, object, object?): Promise<void>} put - Put a value into the database.
 * @property {function(string): Promise<string>} get - Get a value from the database.
 * @property {function(string): Promise<void>} delete - Delete a value from the database.
 */

/**
 * @typedef {object} Environment
 * @property {string} TELEGRAM_TOKEN - The Telegram bot token.
 * @property {string} TELEGRAM_ID - The Telegram chat ID.
 * @property {string} FORWARD_LIST - The list of email addresses to forward the email to.
 * @property {string} BLOCK_LIST - The list of email addresses to block.
 * @property {string} WHITE_LIST - The list of email addresses to allow.
 * @property {string} MAIL_TTL - The TTL of the email in seconds.
 * @property {string} DOMAIN - The domain name of the service.
 * @property {Database} DB - The database object.
 */

/**
 * @typedef {object} TelegramWebhookRequest
 * @property {object} callback_query
 * @property {string} callback_query.data
 * @property {object} callback_query.message
 * @property {number} callback_query.message.chat.id
 * @property {number} callback_query.message.message_id
 */

/**
 * @typedef {object} EmailCache
 * @property {string} id - The ID of the email cache.
 * @property {string} messageId - The Message-ID of the email.
 * @property {string} from - The sender of the email.
 * @property {string} to - The recipient of the email.
 * @property {string} subject - The subject of the email.
 * @property {string} [html] - The HTML content of the email.
 * @property {string} [text] - The text content of the email.
 */
