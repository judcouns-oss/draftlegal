export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  const systemPrompt = 'You are a legal document generator. Write professional contracts in plain text only. Do NOT use markdown symbols like **, ##, --, or #. Use only plain sentences and numbered sections like "1. PARTIES". No asterisks, no pound signs, no dashes as separators.';

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1500,
      system: systemPrompt,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}
