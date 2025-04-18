import { PollyClient, SynthesizeSpeechCommand } from '@aws-sdk/client-polly';
import { writeFile } from 'fs/promises';
import { Readable } from 'stream';

const polly = new PollyClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function textToSpeech(text: string): Promise<string> {
  const command = new SynthesizeSpeechCommand({
    OutputFormat: 'mp3',
    Text: text,
    VoiceId: 'Joanna',
  });

  const response = await polly.send(command);
  const filePath = `public/audio/narration-${Date.now()}.mp3`;

  if (response.AudioStream instanceof Readable) {
    const chunks: any[] = [];
    for await (const chunk of response.AudioStream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    await writeFile(filePath, buffer);
  }

  return filePath;
}
