/*
 *author: Kapil Gundawar
 *
 */

var DepartmentConfigService = require("../services/departmentConfigService");
var https = require('https');
var request = require('request');

function DepartmentConfigController(objCollection) {

    var responseWrapper = objCollection.responseWrapper;
    var app = objCollection.app;
    var nodemailer = objCollection.nodemailer;
    var query_string = objCollection.query_string;
    var http = objCollection.http;
    var util = objCollection.util;

    var departmentConfigService = new DepartmentConfigService(objCollection.db, objCollection.util);
    app.post('/apiData', function (req, res) {
//        res.render('api', {routes: app._router.stack});
        res.send(responseWrapper.getResponse(false, app._router.stack, 200));
    });

    app.post('/department/add', function (req, res) {
        var string = "/department/add - " + JSON.stringify(req.body);
        objCollection.util.writeLogs(string);
        departmentConfigService.addDepartmentInsert(req.body, function (err, data, statusCode) {
            if (err === false) {
                // got positive response
                res.send(responseWrapper.getResponse(err, data, statusCode));
            } else {
                console.log('did not get proper response for /department/add');
                res.send(responseWrapper.getResponse(err, data, statusCode));
            }
        });

    });
    app.post('/department/list', function (req, res) {
        var string = "/department/list - " + JSON.stringify(req.body);
        objCollection.util.writeLogs(string);
        departmentConfigService.getDepartment(req.body, function (err, data, statusCode) {
            if (err === false) {
                // got positive response
                res.send(responseWrapper.getResponse(err, data, statusCode));
            } else {
                console.log('did not get proper response for /department/list');
                res.send(responseWrapper.getResponse(err, data, statusCode));
            }
        });

    });
}
module.exports = DepartmentConfigController;
