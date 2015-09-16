var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SisClinica' });
});


var multer = require('multer');

//var upload = multer({dest:'uploads/'});

//var cpUpload = upload.single('postImg');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, req.body.pacienteid+file.originalname)
  }
})

var upload = multer({ storage: storage })
var cpUpload = upload.single('file');

router.post('/createpost', function(req,res){
    cpUpload(req, res, function (err) {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    }
    res.send("")
  })
})

module.exports = router;
