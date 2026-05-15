module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { category } = req.body;

  const catLabels = {
    all: 'Pick a random category from: SBAR communication, patient teaching, nursing abbreviations & charting, emergency situations, or patient symptom slang.',
    sbar: 'Category: SBAR communication with doctors and colleagues',
    teaching: 'Category: Patient teaching and discharge education',
    charting: 'Category: Nursing abbreviations and charting English',
    emergency: 'Category: Emergency and rapid response situations',
    slang: 'Category: Patient symptom slang and informal expressions'
  };

  const systemPrompt = `You are a clinical English quiz generator for Korean nurses working in the US. Generate ONE multiple-choice question.

${catLabels[category] || catLabels.all}

Rules:
- Question must test real, practical clinical English used in US hospitals
- 4 answer choices, exactly one correct
- Include a brief Korean hint/context (1 sentence) to help understand the situation
- Explanation should be educational and practical (2-3 sentences max)
- Vary difficulty across requests: easy vocab, moderate phrases, harder idiomatic expressions

Respond ONLY in this exact JSON format, no extra text, no markdown:
{
  "category": "SBAR소통|Patient Teaching|약어&차팅|응급상황|환자슬랭",
  "question": "...",
  "korean_hint": "...",
  "choices": ["A. ...", "B. ...", "C. ...", "D. ..."],
  "correct_index": 0,
  "explanation": "..."
}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: 'user', content: 'Generate a clinical English quiz question now.' }]
      })
    });

    const data = await response.json();
    const raw = data.content?.find(b => b.type === 'text')?.text || '';
    const clean = raw.replace(/```json|```/g, '').trim();
    const question = JSON.parse(clean);

    res.status(200).json(question);
  } catch (error) {
    console.error('Quiz generation error:', error);
    res.status(500).json({ error: 'Failed to generate question' });
  }
};
