// http://www.benjaminmoore.com/
'use strict';

var BRAND = 'Benjamin Moore'

function getJSON() {
  return Promise.resolve(require('./json/bm.json'));
}

function mapColors(colors) {
  return colors.map(function(color) {
    return {
      brand: BRAND,
      name: color.colorName,
      color: color.RGB
    };
  });
}

module.exports = function() {
  return getJSON().then(mapColors);
};

module.exports.brand = BRAND;