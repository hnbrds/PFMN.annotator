var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();

router.post('/save', function(req, res, next) {

  writeLog(req.body, function(err) {
    if(err) {
      res.status(500).send('Not saved');
      return;
    }
    res.send("Data saved");
  });
});

function writeLog(data, callback) {
  console.log('Saving data to ' + __dirname+'/../../log/log.json');
  console.log(data.vid);
  //fs.writeFile(path.join(__dirname+'/../../../log/'+data.vid+'.json'), JSON.stringify(data), callback);
  fs.appendFile(path.join(__dirname+'/../../../log/'+data.vid+'.json'), JSON.stringify(data)+'\n', callback);
}

module.exports = router;