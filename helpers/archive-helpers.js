var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf-8', function(error, data) {
    if (error) {
      throw error;
    }
    var urlArray = data.split('\n');
    callback(urlArray);
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(urlArray) {
    var exists = urlArray.indexOf(url) !== -1;
    callback(exists);
  });
};

exports.addUrlToList = function(url, callback) {
  fs.readFile(exports.paths.list, function(error, data) {
    if (error) {
      throw error;
    }
    var newList = data + url + '\n';
    fs.writeFile(exports.paths.list, newList, function(err) {
      if (error) {
        throw error;
      }
      callback();
    });
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.stat(exports.paths.archivedSites + '/' + url, function(error, stats) {
    if (error) {
      // throw error;
      callback(false);
    } else {
      callback(true);     
    }
  });
};

exports.downloadUrls = function(urlArray) {
  urlArray.forEach(function(url) {
    // Ref: http://stackoverflow.com/questions/26963389/how-to-put-scraping-content-to-html-node-js-cheerio
    request('http://'+url, function(error, response, html) {

      if (error) {
        throw error;
      }
      if (!error && response.statusCode === 200) {
        console.log(html);
        fs.appendFile(exports.paths.archivedSites + '/' + url, html, function(error) {
          if (error) {
            throw error;
          }
        });
      }
    });
  });
};


















