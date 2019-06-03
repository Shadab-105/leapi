/*
 *author: Md Shadab Ali
 *
 */

var FormsConfigService = require("../services/formsConfigService");
var https = require('https');
var request = require('request');

function FormsConfigController(objCollection) {

    var responseWrapper = objCollection.responseWrapper;
    var app = objCollection.app;
    var nodemailer = objCollection.nodemailer;
    var query_string = objCollection.query_string;
    var http = objCollection.http;
    var util = objCollection.util;

    var formsConfigService = new FormsConfigService(objCollection.db, objCollection.util);
    app.post('/apiData', function (req, res) {
//        res.render('api', {routes: app._router.stack});
        res.send(responseWrapper.getResponse(false, app._router.stack, 200));
    });

    app.post('/forms/add', function (req, res) {
        var string = "forms/add - " + JSON.stringify(req.body);
        objCollection.util.writeLogs(string);
        formsConfigService.addFormInsert(req.body, function (err, data, statusCode) {
            if (err === false) {
                // got positive response
                res.send(responseWrapper.getResponse(err, data, statusCode));
            } else {
                console.log('did not get proper response for office/add');
                res.send(responseWrapper.getResponse(err, data, statusCode));
            }
        });

    });

    app.post('/forms/list', function (req, res) {
        var string = "forms/list - " + JSON.stringify(req.body);
        objCollection.util.writeLogs(string);
        formsConfigService.getForms(req.body, function (err, data, statusCode) {
            if (err === false) {
                // got positive response
                res.send(responseWrapper.getResponse(err, data, statusCode));
            } else {
                console.log('did not get proper response for office/list');
                res.send(responseWrapper.getResponse(err, data, statusCode));
            }
        });

    });

    // Service for inserting form field definitions
    app.post('/forms/field/definition/insert', async function (req, res) {

      const [err, updateStatus] = await formsConfigService.formFieldDefinitionInsert(req.body);
      if (!err) {
          res.send(responseWrapper.getResponse({}, updateStatus, 200));
      } else {
          console.log("Error: ", err);
          res.send(responseWrapper.getResponse(err, updateStatus, -9999));
      }
  });
}
module.exports = FormsConfigController;