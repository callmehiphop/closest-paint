// http://www.thepaintstudio.com/colors.php#/clark/1/21
'use strict';

var colorParser = require('../colors');

var BRAND = 'Clark + Kensington';

function getJSON() {
  return Promise.resolve(require('./json/ck.json'));
}

function mapColors(colors) {
  return colors.map(function(color) {
    return {
      brand: BRAND,
      name: color.name,
      color: colorParser.parseHex(color.hexa)
    };
  });
}

module.exports = function() {
  return getJSON().then(mapColors);
};

module.exports.brand = BRAND;