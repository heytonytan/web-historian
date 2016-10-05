var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
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
  }
  // res.end(archive.paths.list);
};
