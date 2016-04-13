// http://www.thepaintstudio.com/colors.php#/opi/560
'use strict';

var colorParser = require('../colors');

var BRAND = 'OPI';

function getJSON() {
  return Promise.resolve(require('./json/opi.json'));
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