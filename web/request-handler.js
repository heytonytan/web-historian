var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var checkURL = url.parse(req.url);
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
      var path = 'test/testdata/sites' + checkURL.pathname;
      fs.exists(path, function(exists) {
        if (!exists) {
          res.statusCode = 404;
          res.end();
        } else {
          fs.readFile(path, 'utf-8', function(error, data) {
            if (error) {
              throw error;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html'); //?
            res.write(data);
            res.end();
          });
        }
      });
    }
  }
  if (req.method === 'POST') {
    var chum = '';
    req.on('data', function(chunk) {
      chum += chunk;
      chum = chum.slice(4);
    });

    fs.readFile('test/testdata/sites.txt', 'utf-8', function(err, data){
      if (err) {
        throw err;
      } else {
        data = data + chum + '\n';
        fs.writeFile('test/testdata/sites.txt',data, function(err) {
          if (err) {
            throw err;
          }
          res.statusCode = 302;
          console.log('you did it!', data);
          res.end();
        });   
      }
    });
  }
};
