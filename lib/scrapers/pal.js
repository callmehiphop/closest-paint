// Pratt and Lambart
'use strict';

var colorParser = require('../colors');

var BRAND = 'Pratt and Lambart';

function getJSON() {
  return Promise.resolve(require('./json/pal.json'));
}

function mapColors(colors) {
  return colors.map(function(color) {
    return {
      brand: BRAND,
      name: color['-name'],
      color: colorParser.parseHex(color['-rgb'])
    };
  });
}

module.exports = function() {
  return getJSON().then(mapColors);
};

module.exports.brand = BRAND;