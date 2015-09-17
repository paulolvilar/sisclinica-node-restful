var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/:filename', function(req, res, next) {
    var filename='./uploads/'+req.param('filename')
    res.writeHead(200, {'Content-Type': 'image/*' });

    fs.readFile(filename, function(err, data) {
        if (err) throw err;
        res.write(data);
        res.end(data, 'binary');
    });
});


module.exports = router;
