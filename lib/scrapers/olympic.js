// Olympic
'use strict';

var request = require('request');

var requestOptions = {
  url: 'https://secure.ppgac.com/api/collections?brandId=1&language=en',
  headers: {
    'Content-Type': 'application/json'
  }
};

var BRAND = 'Olympic';

function getJSON() {
  return new Promise(function(resolve, reject) {
    request(requestOptions, function(err, response, json) {
      if (err || response.statusCode !== 200) {
        return reject(err);
      }

      resolve(JSON.parse(json));
    });
  });
}

function reduceGroups(groups) {
  return groups.filter(function(collection) {
    return collection.CollectionId !== 1838 && collection.CollectionId !== 1884;
  })
  .map(function(collection) {
    return collection.Collections;
  })
  .reduce(function(prev, collection) {
    return prev.concat(collection);
  }, [])
  .map(function(collection) {
    return collection.Colors;
  })
  .reduce(function(prev, colors) {
    return prev.concat(colors);
  }, [])
  .map(function(color) {
    return {
      brand: BRAND,
      name: color.ColorName,
      color: {
        R: color.RgbR,
        G: color.RgbG,
        B: color.RgbB
      }
    };
  });
}

module.exports = function() {
  return getJSON().then(reduceGroups);
};

module.exports.brand = BRAND;