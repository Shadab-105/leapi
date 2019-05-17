/*
 *author: Kapil Gundawar
 *
 */

var LoginConfigService = require("../services/loginConfigService");
var https = require('https');
var request = require('request');

function LoginConfigController(objCollection) {

    var responseWrapper = objCollection.responseWrapper;
    var app = objCollection.app;
    var nodemailer = objCollection.nodemailer;
    var query_string = objCollection.query_string;
    var http = objCollection.http;
    var util = objCollection.util;
    var s3 = objCollection.s3;

    var loginConfigService = new LoginConfigService(objCollection.db, objCollection.util);

    app.post('/apiData', function (req, res) {
        //        res.render('api', {routes: app._router.stack});
        res.send(responseWrapper.getResponse(false, app._router.stack, 200));
    });

    /*
     * Adds User
     */
    app.post('/user/add', function (req, res) {
        var string = "/user/add - " + JSON.stringify(req.body);
        objCollection.util.writeLogs(string);

        loginConfigService.addUserInsert(req.body, function (err, data, statusCode) {

            if (err === false) {
                // got positive response
                res.send(responseWrapper.getResponse(err, data, statusCode));
            } else {
                console.log('did not get proper response for /user/add');
                res.send(responseWrapper.getResponse(err, data, statusCode));
            }
        });

    });

   
    app.post('/user/edit/password', function (req, res) {
        var string = "/user/edit/password - " + JSON.stringify(req.body);
        objCollection.util.writeLogs(string);

        loginConfigService.editPassword(req.body, function (err, data, statusCode) {

            if (err === false) {
                // got positive response
                res.send(responseWrapper.getResponse(err, data, statusCode));
            } else {
                console.log('did not get proper response for /user/edit/password');
                res.send(responseWrapper.getResponse(err, data, statusCode));
            }
        });

    });
    app.post('/user/list', function (req, res) {
        var string = "/user/list - " + JSON.stringify(req.body);
        objCollection.util.writeLogs(string);

        loginConfigService.getUsers(req.body, function (err, data, statusCode) {

            if (err === false) {
                // got positive response
                res.send(responseWrapper.getResponse(err, data, statusCode));
            } else {
                console.log('did not get proper response for /user/list');
                res.send(responseWrapper.getResponse(err, data, statusCode));
            }
        });

    });

}
module.exports = LoginConfigController;