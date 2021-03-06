var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;


var config = {
  host: 'db.imad.hasura-app.io',
  user: 'shashanklokanadham',
  password: process.env.DB_PASSWORD,
  database: 'shashanklokanadham',
};
var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/article-one', function(req, res){
  res.sendFile(path.join(__dirname, 'ui', 'article-one.html')); 
});
app.get('/article-two', function(req, res){
   res.send('requested for article two and it will be served here'); 
});
var pool = new Pool(config);
app.get('/test-db',function(req, res){
   //make a request
   //return a response with a response
   pool.query('SELECT * FROM test', function (err,result){
      if(err){
          res.status(500).send(err.toString());
      } else{
          res.send(JSON.stringify(result.rows));
      }
   });
});



app.get('/article-three', function(req, res){
   res.send('requested for article three and it will be served here'); 
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
