import { readFileSync, writeFileSync } from 'node:fs';

const jobs = [
  {
    source: 'assets/qc/lunch-a.txt',
    output: 'assets/qc-lunch-report-20260906.webp'
  },
  {
    source: 'assets/qc/homestay-a.txt',
    output: 'assets/qc-homestay-report-20260906.webp'
  }
];

for (const job of jobs) {
  const base64 = readFileSync(job.source, 'utf8').replace(/\s+/g, '');
  const bytes = Buffer.from(base64, 'base64');

  const riff = bytes.subarray(0, 4).toString('ascii');
  const webp = bytes.subarray(8, 12).toString('ascii');
  if (riff !== 'RIFF' || webp !== 'WEBP' || bytes.length < 8000) {
    throw new Error(`${job.source} is not a valid WebP source`);
  }

  writeFileSync(job.output, bytes);
  console.log(`QC image built: ${job.output} (${bytes.length} bytes)`);
}
