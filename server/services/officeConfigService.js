/*
 * author: Kapil Gundawar
 */

function OfficeConfigService(db, util) {

    this.addOfficeInsert = function (request, callback) {
        var paramsArray = new Array(
            request.organization_id,
            request.office_type_id,
            request.name,
            request.office_country_code,
            request.phone,
            request.address,
            request.location,
            request.fax,
            request.info,
            request.user_id,
        );
        var queryString = util.getQueryString('office_add', paramsArray);

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
    this.editOffice = function (request, callback) {
        var paramsArray = new Array(
            request.office_id,
            request.organization_id,
            request.office_type_id,
            request.name,
            request.office_country_code,
            request.phone,
            request.address,
            request.location,
            request.fax,
            request.info,
            request.user_id,
        );
        var queryString = util.getQueryString('office_edit', paramsArray);

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
    this.getOffice = function (request, callback) {
        var paramsArray = new Array(
            request.organization_id,
            request.office_id,
            request.search_string,
            request.flag,
            request.sort_flag,
            request.start,
            request.limit,
        );
        var queryString = util.getQueryString('office_get', paramsArray);

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
    this.getFormsList = function (request, callback) {
      var paramsArray = new Array(
        request.organization_id,
        request.form_id,
        request.search_string,
        request.flag,
        request.sort_flag,
        request.start,
        request.limit,
    );
      var queryString = util.getQueryString('forms_get', paramsArray);

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
  this.getFormsFieldList = function (request, callback) {
    var paramsArray = new Array(
      request.organization_id,
      request.form_id,
      request.flag,
      request.sort_flag,
      request.start,
      request.limit,
  );
    var queryString = util.getQueryString('form_fields_get', paramsArray);

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
module.exports = OfficeConfigService;
