import { readFileSync, writeFileSync } from 'node:fs';

const jobs = [
  {
    source: 'assets/qc/lunch-a.txt',
    output: 'assets/uis-qc-lunch-inspection-anonymized.webp'
  },
  {
    source: 'assets/qc/homestay-a.txt',
    output: 'assets/uis-qc-homestay-inspection-anonymized.webp'
  }
];

for (const job of jobs) {
  const base64 = readFileSync(job.source, 'utf8').replace(/\s+/g, '');
  const bytes = Buffer.from(base64, 'base64');

  // WebP files begin with RIFF....WEBP. Fail the build instead of deploying a broken image.
  const riff = bytes.subarray(0, 4).toString('ascii');
  const webp = bytes.subarray(8, 12).toString('ascii');
  if (riff !== 'RIFF' || webp !== 'WEBP') {
    throw new Error(`${job.source} is not a valid WebP source`);
  }

  writeFileSync(job.output, bytes);
  console.log(`QC image built: ${job.output} (${bytes.length} bytes)`);
}
