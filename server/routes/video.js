var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/list', function(req, res, next) {
  console.log("Get list request");
  res.send({'asdf':'asdf'});
});

router.get('/*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/videos' + req.url));
});

module.exports = router;
