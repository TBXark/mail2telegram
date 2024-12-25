import type { KVNamespace } from '@cloudflare/workers-types';

export interface EmailHandleStatus {
    telegram: boolean;
    forward: string[];
}

export interface EmailCache {
    id: string;
    messageId: string;
    from: string;
    to: string;
    subject: string;
    html?: string;
    text?: string;
}

export type MaxEmailSizePolicy = 'unhandled' | 'continue' | 'truncate';

export interface Environment {
    TELEGRAM_TOKEN: string;
    TELEGRAM_ID: string;
    FORWARD_LIST: string;
    BLOCK_LIST: string;
    WHITE_LIST: string;
    DISABLE_LOAD_REGEX_FROM_DB: string;
    BLOCK_POLICY: string;
    MAIL_TTL: string;
    DOMAIN: string;
    MAX_EMAIL_SIZE?: string;
    MAX_EMAIL_SIZE_POLICY?: MaxEmailSizePolicy;
    OPENAI_API_KEY?: string;
    OPENAI_COMPLETIONS_API?: string;
    OPENAI_CHAT_MODEL?: string;
    SUMMARY_TARGET_LANG?: string;
    GUARDIAN_MODE?: string;
    DB: KVNamespace;
    DEBUG?: string;
}
