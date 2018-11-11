var express = require('express');
var bodyParser = require('body-parser');
var login = require('./routes/login');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var router = express.Router();






router.post('/login',login.login);
app.use('/api', router);



app.listen(3000, function(){
    console.log('Listening....');
});