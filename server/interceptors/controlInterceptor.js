/* 
 * author: Kapil Gundawar
 */

var LoginConfigController = require('../controllers/loginConfigController');

function ControlInterceptor(objCollection) {
    new LoginConfigController(objCollection);
}
;
module.exports = ControlInterceptor;
