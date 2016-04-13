// sherwin-williams.com
'use strict';

var cheerio = require('cheerio');
var scrape = require('../phantom-scraper');
var colorParser = require('../colors');

var ADDRESS = 'http://www.sherwin-williams.com/homeowners/color/find-and-explore-colors/paint-colors-by-family/';
var BRAND = 'Sherwin-Williams';

function getColors(html) {
  var $ = cheerio.load(html);
  var colors = [];

  $('.color-swatch').each(function() {
    var $swatch = $(this);
    var color = $swatch.data('color-hex');

    if (!color) {
      return;
    }

    colors.push({
      brand: BRAND,
      name: $swatch.data('search-by').split('|')[0],
      color: colorParser.parseHex(color)
    });
  });

  return colors;
}

module.exports = function() {
  return scrape(ADDRESS).then(getColors);
};

module.exports.brand = BRAND;