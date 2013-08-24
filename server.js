// Generated by CoffeeScript 1.6.3
(function() {
  var Camera, app, basename, camera, express, fid, parse;

  parse = require('url').parse;

  basename = require('path').basename;

  Camera = require('webcamera');

  camera = Camera.create({
    path: './pictures',
    phantom: './node_modules/phantomjs/bin/phantomjs'
  });

  fid = 0;

  express = require('express');

  app = express();

  app.use(express.query());

  app.get('/', function(req, res) {
    var hostname, url;
    url = req.query.url;
    hostname = parse(url).hostname;
    return camera.shot(url, function(err, data) {
      if (err == null) {
        return res.sendfile(data);
      } else {
        return res.send(403, 'Sorry! something goes wrong.');
      }
    });
  });

  app.listen(process.env.OPENSHIFT_NODEJS_PORT || process.env.OPENSHIFT_INTERNAL_PORT || 8080);

}).call(this);
