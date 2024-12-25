import type { EmailCache } from '../types';

export async function replyToEmail(token: string, email: EmailCache, message: string): Promise<void> {
    await sendEmail(token, email.to, [email.from], `Re: ${email.subject}`, message);
}

export async function sendEmail(token: string, from: string, to: string[], subject: string, text: string): Promise<void> {
    await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from,
            to,
            subject,
            text,
        }),
    });
}
