/*
 * author: Sri Sai Venkatesh
 */

var moment = require('moment');
var request = require('request');
var os = require('os'); // to define end of line
var fs = require('fs'); // File commands
var PubNub = require('pubnub');
var NodeGeocoder = require('node-geocoder');
var twilio = require('twilio');
// SendInBlue
const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;
// Configure API key authorization: api-key
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = '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';

const apiInstance = new SibApiV3Sdk.SMTPApi();
function Util() {

    this.isAValidPhoneNumber = function (number) {
        return /^[\d\+\-\(\) ]+$/.test(number);
    };

    this.gmap = function (location, cb) {
        var options = {
            provider: 'google',
            // Optional depending on the providers
            httpAdapter: 'https', // Default
            apiKey: global.config.GMAPKey, // for Mapquest, OpenCage, Google Premier
            formatter: null         // 'gpx', 'string', ...
        };

        var geocoder = NodeGeocoder(options);

        // Using callback
        geocoder.geocode(location, function (err, res) {
            cb(res);
        });
    };

    this.pubnub = function (employee_desk_asset_id, channel, message) {
        var _channels = [];
        _channels[0] = channel;

//        var pnb = {
//            publishKey: global.config.pb_publishKey,
//            subscribeKey: global.config.pb_subscribeKey,
//            ssl: true
//        };
//        
//        if (typeof employee_desk_asset_id != undefined && employee_desk_asset_id != null && employee_desk_asset_id > 0) {
//            pnb.uuid = employee_desk_asset_id;
//        }
//
//        var pubnub = new PubNub(pnb);

        var pubnub = new PubNub({
            publishKey: global.config.pb_publishKey,
            subscribeKey: global.config.pb_subscribeKey,
            ssl: true,
            uuid: employee_desk_asset_id
        });
        var publishConfig = {
            channel: _channels,
            message: message
        };

        pubnub.publish(publishConfig, function (status, response) {
//                console.log(status, response);
        });
    };

    this.getAssetTypes = function () {
        var asset_types = {
            1: "User",
            2: "Employee",
            3: "Desk",
            4: "Cabin",
            5: "Administrator Room",
            6: "Control Center",
            7: "Meeting Room",
            8: "Assitant Room",
            9: "Stationary Room",
            10: "Storage Room",
            11: "Library Room",
            12: "Lobby",
            13: "Customer",
            14: "Consultant",
            15: "Vendor",
            16: "Vehicle",
            17: "Bot",
            18: "Assistant"
        };
        return (asset_types);
    };

    this.getActivityTypes = function () {
        var activity_types = {
            1: {
                'activity_type_category_id': 1,
                'activity_type_category_name': "To-Do",
                'activity_type': "To-Do",
                'activity_status': {
                    1: 'Open',
                    2: 'Closed',
                    3: 'Deleted'
                }
            },
            2: {
                'activity_type_category_id': 2,
                'activity_type_category_name': "Notepad",
                'activity_type': "Notepad",
                'activity_status': {
                    4: 'Open',
                    5: 'Deleted'
                }
            },
            3: {
                'activity_type_category_id': 3,
                'activity_type_category_name': "Plant",
                'activity_type': "Plant",
                'activity_status': {
                    6: 'Active',
                    7: 'Inactive'
                }
            },
            4: {
                'activity_type_category_id': 4,
                'activity_type_category_name': "Employee ID Card",
                'activity_type': "Employee ID Card",
                'activity_status': {
                    8: 'Active',
                    9: 'Inactive'
                }
            },
            5: {
                'activity_type_category_id': 5,
                'activity_type_category_name': "Co-worker Contact Card",
                'activity_type': "Co-worker Contact Card",
                'activity_status': {
                    10: 'Active',
                    11: 'Inactive'
                }
            },
            6: {
                'activity_type_category_id': 6,
                'activity_type_category_name': "External Contact Card",
                'activity_type': "External Contact Card",
                'activity_status': {
                    12: 'Active',
                    13: 'Inactive'
                }
            },
            7: {
                'activity_type_category_id': 7,
                'activity_type_category_name': "Speed Dial Contact",
                'activity_type': "Speed Dial Contact",
                'activity_status': {
                    14: 'Active',
                    15: 'Inactive'
                }
            },
            8: {
                'activity_type_category_id': 8,
                'activity_type_category_name': "Mail",
                'activity_type': "Mail",
                'activity_status': {
                    16: 'Draft',
                    17: 'Sent',
                    18: 'Received / Delivered',
                    19: 'Read',
                    20: 'Archived',
                }
            },
            9: {
                'activity_type_category_id': 9,
                'activity_type_category_name': "Form",
                'activity_type': "Form",
                'activity_status': {
                    21: 'Open',
                    22: 'Submitted',
                    23: 'Approved',
                    24: 'Rejected'
                }
            },
            10: {
                'activity_type_category_id': 10,
                'activity_type_category_name': "File",
                'activity_type': "File",
                'activity_status': {
                    25: 'Open',
                    26: 'Closed',
                    27: 'Cancelled'
                }
            },
            11: {
                'activity_type_category_id': 11,
                'activity_type_category_name': "Folder",
                'activity_type': "Folder",
                'activity_status': {
                    28: 'Open',
                    29: 'Closed',
                    30: 'Cancelled'
                }
            },
            12: {
                'activity_type_category_id': 12,
                'activity_type_category_name': "Situation",
                'activity_type': "Situation",
                'activity_status': {
                    31: 'Open',
                    32: 'Closed',
                    33: 'Cancelled'
                }
            },
            13: {
                'activity_type_category_id': 13,
                'activity_type_category_name': "Camera Snapshot",
                'activity_type': "Camera Snapshot",
                'activity_status': {
                    34: 'Open',
                    35: 'Deleted'
                }
            },
            14: {
                'activity_type_category_id': 14,
                'activity_type_category_name': "Voice Call",
                'activity_type': "Voice Call",
                'activity_status': {
                    36: 'Scheduled',
                    37: 'In Progress',
                    38: 'Completed'
                }
            },
            15: {
                'activity_type_category_id': 15,
                'activity_type_category_name': "Video Conference",
                'activity_type': "Video Conference",
                'activity_status': {
                    39: 'Scheduled',
                    40: 'In Progress',
                    41: 'Completed'
                }
            },
            16: {
                'activity_type_category_id': 16,
                'activity_type_category_name': "Coffee Mug Conversation",
                'activity_type': "Coffee Mug Conversation",
                'activity_status': {
                    42: 'Open',
                    43: 'Archived'
                }
            },
            17: {
                'activity_type_category_id': 17,
                'activity_type_category_name': "Newspaper",
                'activity_type': "Newspaper",
                'activity_status': {
                    44: 'Open',
                    45: 'Archived'
                }
            },
            18: {
                'activity_type_category_id': 18,
                'activity_type_category_name': "Newspaper Article",
                'activity_type': "Newspaper Article",
                'activity_status': {
                    46: 'Editing',
                    47: 'Published',
                    48: 'Archived'
                }
            },
            19: {
                'activity_type_category_id': 19,
                'activity_type_category_name': "Book",
                'activity_type': "Book",
                'activity_status': {
                    49: 'Open',
                    50: 'Archived'
                }
            },
            20: {
                'activity_type_category_id': 20,
                'activity_type_category_name': "Book Chapter",
                'activity_type': "Book Chapter",
                'activity_status': {
                    51: 'Editing',
                    52: 'Published',
                    53: 'Archived'
                }
            },
            21: {
                'activity_type_category_id': 21,
                'activity_type_category_name': "Magazine",
                'activity_type': "Magazine",
                'activity_status': {
                    54: 'Open',
                    55: 'Archived'
                }
            },
            22: {
                'activity_type_category_id': 22,
                'activity_type_category_name': "Magazine Article",
                'activity_type': "Magazine Article",
                'activity_status': {
                    56: 'Editing',
                    57: 'Published',
                    58: 'Archived'
                }
            },
            23: {
                'activity_type_category_id': 23,
                'activity_type_category_name': "Wallet Transaction",
                'activity_type': "Wallet Transaction",
                'activity_status': {
                    59: 'Draft',
                    60: 'Submitted',
                    61: 'Approved',
                    62: 'Rejected'
                }
            },
            24: {
                'activity_type_category_id': 24,
                'activity_type_category_name': "Pen Drive",
                'activity_type': "Pen Drive",
                'activity_status': {
                    63: 'Open',
                    64: 'Deleted'
                }
            },
            25: {
                'activity_type_category_id': 25,
                'activity_type_category_name': "Portable Hard Drive",
                'activity_type': "Portable Hard Drive",
                'activity_status': {
                    65: 'Open',
                    66: 'Deleted'
                }
            },
            26: {
                'activity_type_category_id': 26,
                'activity_type_category_name': "Portable Hard Drive Attachment",
                'activity_type': "Portable Hard Drive Attachment",
                'activity_status': {
                    67: 'Open',
                    68: 'Deleted'
                }
            },
            27: {
                'activity_type_category_id': 27,
                'activity_type_category_name': "Generic Group",
                'activity_type': "Generic Group",
                'activity_status': {
                    69: 'Active',
                    70: 'Inactive'
                }
            },
            28: {
                'activity_type_category_id': 28,
                'activity_type_category_name': "Post-it",
                'activity_type': "Post-it",
                'activity_status': {
                    71: 'Open',
                    72: 'Archived',
                    73: 'Saved'
                }
            }
        };

        return (activity_types);
    };

    // encode string with base64
    this.encodeBase64 = function (string) {
        var b = new Buffer(string);
        return b.toString('base64');
    };

    // decode string with base64
    this.decodeBase64 = function (string) {
        var c = new Buffer(string, 'base64');
        return c.toString();
    };

    this.textWithOutSpaces = function (text) {
        return text.replace(/ +/g, "");
    };

    this.getSMSString = function (verificationCode) {
//        var msg_body = "BlueFlock : Use " + verificationCode + " as verification code for registering the BlueFlock App .";
        var msg_body = "Desker : Use " + verificationCode + " as verification code for registering the Desker App . To download the app click : https://app.desker.co";
        return (msg_body);
    };

    this.generatePasscode = function () {
        return Math.floor(100000 + Math.random() * 900000);
    };

    this.sendSmsMvaayoo = function (messageString, countryCode, phoneNumber, callback) {
//        console.log("inside sendSmsMvaayoo");
        messageString = encodeURI(messageString);
        var url = "http://api.mvaayoo.com/mvaayooapi/MessageCompose?user=junaid.m@gren.in:greneapple&senderID=DESKER&receipientno=" + countryCode + "" + phoneNumber + "&dcs=0&msgtxt=" + messageString + "&state=4";
        request(url, function (error, response, body) {
            var res = {};
            if (typeof body != 'undefined' && body.indexOf('Status=0') > -1) {
                res['status'] = 1;
                res['message'] = "Message sent";
            } else {
                res['status'] = 0;
                res['message'] = "Message not sent";
            }
            if (error)
                callback(error, false);
            callback(false, res);
        });
    };

    this.sendSmsBulk = function (messageString, countryCode, phoneNumber, callback) {
        console.log("inside sendSmsBulk");
        messageString = encodeURI(messageString);
        var url = "http://bulksmsapps.com/apisms.aspx?user=gsaikiran&password=LUHUUI&genkey=094729492&sender=BLUFLK&number=" + countryCode + "" + phoneNumber + "&message=" + messageString;
        console.log(url);
        request(url, function (error, response, body) {
            var res = {};
            if (typeof body != 'undefined' && body.indexOf('Status=0') > -1) {
                res['status'] = 1;
                res['message'] = "Message sent";
            } else {
                res['status'] = 0;
                res['message'] = "Message not sent";
            }
            if (error)
                callback(error, false);
            callback(false, res);
        });
    };

    this.sendSmsSinfini = function (messageString, countryCode, phoneNumber, callback) {
        console.log("inside sendSmsSinfini");
        messageString = encodeURI(messageString);
        var url = "http://api-alerts.solutionsinfini.com/v3/?method=sms&api_key=A85da7898dc8bd4d79fdd62cd6f5cc4ec&to=" + countryCode + "" + phoneNumber + "&sender=BLUFLK&format=json&message=" + messageString;
        console.log(url);
        request(url, function (error, response, body) {
            var foo = JSON.parse(body);
            var res = {};
            if (typeof foo != 'undefined' && foo.status === 1) {
                res['status'] = 1;
                res['message'] = "Message sent";
            } else {
                res['status'] = 0;
                res['message'] = "Message not sent";
            }
            if (error)
                callback(error, false);
            callback(false, res);
        });
    };

    this.sendInternationalSMS = function (messageString, countryCode, phoneNumber, callback) {
        console.log("inside International SMS");
        var accountSid = global.config.twilioAccountSid; // Your Account SID from www.twilio.com/console
        var authToken = global.config.twilioAuthToken; // Your Auth Token from www.twilio.com/console

        var client = new twilio(accountSid, authToken);
        client.messages.create({
            body: messageString,
            to: '+' + countryCode + '' + phoneNumber, // Text this number
            from: '+1 810-637-5928' // From a valid Twilio number
        }, function (err, message) {
            var res = {};
            if (typeof message != 'undefined' && message.sid != '') {
                res['status'] = 1;
                res['message'] = "Message sent";
            } else {
                res['status'] = 0;
                res['message'] = "Message not sent";
            }
            if (err)
                callback(err, false);
            callback(false, res);
        });
    };

    this.sendSMS = function (messageString, countryCode, phoneNumber, callback) {
        if (countryCode == 91) {
            var sms_mode = global.config.sms_mode;
            if (sms_mode == 1) {
                this.sendSmsMvaayoo(messageString, countryCode, phoneNumber, function (err, res) {
                    callback(err, res);
                });
            } else if (sms_mode == 2) {
                this.sendSmsBulk(messageString, countryCode, phoneNumber, function (err, res) {
                    callback(err, res);
                });
            } else if (sms_mode == 3) {
                this.sendSmsSinfini(messageString, countryCode, phoneNumber, function (err, res) {
                    callback(err, res);
                });
            }
        } else {
            this.sendInternationalSMS(messageString, countryCode, phoneNumber, function (err, res) {
                callback(err, res);
            });
        }
    };

    this.makeCall = function (messageString, countryCode, phoneNumber, callback) {
        var requestData = {
            api_key: global.config.nexmoAPIKey,
            "api_secret": global.config.nexmoSecretKey,
            "to": countryCode + "" + phoneNumber,
            "text": messageString,
            "voice": "female",
            "lg": "en-gb"
        };
        console.log(requestData);
        var url = "https://api.nexmo.com/tts/json";
//        console.log(url);
        request.post({
            uri: url,
            form: requestData
        }, function (error, response, body) {
            //console.log(error);
            //console.log(response);
//            console.log(body);
//            return false;
            var foo = JSON.parse(body);
            var res = {};
            if (foo.status === 0) {
                res['status'] = 1;
                res['message'] = "Message sent";
            } else {
                res['status'] = 0;
                res['message'] = "Message not sent";
            }
            if (error)
                callback(error, false);
            callback(false, res);
        });
    };

    this.decodeSpecialChars = function (string) {

        if (typeof string === 'string') {
            string = string.replace(";sqt;", "'");
            string = htmlEntities(string);
            return string;
        } else {
            return "";
        }

    };

    this.encodeSpecialChars = function (value) {
        return value.replace(/\\/g, "\\\\")
                .replace(/\$/g, "\\$")
                .replace(/'/g, "\\'")
                .replace(/"/g, "\\\"");
    };

    var htmlEntities = function (str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    };
    
    // convert time to seconds
    this.convertTimeToSecs = function (tym) {
        return moment.duration(tym).asSeconds();
    };

    // add no of days to current date
    this.getAddToCurrentDateUTC = function (startdate, days) {
        return moment(startdate, "YYYY-MM-DD HH:mm:ss").add(days, 'days').format("YYYY-MM-DD HH:mm:ss");
    };

    this.addHoursToTime = function (date, period, type) {
        return moment(date).add(period, type).format("YYYY-MM-DD HH:mm:ss");
    };

    this.getTimeDiff = function (startDate, endDate, mode) {
        var sDate = moment(startDate);
        var eDate = moment(endDate);
        var data = eDate.diff(sDate, mode);
        return data;
    };

    this.convertUnixToDate = function (timestamp) {
        return moment.unix(timestamp).format("YYYY-MM-DD HH:mm:ss");
    };

    this.addDateTimeDays = function (sdate, period, type) {
        return moment(sdate, "YYYY-MM-DD HH:mm:ss").add(period, type).format("YYYY-MM-DD");
    };

    this.getUnixTimestamp = function (datetime) {
        if (typeof datetime === 'undefined' || datetime === '')
            return moment().unix();
        else
            return moment(datetime).unix() + 19800;
    };

    this.convertDatetoUtc = function (date) {
        return moment.utc(date).format("YYYY-MM-DD HH:mm:ss");
    };

    this.convertSecsToTime = function (secs, showSecs) {
        var minutes = Math.floor(secs / 60);
        secs = secs % 60;
        var hours = Math.floor(minutes / 60)
        minutes = minutes % 60;
        if (showSecs) {
            if (parseInt(secs) < 10)
                secs = '0'+secs;
            return  hours + ":" + minutes + ":" + secs;
        } else {
            return  hours + " Hrs  " + minutes + " min";
        }
    };

    this.readableFormatDate = function (datetime) {
        if (typeof datetime === 'undefined' || datetime === '')
            datetime = this.getCurrentUTCTime();
        return moment(datetime).format("Do MMM, YYYY");
    };

    this.getWeekStartEndDates = function (date, StartOn, isUtc) {
        // StartOn - Day in number (0 - sunday to 6 - Saturday)
        if (typeof date == 'undefined') {
            var sDt = moment().startOf('week').toDate();
            var eDt = moment().endOf('week').toDate();
            var startOfWeek = moment(sDt).format("YYYY-MM-DD HH:mm:ss");
            var endOfWeek = moment(eDt).format("YYYY-MM-DD HH:mm:ss");
        } else {
            var nwData = new Date(date);
            var nDate = moment(nwData).format("YYYY-MM-DD HH:mm:ss");
            var startOfWeek = moment(nDate).startOf('week').format("YYYY-MM-DD HH:mm:ss");
            var endOfWeek = moment(nDate).endOf('week').format("YYYY-MM-DD HH:mm:ss");
        }
        if (typeof StartOn !== 'undefined') {
            startOfWeek = this.getAddToCurrentDateUTC(startOfWeek, StartOn);
            endOfWeek = this.getAddToCurrentDateUTC(endOfWeek, StartOn);
        }
        if (typeof isUtc !== 'undefined' && isUtc === true) {
            startOfWeek = moment(startOfWeek).utc().format("YYYY-MM-DD HH:mm:ss");
            endOfWeek = moment(startOfWeek).utc().format("YYYY-MM-DD HH:mm:ss");
        }
        var data = {startOfWeek: startOfWeek, endOfWeek: endOfWeek};
        return data;
    };

    this.subtractDateTime = function (period, type) {
        return moment(this.getCurrentUTCTime(), "YYYY-MM-DD HH:mm:ss").subtract(period, type).format("YYYY-MM-DD HH:mm:ss");
    };

    this.getDay = function (date) {
        if (typeof date !== 'undefined' && date !== '')
            return moment(date).format("dddd");
        else
            return moment().format("dddd");
    };

    this.getCurrentUTCTime = function (datetime) {
        if (typeof datetime == 'undefined')
            return moment().utc().format("YYYY-MM-DD HH:mm:ss");
        else
            return moment(datetime).utc().format("YYYY-MM-DD HH:mm:ss");
    };

    this.getCurrentDate = function () {
        var now = moment().utc().format("YYYY-MM-DD");
        return now;
    };

    this.getCurrentUTCTimestamp = function () {
        var now = moment().utc().valueOf();
        return now;
    };

    this.getcurrentTime = function () {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth();
        var dateVal = date.getDate();
        var hours = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        var dateTimeString = year + "-" + month + "-" + dateVal + " " + hours + ":" + min + ":" + sec;
        return dateTimeString;
    };

    this.getQueryString = function (callName, paramsArr) {

        var queryString = "CALL " + callName + "(";
        paramsArr.forEach(function (item, index) {
            if (index === (paramsArr.length - 1))
                queryString = queryString + "'" + item + "'";
            else
                queryString = queryString + "'" + item + "',";
        }, this);
        queryString = queryString + ");";
        //queryString.replace("'null'", "null");
        console.log(queryString);
        return queryString;
    };

    this.getRandomInt = function () {
        /*
         var min = 100000;
         var max = 999999;
         return Math.floor(Math.random() * (max - min)) + min;
         */
        return Math.floor(Math.random() * (999999 - 100000)) + 100000;
    };

    this.getVerificationCode = function () {
        //var min = 1000;
        //var max = 9999;
        return Math.floor(Math.random() * (999999 - 100000)) + 100000;
    };

    this.getMessageUniqueId = function (assetId) {
        var messageUniqueId = assetId + this.getCurrentUTCTimestamp() + this.getRandomInt();
        return messageUniqueId;
    };

    //Get GPS date time
    this.getGPSDatetime = function () {
        return Math.floor(Date.now()); //timestamp in milliseconds //Math.floor(Date.now() / 1000) - in seconds
    };

    this.replaceDefaultNumber = function (value) {
        if (value === undefined || value === null || value === '')
            return Number(-1);
        else
            return Number(value);
    };

    this.replaceZero = function (value) {
        if (value === undefined || value === null || value === '')
            return Number(0);
        else
            return Number(value);
    };

    this.replaceOne = function (value) {
        if (value === undefined || value === null || value === '')
            return Number(1);
        else
            return Number(value);
    };

    this.replaceDefaultString = function (value) {
        if (value === undefined || value === null || value === '')
            return '';
        else
            return value;
    };

    this.replaceDefaultDatetime = function (value) {
        if (value === undefined || value === null || value === '' || value === '1970-01-01' || value === '1970-01-01 00:00:00')
            return "1970-01-01 00:00:00";
        else
            return this.getFormatedLogDatetime(value);
    };

    this.replaceDefaultAssetUrl = function (value) {
        if (value === undefined || value === null || value === '')
            return "http://blueflock.com/blueflock_images/Personal.png";
        else
            return (value);
    };

    this.getFormatedLogDatetime = function (timeString) {
        var value = moment(timeString).format("YYYY-MM-DD HH:mm:ss");
        return value;
    };

    this.getFormatedLogDate = function (timeString) {
        var value = moment(timeString).format("YYYY-MM-DD");
        return value;
    };

    this.getFormatedLogTime = function (timeString) {
        var value = moment(timeString).format("HH:mm:ss");
        return value;
    };

    this.getTimestamp = function (timeString) {
        var value = moment(timeString).valueOf();
        return value;
    };

    this.addDays = function (timeString, days) {
        var value = moment(timeString, "YYYY-MM-DD HH:mm:ss").add(days, 'days').format("YYYY-MM-DD HH:mm:ss");
        return value;
    };

    this.addUnitsToDateTime = function (timeString, days, unit) {
        var value = moment(timeString, "YYYY-MM-DD HH:mm:ss").add(days, unit).format("YYYY-MM-DD HH:mm:ss");
        return value;
    };

    this.subtractDays = function (timeString, days) {
        var value = moment(timeString, "YYYY-MM-DD HH:mm:ss").subtract(days, 'days').format("YYYY-MM-DD HH:mm:ss");
        return value;
    };

    this.differenceDatetimes = function (timeString1, timeString2, type) {
        if (type == 'days') {
            var value = moment(timeString1).diff(moment(timeString2), 'days');
        } else {
            var value = moment(timeString1, "YYYY-MM-DD HH:mm:ss").diff(moment(timeString2, "YYYY-MM-DD HH:mm:ss"));
        }
        return value;
    };

    this.cleanPhoneNumber = function (phone) {

        if (typeof phone === 'string') {
            phone.replace(" ", "");
            phone.replace("-", "");
            phone.replace("+", "");
        }
        return Number(phone);
    };

    this.ucfirst = function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    this.replaceDefaultProjectImage = function (value) {
        if (value === undefined || value === null || value === '')
            return "http://blueflock.com/blueflock_images/Project.png";
        else
            return value;
    };

    this.replaceDefaultActivityImage = function (value) {
        if (value === undefined || value === null || value === '')
            return "http://blueflock.com/blueflock_images/Personal.png";
        else
            return value;
    };

    this.getImageUrlForSizeM = function (stringUrl, size) {
        var a = stringUrl.substr(0, stringUrl.lastIndexOf("."));
        var b = a.slice(-1);
        if (b === '_') {
            var d = new Date();
            return stringUrl.substr(0, stringUrl.lastIndexOf("_") + 1) + size + stringUrl.substr(stringUrl.lastIndexOf(".")) + "?" + d.getTime();
        } else {
            return stringUrl.substr(0, stringUrl.lastIndexOf(".")) + '_' + size + stringUrl.substr(stringUrl.lastIndexOf("."));
        }
    };

    this.sendEmail = function (nodemailer, email, subject, text, htmlTemplate, callback) {
        var smtpConfig = {
            host: global.config.smtp_host,
            port: global.config.smtp_port,
            secure: false, // use SSL
            auth: {
                user: global.config.smtp_user,
                pass: global.config.smtp_pass
            }
        };
        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport(smtpConfig);
        //var transporter = mailer.createTransport(smtpConfig);

        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: 'Desker <' + global.config.smtp_user + '>', // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            text: text, // plaintext body
            html: htmlTemplate // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                //console.log('Message not sent');
                callback(error, info, mailOptions);
            } else {
                //console.log('Message sent: ' + info.response);
                callback(false, info, mailOptions);
            }
        });
        return;
    };


    // SendInBlue, htmlTemplate is sent as base64 encoded
    this.sendEmailV4 = function (request, email, subject, text, base64EncodedHtmlTemplate, callback) {
        console.log('email : ', email);
        console.log('subject : ', subject);
        console.log('text : ', text);

        let buff = new Buffer(base64EncodedHtmlTemplate, 'base64');
        let htmlTemplate = buff.toString('ascii');

        // SendSmtpEmail | Values to send a transactional email
        var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        sendSmtpEmail.to = [{
            "name": request.email_receiver_name || undefined,
            "email": email
        }];
        sendSmtpEmail.sender = {
            "name": request.email_sender_name || undefined,
            "email": request.email_sender
        };
        sendSmtpEmail.textContent = text;
        sendSmtpEmail.htmlContent = htmlTemplate;
        sendSmtpEmail.subject = subject;
        sendSmtpEmail.headers = {
            "x-mailin-custom": "Levitating Elephant"
        };
        sendSmtpEmail.tags = ["live"];

        apiInstance.sendTransacEmail(sendSmtpEmail)
            .then(function (data) {
                console.log('API called successfully. Returned data: ', data);
                return callback(false, data);
            }, function (error) {
                return callback(true, error);
            });
    };

    this.getRedableFormatLogDate = function (timeString, type) {
        if (typeof type == 'undefined' || type == '' || type == null)
            type = 0;

        var value = '';

        if (type == 1) {
            value = moment(timeString).format("YYYY-MM-DD HH:mm");
        } else {
            value = moment(timeString).format("dddd, MMMM Do, YYYY");
        }
        return value;
    };

    this.convertToTimezone = function (timeString, offsetValue) {
        var timeStringNew = moment(timeString).valueOf();
        timeString = (timeStringNew > 0 && Number(offsetValue) != 'NaN') ? Number(timeStringNew) + Number(offsetValue) : timeString;
        var value = moment(timeString).format("YYYY-MM-DD HH:mm:ss");
        return value;
    };

    this.randomInt = function (low, high) {
        return Math.floor(Math.random() * (high - low + 1) + low);
    };

    this.expiryDate = function () {
        return "2100-12-31 00:00:00";
    };

    this.getcurrentTimeOnly = function () {
        var date = new Date();
        var hours = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        var dateTimeString = hours + ":" + min + ":" + sec;
        return dateTimeString;
    };

    this.getCurrentDateTime = function (time) {
        var date = new Date(time + ' UTC');
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
    };

    this.writeLogs = function (data) {
        var date = this.getCurrentDate() + ' ' + this.getcurrentTimeOnly();
        var logFilePath = 'logs/' + this.getCurrentDate() + '.txt';
        var data_to_add = date + ': ' + data;
        if (fs.existsSync(logFilePath)) {
            fs.appendFile(logFilePath, os.EOL + data_to_add, function (err) {
                if (err)
                    console.log('Error while writing data to file', err);
            });
        } else {
            fs.writeFile(logFilePath, data_to_add, function (err) {
                if (err)
                    console.log('Error while writing data to file', err);
            });
        }
    };

    // Common messages start

    this.maxSelectLimit = 50;
    this.maxDesksCount = 25;
    this.maxDesksReached = "This Floor already has reached a max limit of occupancy, please try choosing other floor.";

    this.asset_token_auth = '54188fa0-f904-11e6-b140-abfd0c7973d9';
    this.asset_message_counter = -1;
    this.botOrganizationId = 1;
    this.botAccountId = 1;
    this.botWorkforceId = 3;
    this.botAssetId = 100;
    this.flag_pin = 0;
    this.flag_priority = 0;
    this.flag_offline = 0;
    this.flag_retry = 0;
    this.track_latitude = 0.0;
    this.track_longitude = 0.0;
    this.track_altitude = 0.0;
    this.device_os_id = 5;
    this.app_version = 1.0;
    this.service_version = 1.0;
    this.track_gps_accuracy = 0.0;
    this.track_gps_status = 0.0;
    this.track_gps_location = 0.0;
    this.api_version = 1.0;
    this.device_os_version = 1.0;
    this.device_os_name = 'web';
    this.device_model_name = 'web';
    this.device_manufacturer_name = 'web';

    this.asset_creat_success = "asset created successfully";

    this.log_offline = 0;
    this.log_retry = 0;
    this.gps_enabled = 0;
    this.gps_accuracy = 0.0;

    this.defaultAssetImage = "app/assets/images/profile-pic.png";
    this.defaultProdId = 1;

    // Amazon S3 Start
    this.bucket = '';
    this.access_key = '';
    this.secret_key = '';
    // Amazon S3 end

    // Common messages end

    // Call external service start
//    this.externalService = function (path, method, qsData, http, callback) {
    this.externalService = function (dataString, callback) {
        var options = {
            host: dataString.host,
            port: dataString.port,
            path: dataString.path,
            method: dataString.method,
            headers: dataString.headers
        };

        var httpreq = dataString.http.request(options, function (response) {
            response.setEncoding('utf8');
            response.on('data', function (chunk) {

                if (chunk.charCodeAt(0) == 60) {
                    var dataString = {
                        code: true,
                        result: chunk,
                        status: 300
                    };
                    var data = dataString;
                } else {
                    var data = JSON.parse(chunk);
                }

                callback(data);
            });
        });
        httpreq.write(dataString.qsData);
        httpreq.end();
    };
    // Call external service end
    
    this.AWSUrl = 'https://s3.amazonaws.com/';
    this.createAWSBucket = function (s3, asset_info, callback) {

        // Create the parameters for calling createBucket
        var bucketParams = {
            Bucket: asset_info.bucket_name
        };

        //Setting Tags for S3 Buckets
        var params = {
            Bucket: asset_info.bucket_name,
            Tagging: {
                TagSet: [
                    {Key: "asset_id", Value: asset_info.asset_id + ''},
                    {Key: "workforce_id", Value: asset_info.workforce_id + ''},
                    {Key: "account_id", Value: asset_info.account_id + ''},
                    {Key: "organization_id", Value: asset_info.organization_id + ''}
                ]
            }
        };

        //Creating an S3 Bucket
        s3.createBucket(bucketParams, function (err, data) {
            if (err) {
                console.log("Error creating aws bucket : ", err);
            } else {
                console.log("aws bucket created", data.Location);

                //Appending the Tags to the bucket
                s3.putBucketTagging(params, function (err, data) {
                    if (err)
                        console.log("bugget tags creation failed", err, err.stack);
                    else
                        console.log("bucket tags created", data);
                });
                callback();
            }
        });
    };
}

module.exports = Util;