var express = require('express');
var path = require('path');
var serveIndex = require('serve-index')
var router = express.Router();

router.use('/list', serveIndex(path.join(__dirname, "../public/videos")));

router.use('/list/:cat', function(req, res, next) {
  var cat = req.params.uid;
  serveIndex(path.join(__dirname, "../public/videos/"+cat));
});

router.get('/*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/videos' + req.url));
});

module.exports = router;
