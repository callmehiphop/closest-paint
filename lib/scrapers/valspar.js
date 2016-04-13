// http://www.valsparpaint.com/
'use strict';

var request = require('request');

var ADDRESS = 'http://www.valsparpaint.com/vservice/json/colors/color-wall?localeId=1001&channelId=1001';
var BRAND = 'Valspar';

function getJSON() {
  return new Promise(function(resolve, reject) {
    request(ADDRESS, function(err, response, json) {
      if (err || response.statusCode !== 200) {
        return reject(err);
      }

      resolve(JSON.parse(json).data);
    });
  });
}

function reduceGroups(groups) {
  return groups.reduce(function(prev, group) {
    return prev.concat(group.colors);
  }, []);
}

function mapColors(colors) {
  return colors.map(function(color) {
    return {
      brand: BRAND,
      name: color.name,
      color: {
        R: color.rgb.r,
        G: color.rgb.g,
        B: color.rgb.b
      }
    };
  });
}

module.exports = function() {
  return getJSON().then(reduceGroups).then(mapColors);
};

module.exports.brand = BRAND;