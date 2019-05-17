/* 
 * author: Kapil Gundawar
 */

var LoginConfigController = require('../controllers/loginConfigController');
var OfficeConfigController = require('../controllers/officeConfigController');
var DepartmentConfigController = require('../controllers/departmentConfigController');
function ControlInterceptor(objCollection) {
    new LoginConfigController(objCollection);
    new OfficeConfigController(objCollection);
    new DepartmentConfigController(objCollection);
}
;
module.exports = ControlInterceptor;
