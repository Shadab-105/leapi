/*
 * author: Kapil Gundawar
 */

var LoginConfigController = require('../controllers/loginConfigController');
var OfficeConfigController = require('../controllers/officeConfigController');
var DepartmentConfigController = require('../controllers/departmentConfigController');
var FormsConfigController = require('../controllers/formsConfigController');
function ControlInterceptor(objCollection) {
    new LoginConfigController(objCollection);
    new OfficeConfigController(objCollection);
    new DepartmentConfigController(objCollection);
    new FormsConfigController(objCollection);
}
;
module.exports = ControlInterceptor;
