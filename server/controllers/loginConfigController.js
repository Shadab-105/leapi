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
     * Get Particular Resource Details
     * Get the current employee desk asset status
     * Get the current employee desk asset color preference
     * Get the current customer unique id of the employee asset
     * @param organization_id, asset_id
     */
    app.post('/addUser', function (req, res) {
        var string = "addUser - " + JSON.stringify(req.body);
        objCollection.util.writeLogs(string);

        loginConfigService.addUserInsert(req.body, function (err, data, statusCode) {

            if (err === false) {
                // got positive response
                res.send(responseWrapper.getResponse(err, data, statusCode));
            } else {
                console.log('did not get proper response for assetListSelect');
                res.send(responseWrapper.getResponse(err, data, statusCode));
            }
        });

    });
    app.post('/editPassword', function (req, res) {
        var string = "editPassword - " + JSON.stringify(req.body);
        objCollection.util.writeLogs(string);

        loginConfigService.editPassword(req.body, function (err, data, statusCode) {

            if (err === false) {
                // got positive response
                res.send(responseWrapper.getResponse(err, data, statusCode));
            } else {
                console.log('did not get proper response for assetListSelect');
                res.send(responseWrapper.getResponse(err, data, statusCode));
            }
        });

    });
    app.get('/getUser', function (req, res) {
      var string = "getUSer - " + JSON.stringify(req.body);
      objCollection.util.writeLogs(string);

      loginConfigService.getUsers(req.body, function (err, data, statusCode) {

          if (err === false) {
              // got positive response
              res.send(responseWrapper.getResponse(err, data, statusCode));
          } else {
              console.log('did not get proper response for assetListSelect');
              res.send(responseWrapper.getResponse(err, data, statusCode));
          }
      });

  });

}
module.exports = LoginConfigController;
