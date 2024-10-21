import stylish from './stylish.js';
import plain from './plain.js';
import { PLAIN, STYLYSH, JSON_ID } from '../constants.js';

const output = {
  [STYLYSH]: stylish,
  [PLAIN]: plain,
  [JSON_ID]: (data) => JSON.stringify(data),
};

export default (data, format) => (output[format] || stylish)(data);
