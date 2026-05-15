module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { category } = req.body || {};

  const catMap = {
    sbar: 'SBAR communication with doctors and colleagues',
    teaching: 'Patient teaching and discharge education',
    charting: 'Nursing abbreviations and charting English',
    emergency: 'Emergency and rapid response situations',
    slang: 'Patient symptom slang and informal expressions'
  };

  const catInstruction = catMap[category] || 'Pick any one clinical English category randomly';

  const systemPrompt = 'You are a clinical English quiz generator for Korean nurses in the US. Category: ' + catInstruction + '. Generate ONE multiple-choice question. Rules: test real practical clinical English, 4 choices exactly one correct, include a brief Korean hint (1 sentence), explanation 2-3 sentences. Respond ONLY with valid JSON, no markdown, no backticks: {"category":"short category name in Korean","question":"...","korean_hint":"...","choices":["A. ...","B. ...","C. ...","D. ..."],"correct_index":0,"explanation":"..."}';

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
        max_tokens: 800,
        system: systemPrompt,
        messages: [{ role: 'user', content: 'Generate the quiz question now.' }]
      })
    });

    const data = await response.json();

    if (!data.content || !data.content[0]) {
      console.error('Unexpected API response:', JSON.stringify(data));
      return res.status(500).json({ error: 'Invalid API response' });
    }

    const raw = data.content[0].text || '';
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('No JSON found in:', raw);
      return res.status(500).json({ error: 'No JSON in response' });
    }

    const question = JSON.parse(jsonMatch[0]);
    res.status(200).json(question);

  } catch (error) {
    console.error('Quiz generation error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
