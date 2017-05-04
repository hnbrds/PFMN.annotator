var express = require('express');
var path = require('path');
var serveIndex = require('serve-index')
var router = express.Router();
var url = require("url")

var sys = require('util')
var cp = require('child_process');
var ffmpeg = require('ffmpeg');
var math = require('mathjs');

function puts(error, stdout, stderr) { sys.puts(stdout) }

router.use('/list', serveIndex(path.join(__dirname, "../public/videos")));

router.use('/list/:cat', function(req, res, next) {
  var cat = req.params.uid;
  serveIndex(path.join(__dirname, "../public/videos/"+cat));
});

router.get('/fps/*', function(req, res, next) {
  var vid = url.parse(req.url).pathname;
  vid = "public/videos" + vid.slice(4, vid.length);

  var re = /\d+(\.\d+)? fps/
  var info
  try{
    info = JSON.parse(cp.execSync("ffprobe -v quiet -print_format json -show_format -show_streams " + vid).toString('utf-8'));
  } catch(err){}
  console.log("RESULT:", info);
  res.send(JSON.stringify({ fps : math.eval(info.streams[0].avg_frame_rate) }));
});

router.get('/*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/videos' + req.url));
});

module.exports = router;
