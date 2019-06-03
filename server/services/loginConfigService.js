/*
 * author: Kapil Gundawar
 */

function LoginConfigService(db, util) {
  this.addUserInsert = function(request, callback) {
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
      request.phone_code
    );
    var queryString = util.getQueryString("user_add", paramsArray);

    if (queryString != "") {
      db.executeQuery(0, queryString, function(err, data) {
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

  this.addOfficeInsert = function(request, callback) {
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
      request.user_id
    );
    var queryString = util.getQueryString("office_add", paramsArray);

    if (queryString != "") {
      db.executeQuery(0, queryString, function(err, data) {
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

  this.editPassword = function(request, callback) {
    var paramsArray = new Array(request.user_id, request.password);
    var queryString = util.getQueryString("user_edit_password", paramsArray);

    if (queryString != "") {
      db.executeQuery(0, queryString, function(err, data) {
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

  //Add Organizations
  this.addOrganization = function(request, callback) {
    var paramsArray = new Array(
      request.org_name,
      request.org_domain,
      request.org_phone,
      request.org_address,
      request.org_location,
      request.org_fax,
      request.org_info
    );
    var queryString = util.getQueryString("organization_add", paramsArray);

    if (queryString != "") {
      db.executeQuery(0, queryString, function(err, data) {
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
  //Add Organizations
  this.mapOrganizationUser = function(request, callback) {
    var paramsArray = new Array(
      request.user_id,
      request.user_type_id,
      request.dept_id,
      request.office_id,
      request.organization_id,
      request.log_user_id
    );
    var queryString = util.getQueryString(
      "user_organization_mapping_add",
      paramsArray
    );

    if (queryString != "") {
      db.executeQuery(0, queryString, function(err, data) {
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
  //Checkuser login
  this.checkUserLogin = function(request, callback) {
    var paramsArray = new Array(
      request.flag,
      request.user_email,
      request.user_country_code,
      request.user_phone,
      request.user_password,
    );
    var queryString = util.getQueryString(
      "user_get_login",
      paramsArray
    );

    if (queryString != "") {
      db.executeQuery(0, queryString, function(err, data) {
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
  this.getUsers = function(request, callback) {
    // var paramsArray = new Array(
    //     1, 1, 0, 1, 0, 0, 10
    // );
    var paramsArray = new Array(
      request.organization_id,
      request.user_id,
      request.user_type_id,
      request.search_string,
      request.flag,
      request.sort_flag,
      request.start,
      request.limit
    );
    var queryString = util.getQueryString("users_get", paramsArray);

    if (queryString != "") {
      db.executeQuery(0, queryString, function(err, data) {
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
module.exports = LoginConfigService;
