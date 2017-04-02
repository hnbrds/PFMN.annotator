var express = require('express');
var path = require('path');
var serveIndex = require('serve-index')
var router = express.Router();

router.get('/list', function(req, res, next) {
  console.log("Get list request");
  res.send({'list': serveIndex(path.join(__dirname, '../'))});
});

router.get('/*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/videos' + req.url));
});

module.exports = router;
