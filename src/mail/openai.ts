export async function sendOpenAIRequest(key: string, endpoint: string, model: string, prompt: string): Promise<string> {
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
