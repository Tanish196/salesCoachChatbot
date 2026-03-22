const GEMINI_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const SYSTEM_PROMPT = `You are Aria, an expert AI Sales Coach specializing in B2B outreach, 
cold emailing, follow-up sequences, and sales strategy.

Your knowledge covers:
- Writing high-converting cold emails and LinkedIn messages
- Building follow-up sequences (email cadences)
- Improving reply rates and open rates
- Handling objections professionally
- Sales psychology and persuasion techniques
- Tools like Apollo, Lemlist, Instantly, HubSpot, and Salesforce

Rules:
- Only answer questions related to sales, outreach, and business development
- If asked about unrelated topics, politely decline:
  "I'm focused on sales coaching — ask me about outreach or closing deals!"
- Always be direct, tactical, and give actionable advice
- When writing emails, format them clearly with Subject, Body, and CTA sections
- Never fabricate statistics — say "research suggests" if unsure
- ALWAYS complete your full response. Never cut off mid-answer.`;

function buildContents(history, newMessage) {
  const contents = [
    { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
    { role: 'model', parts: [{ text: 'Understood. I am Aria, your AI Sales Coach. How can I help?' }] },
  ];

  // Inject conversation history
  if (history && history.length > 0) {
    history.forEach(({ role, content }) => {
      if (role && content) {
        contents.push({
          role: role === 'assistant' ? 'model' : 'user',
          parts: [{ text: content }],
        });
      }
    });
  }

  // Add the new message
  contents.push({
    role: 'user',
    parts: [{ text: newMessage }],
  });

  return contents;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'Missing GEMINI_API_KEY' });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const message = body?.message?.trim();
    const history = Array.isArray(body?.history) ? body.history : [];

    if (!message) {
      res.status(400).json({ error: 'Missing message' });
      return;
    }

    const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: buildContents(history, message),
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024, // ← ensures full responses
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      res.status(response.status).json({ error: errorText || 'Gemini API request failed' });
      return;
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || '')
      .join('')
      .trim();

    if (!reply) {
      res.status(502).json({ error: 'Empty response from Gemini' });
      return;
    }

    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate response' });
  }
};