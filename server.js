var express = require('express');
var path = require('path');
var http = require('http');
var reports = require('./routes/reports');

var app = express();

app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/data', express.static(path.join(__dirname, 'data')));
    // TODO should be created separate test server
    app.use('/test', express.static(path.join(__dirname, 'test')));
});

app.get('/api/reports', reports.findAll);
app.get('/api/reportsList/:type', reports.findAllByType);
app.get('/api/reports/:id', reports.findById);
app.post('/api/reports', reports.add);
app.put('/api/reports/:id', reports.update);
app.delete('/api/reports/:id', reports.remove);

http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});