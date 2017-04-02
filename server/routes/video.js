var express = require('express');
var path = require('path');
var serveIndex = require('serve-index')
var router = express.Router();

router.use('/list/360MV', serveIndex(path.join(__dirname, "../public/videos/360MV")));
router.use('/list/360wedding', serveIndex(path.join(__dirname, "../public/videos/360wedding")));
router.use('/list/360surfing', serveIndex(path.join(__dirname, "../public/videos/360surfing")));
router.use('/list/360biking', serveIndex(path.join(__dirname, "../public/videos/360biking")));

router.get('/*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/videos' + req.url));
});

module.exports = router;
