'use strict';

var phantom = require('phantom');

function scrape(address) {
  return phantom.create().then(function(ph) {
    return ph.createPage().then(function(page) {
      return page.open(address).then(function(status) {
        return page.property('content').then(function(content) {
          page.close();
          ph.exit();

          return content;
        });
      });
    });
  });
}

module.exports = scrape;