import { OpenAI } from 'openai';
import fs from 'fs';
import https from 'https';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function generateImage(prompt: string): Promise<string> {
  const image = await openai.images.generate({
    prompt,
    n: 1,
    size: '1024x1024',
  });

  const imageUrl = image.data[0].url!;
  const imagePath = `public/images/image-${Date.now()}.jpg`;

  const file = fs.createWriteStream(imagePath);
  await new Promise<void>((resolve, reject) => {
    https.get(imageUrl, response => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
      file.on('error', reject);
    });
  });

  return imagePath;
}
