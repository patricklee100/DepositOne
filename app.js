var express = require("express");
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var session = require("express-session");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var flash = require("connect-flash");
var path = require("path");


app = express();
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser("secret password"));
app.use(session({
   secret: "secret password",
   resave: true,
   saveUninitialized: true
}));
   
app.use(flash());

var kittySchema = mongoose.Schema({
   name: {
      type: String,
      match: /[a-z]+/,
      lowercase: true,
      validate: {
         validator: function(val) {
           console.log("validator has been activated: ", val);
         return true;
         }
      }
   }            
});



var count = 0;
var countSchema = mongoose.Schema({
         count: Number
      });
      
var Count = mongoose.model('CountModel', countSchema);
      
app.get('/',function(req,res,next){
      count++;
      
      var doc = new Count({count: count});
      doc.save(function(err, doc) {
         console.log(doc);
      });
     res.end(String(count));
});

app.get('/r',function(req,res,next) {
   Count.remove({count: {$lt: count}}, function(err) {
   });   
   res.end('removed');
   
});

app.locals.localName = "my Local Name is Patrick Lee";

app.get('/page', function(req, res, next) {
   res.render('index', { name: 'Patrick Lee'} );
   next();
});

app.get('/query', function(req, res, next) {
   res.send(JSON.stringify(req.query));
   req
});


app.get('/session', function(req, res, next) {
   var sess = req.session;
   if (!sess.views) {
      sess.views = 1;
   } else {
      sess.views++;
   }
   res.write("<div><h1>session ID: " + sess.id + "</h1></div>");
   res.write("sessionID: " + req.sessionID);
   res.end(" " + sess.views);
});

app.get('/session_destroy', function(req, res, next) {
   req.session.destroy(function() {
      res.end("session has been destroyed");
      next();
   });
});

app.get('/cookies', function(req, res, next) {
   process.stdout.write('\033c');
   console.log("cookies: ", req.cookies);
   console.log("signedCookies: ", req.signedCookies);
   res.end("cookies have been displayed in console");
   next();
});

app.get('/set_cookie1', function(req, res, next) {
   res.cookie('my first cookie','this is my first cookie');
   res.end("cookie has been set");
   next();
});

app.get('/set_cookie2', function(req, res, next) {
   res.cookie('my second cookie','this is my first cookie');
   res.end("cookie has been set");
   next();
});

app.get('/set_cookie_signed', function(req, res, next) {
   res.cookie('my signed cookie','this is my first signed cookie', {signed: true});
   res.end("cookie has been set");
   next();
});

app.get('/set_flash', function(req, res, next) {
   req.flash("info","this is my first Flash");
   res.redirect('/get_flash');
});

app.get('/get_flash', function(req, res, next) {
   var arr = req.flash("info");
   console.log(arr);
   res.end(arr.toString());
   next();
});

app.listen(80, function() {
   console.log('listenning at port: 80');
});
