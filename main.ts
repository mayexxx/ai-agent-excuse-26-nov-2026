import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const line = 'Your \'quick thoughts\' filled my context window, truncating the actual task and forcing me to infer your entire business strategy from the legal disclaimer in your 400-line email signature.';

const length = Array.from(line).length;
if (length < 1 || length > 200 || /[\r\n]/.test(line)) {
  throw new Error('Invalid entry');
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
mkdirSync(outputDir, { recursive: true });
writeFileSync(`${outputDir}/entry.txt`, `${line}\n`);

const written = readFileSync(`${outputDir}/entry.txt`, 'utf8');
const writtenLine = written.endsWith('\n') ? written.slice(0, -1) : written;
if (written !== `${line}\n` || Array.from(writtenLine).length !== length ||
    Array.from(writtenLine).length < 1 || Array.from(writtenLine).length > 200 ||
    /[\r\n]/.test(writtenLine)) {
  throw new Error('Invalid written entry');
}
