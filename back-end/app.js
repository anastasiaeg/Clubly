var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var cookieParser = require('cookie-parser');

var index = require('./server/routes/index');
var authRouter = require('./server/routes/auth')(passport);
var usersRouter = require('./server/routes/users');
var eventsRouter = require('./server/routes/events');
var calendarRouter = require('./server/routes/calendar')
var searchRouter = require('./server/routes/search')
var clubsRouter = require('./server/routes/clubs');
var tagsRouter = require('./server/routes/tags');
var clubsUsersRouter = require('./server/routes/clubsusers');
var clubsEventsRouter = require('./server/routes/clubsevents');
var clubsTagsRouter = require('./server/routes/clubstags');
var eventsTagsRouter = require('./server/routes/eventstags');
var eventsUsersRouter = require('./server/routes/eventsusers');
var tagsUsersRouter = require('./server/routes/tagsusers');
var populateRouter = require('./server/routes/populate');

let permissions = require('./server/helpers/permissions');

var app = express();
app.use(session({
  secret: "thesecret",
  saveUninitialized: true,
  resave: true
}))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

require('./passport')(passport)

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding');
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
});

app.use('/', index);
app.use('/api/auth', authRouter);
app.use('/api/users', permissions.loggedin, usersRouter);
app.use('/api/events', permissions.loggedin, eventsRouter);
app.use('/api/clubs', permissions.loggedin, clubsRouter);
app.use('/api/calendar', permissions.loggedin, calendarRouter);
app.use('/api/search', permissions.loggedin, searchRouter);
app.use('/api/tags', permissions.loggedin, tagsRouter);
app.use('/api/clubsUsers', permissions.loggedin, clubsUsersRouter);
app.use('/api/clubsEvents', permissions.loggedin, permissions.isUserOrganizer, clubsEventsRouter);
app.use('/api/clubsTags', permissions.loggedin, clubsTagsRouter);
app.use('/api/eventsTags', permissions.loggedin, eventsTagsRouter);
app.use('/api/eventsUsers', permissions.loggedin, eventsUsersRouter);
app.use('/api/tagsUsers', permissions.loggedin, tagsUsersRouter);
app.use('/api/populate', populateRouter);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;