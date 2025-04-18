import ffmpeg from 'fluent-ffmpeg';

export function createVideoWithAudio(imagePath: string, audioPath: string): Promise<string> {
  const outputPath = `public/videos/reel-${Date.now()}.mp4`;

  return new Promise((resolve, reject) => {
    ffmpeg()
      .addInput(imagePath)
      .loop(10)
      .addInput(audioPath)
      .videoCodec('libx264')
      .outputOptions(['-pix_fmt yuv420p', '-shortest'])
      .save(outputPath)
      .on('end', () => resolve(outputPath))
      .on('error', reject);
  });
}
