/*
 * author: Kapil Gundawar
 */

function LoginConfigService(db, util) {
    /*
         * @description - Get user details
         * @param {type} request
         * @param {type} callback
         * @returns {undefined}
         */
    this.addUserInsert = function (request, callback) {
        var paramsArray = new Array(
            request.user_type_id,
            request.first_name,
            request.last_name,
            request.gender,
            request.email,
            request.phone,
            request.country_code,
            request.password,
            request.location,
            request.dept_id,
            request.office_id,
            request.organization_id,
            request.user_id,
            request.email_code,
            request.phone_code,
        );
        var queryString = util.getQueryString('user_add', paramsArray);

        if (queryString != '') {
            db.executeQuery(0, queryString, function (err, data) {
                if (err === false) {
                    //query successfully inserted
                    callback(false, { data: data }, 200);
                } else {
                    //query insert failed
                    callback(false, { data: data }, 200);
                }
            });
        }
    };

    this.editPassword = function (request, callback) {
        var paramsArray = new Array(
            request.user_id,
            request.password,
        );
        var queryString = util.getQueryString('user_edit_password', paramsArray);

        if (queryString != '') {
            db.executeQuery(0, queryString, function (err, data) {
                if (err === false) {
                    //query successfully inserted
                    callback(false, { data: data }, 200);
                } else {
                    //query insert failed
                    callback(false, { data: data }, 200);
                }
            });
        }
    };
}
;
module.exports = LoginConfigService;