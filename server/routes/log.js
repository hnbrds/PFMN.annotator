var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();

router.post('/save', function(req, res, next) {
  if(req.body.log.length == 0){
    res.status(415).send({msg : "ERR : No log data"});
    return;
  }
  writeLog(req.body, function(err) {
    if(err) {
      res.status(500).send({msg : 'Not saved'});
      return;
    }
    res.send({ msg : "Data saved"});
  });
});

function writeLog(data, callback) {
  console.log('Saving data to ' + __dirname+'/../../log/log.json');
  console.log(data.vid);
  console.log(data.cat);
  var dir = path.join(__dirname, '/../../../log/'+ data.cat);
  if (!fs.existsSync(dir)){
    fs.mkdirSync((dir), {
      mode : 0o777
    });
  }
  fs.appendFile(path.join(dir +'/' +data.vid+'.json'), JSON.stringify(data)+'\n', {
    mode : 0o777
  }, callback);
  //fs.appendFileSync(path.join(dir +'/' +data.vid+'.json'), JSON.stringify(data)+'\n');
}

module.exports = router;
