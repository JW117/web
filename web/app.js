var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
 
 
//var db = require('./db');
 
//db 관련 코드
var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 100,   //접속 인원 수. 앱 접속 인원 많아지면 증가시킬 필요
  host: '13.124.118.136',
  user: 'root',
  password: '1111111111',
  database: 'bestfood',
  port: '3306'
});
 
pool.getConnection(function(err, connection) {
  if (err) {
    console.log('Unable to connect to MySQL.')
    process.exit(1)
  } else {
    console.log('MYSQL CONNECT');
  }
});
 
 
var app = express();
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
 
app.use('/member', require('./routes/member'));
app.use('/food', require('./routes/food'));
app.use('/keep', require('./routes/keep'));
 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
 
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
 
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
 
module.exports = app;
