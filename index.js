'use strict';

var glob = require('glob');
var path = require('path');
var _ = require('lodash');
var diff = require('color-diff');
var hex2Rgb = require('hex-rgb');

var scrapers = glob.sync('./lib/scrapers/*.js').map(function(file) {
  return require(path.resolve(file));
});

var closestPaint = module.exports = {};

closestPaint.brands = scrapers.map(function(scraper) {
  return { name: scraper.brand };
});

closestPaint.getPaints = function(options) {
  var requests = scrapers.filter(function(scraper) {
    return options.brands.indexOf(scraper.brand) > -1;
  }).map(function(scraper) {
    return scraper();
  });

  return Promise.all(requests)
    .then(flattenSwatches)
    .then(getClosestColor.bind(null, options.colors))
};

function flattenSwatches(swatches) {
  return swatches.reduce(function(prev, brand) {
    return prev.concat(brand);
  }, []);
}

function getClosestColor(colors, swatches) {
  var palette = swatches.map(function(swatch) {
    return swatch.color;
  });

  return colors.map(function(color) {
    var rgb = hex2Rgb(color);
    var closest = diff.closest({ R: rgb[0], G: rgb[1], B: rgb[2] }, palette);
    var swatch = _.find(swatches, { color: closest });

    swatch.match = color;

    return swatch;
  });
}
