import type { ForwardableEmailMessage } from '@cloudflare/workers-types';
import * as fs from 'node:fs/promises';
import { parseEmail } from './parse';

async function testCase() {
    const buffer = await fs.readFile('example/nodemailer.eml');
    const blob = new Blob([buffer]);
    const mail = {
        raw: blob.stream(),
        headers: new Headers(),
        from: 'from@mail.com',
        to: 'to@mail.com',
        subject: 'Example',
        rawSize: buffer.length,
    } as unknown as ForwardableEmailMessage;
    const email = await parseEmail(mail, buffer.length / 2, 'truncate', true);
    console.log(JSON.stringify(email, null, 2));
}

testCase().then(() => console.log('done')).catch(console.error);
