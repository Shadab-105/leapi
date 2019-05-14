/* 
 * author: Kapil Gundawar
 */


config = {};
config.version = 1.0;
config.servicePort = 3306;

sms_mode = 1;// mvaayoo
// mode = 2: bulkSMS
// mode = 3: Sinfini
config.sms_mode = 1;

//config.masterIp = '';
//config.slave1Ip = '';
//config.slave2Ip = '';
config.masterIp = 'levitating.czko7uimsauu.us-east-1.rds.amazonaws.com';
config.slave1Ip = '';
config.slave2Ip = '';

// Database connection information start
config.dbUser = 'clientapp';
config.database = 'levitating'; // Staging
config.dbPassword = '}d2v,)R}';
config.conLimit = 10;
// Database connection information end

config.twilioAccountSid = "";
config.twilioAuthToken = "";
config.nexmoAPIKey = "";
config.nexmoSecretKey = "";
config.serviceVersion = 1.0;

//Email settings

config.smtp_host = 'retail.smtp.com';
config.smtp_port = '2525';
config.smtp_user = '';
config.smtp_pass = '';

// External service url
//config.ext_serviceHost = ""; // Testing url
//config.ext_serviceHostExt = ""; // Testing url
config.ext_clevvermailHost = ""; // Live url
config.ext_clevvermailAppCode = "";
config.ext_clevvermailAppKey = "";
config.ext_serviceHost = ""; // Live url
config.ext_serviceHostExt = "/0.1"; // Live url


// Pubnub information
config.pb_publishKey = '';
config.pb_subscribeKey = '';

// Google map api key
config.GMAPKey = '';

// Twilio
config.accountSid = '';
config.authToken = "";
config.twimlAppSid = "";
config.callerId = "";
//config.client = require('twilio')(config.accountSid, config.authToken);
//config.whitelist = [];