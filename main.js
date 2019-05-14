var safeStringify = require('fast-safe-stringify')
//var ClientCapability = require('twilio').jwt.ClientCapability;
//var VoiceResponse = require('twilio').twiml.VoiceResponse;
//var twilio = require('twilio');

var globalConfig = require('./server/utils/globalConfig');
var express = require('express');
var app = express();
var server = require('http').createServer(app).listen(global.config.servicePort);
var http = require('http');
var query_string = require('querystring');

var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var hbs = require('nodemailer-express-handlebars');

var cors = require('cors');
var corsOptions = {
    origin: function (origin, callback) {
        var originIsWhitelisted = global.config.whitelist.indexOf(origin) !== -1;
        callback(originIsWhitelisted ? null : 'Bad Request', originIsWhitelisted);
    }
};

//    var PubNub = require('pubnub');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors());

var Util = require('./server/utils/util');
var util = new Util();

var db = require("./server/utils/dbWrapper");
var ResponseWrapper = require('./server/utils/responseWrapper');

var ControlInterceptor = require('./server/interceptors/controlInterceptor');

var responseWrapper = new ResponseWrapper(util);

//var aws = require('aws-sdk');
//aws.config.loadFromPath('./config.json');
//var s3 = new aws.S3();

var objCollection = {
    app: app,
    util: util,
    db: db,
    responseWrapper: responseWrapper,
    nodemailer: nodemailer, // to send mails
    query_string: query_string, // call external services
//        PubNub: PubNub,
    http: http,
    //ClientCapability: ClientCapability,
    //VoiceResponse: VoiceResponse,
    safeStringify: safeStringify,
    //s3: s3,
    //twilio: twilio
};

new ControlInterceptor(objCollection);

console.log('server running at port ' + global.config.servicePort);
//} catch (exception) {
//    console.log('some exception');
//    console.log(exception);
//}
