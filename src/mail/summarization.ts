import type { Ai } from '@cloudflare/workers-types';

interface WorkersAiResponse {
    response?: string;
}

export async function summarizedByWorkerAI(ai: Ai, model: string, prompt: string): Promise<string> {
    const result = await ai.run(model as any, {
        messages: [
            {
                role: 'system',
                content: 'You are a professional email summarization assistant.',
            },
            {
                role: 'user',
                content: prompt,
            },
        ],
    }) as WorkersAiResponse | string;

    if (typeof result === 'string') {
        return result;
    }

    return result?.response ?? '';
}

export async function summarizedByOpenAI(key: string, endpoint: string, model: string, prompt: string): Promise<string> {
    if (!key || !endpoint || !model) {
        return 'Sorry, the OpenAI API is not configured properly.';
    }
    const resp = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${key}`,
        },
        body: JSON.stringify({
            model,
            messages: [
                {
                    role: 'system',
                    content: 'You are a professional email summarization assistant.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
        }),
    });
    if (!resp.ok) {
        throw new Error(`OpenAI API request failed: ${resp.status}`);
    }
    const body = await resp.json() as any;
    return body?.choices?.[0]?.message?.content || '';
}
