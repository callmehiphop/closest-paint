// colorhouse
'use strict';

var request = require('request');
var cheerio = require('cheerio');
var colorParser = require('../colors');

var ADDRESS = 'http://www.colorhousepaint.com/all-colors/';
var BRAND = 'Colorhouse';

function getHtml() {
  return new Promise(function(resolve, reject) {
    request(ADDRESS, function(err, response, body) {
      if (err || response.statusCode !== 200) {
        return reject(err);
      }
      resolve(body);
    })
  });
}

function getColors(html) {
  var $ = cheerio.load(html);
  var colors = [];

  $('.choose-color').each(function() {
    var $color = $(this);

    colors.push({
      brand: BRAND,
      name: $color.data('title'),
      color: colorParser.parseHex($color.data('color'))
    });
  });

  return colors;
}

module.exports = function() {
  return getHtml().then(getColors);
};

module.exports.brand = BRAND;