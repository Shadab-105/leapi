/*
 *author: Kapil Gundawar
 *
 */

var OfficeConfigService = require("../services/officeConfigService");
var https = require('https');
var request = require('request');

function OfficeConfigController(objCollection) {

    var responseWrapper = objCollection.responseWrapper;
    var app = objCollection.app;
    var nodemailer = objCollection.nodemailer;
    var query_string = objCollection.query_string;
    var http = objCollection.http;
    var util = objCollection.util;

    var officeConfigService = new OfficeConfigService(objCollection.db, objCollection.util);
    app.post('/apiData', function (req, res) {
//        res.render('api', {routes: app._router.stack});
        res.send(responseWrapper.getResponse(false, app._router.stack, 200));
    });

    app.post('/office/add', function (req, res) {
        var string = "office/add - " + JSON.stringify(req.body);
        objCollection.util.writeLogs(string);
        officeConfigService.addOfficeInsert(req.body, function (err, data, statusCode) {
            if (err === false) {
                // got positive response
                res.send(responseWrapper.getResponse(err, data, statusCode));
            } else {
                console.log('did not get proper response for office/add');
                res.send(responseWrapper.getResponse(err, data, statusCode));
            }
        });

    });
    app.post('/office/edit', function (req, res) {
        var string = "/office/edit - " + JSON.stringify(req.body);
        objCollection.util.writeLogs(string);
        officeConfigService.editOffice(req.body, function (err, data, statusCode) {
            if (err === false) {
                // got positive response
                res.send(responseWrapper.getResponse(err, data, statusCode));
            } else {
                console.log('did not get proper response for /office/edit');
                res.send(responseWrapper.getResponse(err, data, statusCode));
            }
        });

    });
    app.post('/office/list', function (req, res) {
        var string = "office/list - " + JSON.stringify(req.body);
        objCollection.util.writeLogs(string);
        officeConfigService.getOffice(req.body, function (err, data, statusCode) {
            if (err === false) {
                // got positive response
                res.send(responseWrapper.getResponse(err, data, statusCode));
            } else {
                console.log('did not get proper response for office/list');
                res.send(responseWrapper.getResponse(err, data, statusCode));
            }
        });

    });
    app.post('/forms/list', function (req, res) {
      var string = "forms/list - " + JSON.stringify(req.body);
      objCollection.util.writeLogs(string);
      officeConfigService.getFormsList(req.body, function (err, data, statusCode) {
          if (err === false) {
              // got positive response
              res.send(responseWrapper.getResponse(err, data, statusCode));
          } else {
              console.log('did not get proper response for office/list');
              res.send(responseWrapper.getResponse(err, data, statusCode));
          }
      });

  });
  app.post('/forms/field/list', function (req, res) {
    var string = "forms/list - " + JSON.stringify(req.body);
    objCollection.util.writeLogs(string);
    officeConfigService.getFormsFieldList(req.body, function (err, data, statusCode) {
        if (err === false) {
            // got positive response
            res.send(responseWrapper.getResponse(err, data, statusCode));
        } else {
            console.log('did not get proper response for office/list');
            res.send(responseWrapper.getResponse(err, data, statusCode));
        }
    });

});

}
module.exports = OfficeConfigController;
