var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http')
const cors = require('cors');

var indexRouter = require('./src/api/routes/index');
var usersRouter = require('./src/api/routes/users');
var invoiceRouter = require('./src/api/routes/invoice');

var app = express();
const port = 3005
let server = http.createServer(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/invoice', invoiceRouter);


server.listen(port, () => {
    console.log('Backend server run on http://localhost:' + port)
})
module.exports = app;
