// behr.com
'use strict';

var cheerio = require('cheerio');
var scrape = require('../phantom-scraper');
var colorParser = require('../colors');

var ADDRESS = 'http://www.behr.com/consumer/colors/paint#colors';
var BRAND = 'Behr';

function getColors(html) {
  var $ = cheerio.load(html);
  var colors = [];

  $('.swatch').each(function() {
    var $swatch = $(this);
    var color = $swatch.css('background-color');

    if (!color) {
      return;
    }

    colors.push({
      brand: BRAND,
      name: $swatch.find('.name').text(),
      color: colorParser.parseRgb(color)
    });
  });

  return colors;
}

module.exports = function() {
  return scrape(ADDRESS).then(getColors);
};

module.exports.brand = BRAND;
