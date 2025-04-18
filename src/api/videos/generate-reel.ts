import type { NextApiRequest, NextApiResponse } from 'next';
import { generateScript } from '@/lib/openaiScript';
import { textToSpeech } from '@/lib/pollyTTS';
import { generateImage } from '@/lib/imageGen';
import { createVideoWithAudio } from '@/lib/videoBuilder';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { athlete } = req.body;

  try {
    const script = await generateScript(athlete);
    const audioPath = await textToSpeech(script);
    const imagePath = await generateImage(`${athlete.name} ${athlete.sport}`);
    const videoPath = await createVideoWithAudio(imagePath, audioPath);

    const publicPath = videoPath.replace('public', '');
    res.status(200).json({ script, videoUrl: publicPath });
  } catch (err) {
    console.error('Reel generation failed:', err);
    res.status(500).json({ error: 'Failed to generate reel' });
  }
}
