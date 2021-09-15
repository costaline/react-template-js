/* resource for sass-resources-loader in .cracorc.js */
const path = require('path');

const resources = ['variables.scss'];

module.exports = resources.map((file) => path.resolve(__dirname, file));
