import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testList = [
  'yaml',
  'json',
];
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

const stylishResult = readFixture('expect_stylish.txt');
const plainResult = readFixture('expect_plain.txt');
const jsonResult = readFixture('expect_json.json');

describe('gendiff', () => {
  test.each(testList)('gendiff %s', (format) => {
    const filepath1 = getFixturePath(`file1.${format}`);
    const filepath2 = getFixturePath(`file2.${format}`);
    expect(genDiff(filepath1, filepath2)).toEqual(stylishResult);
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(stylishResult);
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(plainResult);

    const data = genDiff(filepath1, filepath2, 'json');
    expect(() => JSON.parse(data)).not.toThrow();
    expect(genDiff(filepath1, filepath2, 'json')).toEqual(jsonResult);
  });
});
