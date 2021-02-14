const crypto = require('crypto');
const { parse, sep } = require('path');

const hash = (data) => crypto.createHash('md5').update(data).digest('hex');

/** @type {import('@jest/transform').Transformer} */
module.exports = {
  getCacheKeyL: (data, path) => hash([path, data].join('|')),

  process(data, path) {
    const { dir, ext, name } = parse(path);
    const split = [...dir.split(sep), name];
    const lastSrcIndex = split.lastIndexOf('src');
    const result = split.slice(lastSrcIndex);
    const relPath = result.join('/');

    return `module.exports = "mocked://${relPath}-${hash(data)}${ext}"`;
  },

  canInstrument: false,
};
