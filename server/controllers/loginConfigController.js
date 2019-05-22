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

    //add organization
    app.post('/user/add/organization', function (req, res) {
      var string = "/user/add/organization - " + JSON.stringify(req.body);
      objCollection.util.writeLogs(string);

      loginConfigService.addOrganization(req.body, function (err, data, statusCode) {

          if (err === false) {
              // got positive response
              res.send(responseWrapper.getResponse(err, data, statusCode));
          } else {
              console.log('did not get proper response for /user/add/organization');
              res.send(responseWrapper.getResponse(err, data, statusCode));
          }
      });

  });
  //map organization
  app.post('/user/map/organization', function (req, res) {
    var string = "/user/map/organization - " + JSON.stringify(req.body);
    objCollection.util.writeLogs(string);

    loginConfigService.mapOrganizationUser(req.body, function (err, data, statusCode) {

        if (err === false) {
            // got positive response
            res.send(responseWrapper.getResponse(err, data, statusCode));
        } else {
            console.log('did not get proper response for /user/map/organization');
            res.send(responseWrapper.getResponse(err, data, statusCode));
        }
    });

});
//Check user login
  app.post('/user/login', function (req, res) {
    var string = "/user/login - " + JSON.stringify(req.body);
    objCollection.util.writeLogs(string);

    loginConfigService.checkUserLogin(req.body, function (err, data, statusCode) {

        if (err === false) {
            // got positive response
            res.send(responseWrapper.getResponse(err, data, statusCode));
        } else {
            console.log('did not get proper response for /user/login');
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
        // Testing Sendinblue email service
        app.post('/send/email/v4', function (req, res) {
            let emailSubject = req.body.email_subject;
            let emailBody = req.body.email_body;
            let htmlTemplate = req.body.html_template
            let emailReceiver = req.body.email_receiver;
            util.sendEmailV4(req.body, emailReceiver, emailSubject, emailBody, htmlTemplate, function (err, data) {
                if (err === false) {
                    res.send(responseWrapper.getResponse(err, data, 200, req.body));
                } else {
                    res.send(responseWrapper.getResponse(err, data, -100, req.body));
                }
            });
        });

}
module.exports = LoginConfigController;
