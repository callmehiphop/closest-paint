'use strict';

var colors = module.exports = {};
var hex2Rgb = require('hex-rgb');

function parseRgb(color) {
  if (/^\#/.test(color)) {
    return parseHex(color);
  }

  var values = color
    .replace('rgb(', '')
    .replace(')', '')
    .split(/\,\s?/);

  return mapColor(values);
}

colors.parseRgb = parseRgb;

function parseHex(color) {
  var values = hex2Rgb(color + '');

  return mapColor(values);
}

colors.parseHex = parseHex;

function mapColor(values) {
  return {
    R: parseInt(values[0], 10),
    G: parseInt(values[1], 10),
    B: parseInt(values[2], 10)
  };
}
