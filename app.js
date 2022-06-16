let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const Article = require('./models/article.model');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();

const mongoose = require('mongoose');
const {log} = require("debug");
mongoose.connect('mongodb://localhost:27017/site_blog')
    .then(()=>console.log("Connexion à MongoDB réussie"))
    .catch(()=>console.log("Connexion à MongoDB échouée"));

for (let index = 0; index < 8; index++){
  let article = new Article({
    name: "Article "+index,
    content: "Content "+index,
    publishedAt: Date.now()
  })

  article.save()
      .then(()=>console.log("Sauvegarde réussie"))
      .catch(()=>console.log("Sauvegarde échouée"));
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
