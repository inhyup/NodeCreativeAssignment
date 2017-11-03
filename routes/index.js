var fs = require('fs');
var express = require('express');
var router = express.Router();
var https = require('https');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('weather.html', { root:  'public' });
    //res.render('index', { title: 'Express' });
});


router.get('/getcity',function(req,res,next) {

  var myRe = new RegExp("^" + req.query.q.toLowerCase());
  console.log(myRe);
  
  fs.readFile(__dirname + '/cities.dat.txt',function(err,data) {
    if(err) throw err;
    var cities = data.toString().split('\n');
    var jsonresult = [];
    
    console.log(jsonresult);
    for(var i = 0; i < cities.length; i++) {
      var result = cities[i].toLowerCase().search(myRe);
      if(result != -1) {
        console.log(cities[i]);
        jsonresult.push({city:cities[i]});
      }
    }
    res.status(200).json(jsonresult);
  });
});


router.get('/word', function(req, res, next) {
  var word = req.query.w;
  var url = "https://owlbot.info/api/v1/dictionary/" + word+ "?format=json";    

  request(url).pipe(res);
});


/*
router.get('/word',function(req,res)
{
  var url = "https://owlbot.info/api/v1/dictionary/" + req.query.word + "?format=json";
  https.get(url, function(owl){
    owl.pipe(res);
  });
});
*/

/*
router.get('/getword', function(req, res) {
  var word = req.query.w;
  var url = 'https://owlbot.info/api/v1/dictionary/' + word;
  console.log(word);
  https.get(url, function(owl) {
    var str = "";
    response.on('data', function(d){
      str += d;
    })
    response.on('end', function(d) {
      res.json(str);m[]
    })
    owl.pipe(res)
  });
});
*/

/*
router.get('getdat', function(req, res, next) {
  var word = req.query.w.toLowerCase()
  https.get('https://owlbot.info/api/vi/dictionary/owl' + word, function(response) => {
    var str ='';
    response.on('data', function(d) {
      str += d;
    })
    response.on('end', function(d) {
      res.json(str);
    })
  })

})
*/

module.exports = router;
