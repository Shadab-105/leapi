/*
 * author: Kapil Gundawar
 */

function DepartmentConfigService(db, util) {

    this.addDepartmentInsert = function (request, callback) {
        var paramsArray = new Array(
            request.organization_id,
            request.office_id,
            request.dept_type_id,
            request.name,
            request.user_id,
        );
        var queryString = util.getQueryString('department_add', paramsArray);

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
    this.getDepartment = function (request, callback) {
        var paramsArray = new Array(
            request.organization_id,
            request.dept_id,
            request.search_string,
            request.flag,
            request.sort_flag,
            request.start,
            request.limit,
        );
        var queryString = util.getQueryString('department_get', paramsArray);

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
module.exports = DepartmentConfigService;
