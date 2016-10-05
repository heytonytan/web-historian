var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    if (req.url === '/') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html'); //?
      // res.setHeader()
      fs.readFile('web/public/index.html', 'utf-8', function(error, data) {
        if (error) {
          throw error;
        }
        res.write(data);
        res.end();
      });
    } else {
      var checkURL = url.parse(req.url);
      var path = 'test/testdata/sites' + checkURL.pathname;
      console.log(path);
      fs.exists(path, function(exists) {
        if (!exists) {
          console.log('not exists');
          res.statusCode = 404;
          res.end();
        }
        fs.readFile(path, 'utf-8', function(error, data) {
          if (error) {
            throw error;
          }
          console.log('pathdata', data);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html'); //?
          res.write(data);
          res.end();
        });
      });
    }
  }
  // res.end(archive.paths.list);
};
