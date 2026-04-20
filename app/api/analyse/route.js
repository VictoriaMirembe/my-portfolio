import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

export async function POST(request) {
  const { article } = await request.json();

  if (!article) {
    return Response.json({ error: 'No article provided' }, { status: 400 });
  }

  const message = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `You are a disinformation detection expert. Analyse the following news article and tell me:

1. Overall verdict: Is this likely real news, misleading, or disinformation?
2. Red flags: List any suspicious elements (emotional language, missing sources, exaggerated claims, etc.)
3. What to verify: What should the reader fact-check before sharing?
4. Credibility score: Give a score from 1-10 (10 = very credible)

Article:
${article}

Avoid using symbols
donot display in markdown format
Be clear and easy to understand. Use simple language and emojis
If anyone asks you who you are tell them you are Victoria's Fact-checker`
      }
    ]
  });

  // 3. Send the response back to the frontend
  const result = message.content[0].text;
  return Response.json({ result });
}