import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function generateScript(athlete: {
  name: string;
  sport: string;
  teams?: string[];
  careerSpan?: string;
  achievements?: string[];
  knownFor?: string;
}, duration: number = 30): Promise<string> {
  const wordCount = Math.floor((duration / 60) * 160);

  const prompt = `
    Create a compelling script for a ${duration}-second video about ${athlete.name}, a ${athlete.sport} athlete.
    Include career highlights, teams, achievements, and fun facts. Keep it engaging and ~${wordCount} words.

    Athlete Info:
    - Name: ${athlete.name}
    - Sport: ${athlete.sport}
    - Teams: ${athlete.teams?.join(', ') || 'N/A'}
    - Career Span: ${athlete.careerSpan || 'N/A'}
    - Achievements: ${athlete.achievements?.join(', ') || 'N/A'}
    - Known For: ${athlete.knownFor || 'N/A'}
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a sports documentary scriptwriter.' },
      { role: 'user', content: prompt },
    ],
    max_tokens: 500,
    temperature: 0.7,
  });

  return response.choices[0].message.content?.trim() || '';
}
