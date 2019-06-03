/*
 * author: Md Shadab Ali
 */

function FormsConfigService(db, util) {

  this.addFormInsert = function (request, callback) {
      var paramsArray = new Array(
          request.form_name,
          request.form_type_id,
          request.sequence_id,
          request.is_workflow,
          request.is_origin,
          request.percentage,
          request.department_id,
          request.office_id,
          request.organization_id,
          request.user_id,
      );
      var queryString = util.getQueryString('forms_add', paramsArray);

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

  this.getForms = function (request, callback) {
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
  this.formFieldDefinitionInsert = async function (request) {
    let formId = 0,
        fieldDefinitions = [],
        formData = [],
        error;

    request.update_type_id = 28;

    try {
        fieldDefinitions = JSON.parse(request.fields_data);
    } catch (error) {
        return [true, {
            message: "fields_data has invalid JSON."
        }];
    }
    const JsonData = [
      {
        "label": "First Name",
        "title": "First Name",
        "is_required": false,
        "next_field_id" : 0,
        "sequence_id": 1,
        "field_json":"",
        "field_type_id": 1
      },
      {
        "label": "Last Name",
        "title": "Last Name",
        "is_required": false,
        "next_field_id" : 0,
        "sequence_id": 1,
        "field_json":"",
        "field_type_id": 1
      },
      {
        "label": "Middle Name",
        "title": "Middle Name",
        "is_required": false,
        "next_field_id" : 0,
        "sequence_id": 1,
        "field_json":"",
        "field_type_id": 1
      },
    ];
    for (const formField of fieldDefinitions) {
        let fieldName = (typeof formField.label == 'undefined') ? formField.title : formField.label;
        let fieldMandatoryEnabled = formField.is_required == true ? 1 : 0;
        let nextFieldId = (typeof formField.next_field_id == '  ') ? 0 : Number(formField.next_field_id);
        let fieldSequenceId = Number(formField.sequence_id);
        let fieldJson = (typeof formField.field_json == 'undefined' || formField.field_json=="") ? '{"new":"data"}' : formField.field_json;

        //let dataTypeCategoryId = Number(formField.dataTypeCategoryId);

        console.log('\x1b[36m\n\n%s\x1b[0m', 'fieldSequenceId: ', fieldSequenceId);
        //console.log('\x1b[36m\n\n%s\x1b[0m', 'dataTypeCategoryId: ', dataTypeCategoryId);

        await workforceFormFieldMappingInsert(request, {
          field_id: 0,
          field_name: fieldName,
          field_sequence_id: fieldSequenceId,
          field_is_required: fieldMandatoryEnabled,
          field_json: fieldJson, // THIS NEEDS WORK
          field_choice_id: 0,
          field_choice_value: '',
          data_type_id: Number(formField.field_type_id),
          next_field_id: nextFieldId,

      })
      .then(async (fieldData) => {
          // console.log("someData: ", someData)
          // History insert in the workforce_form_field_mapping_history_insert table
          /* await workforceFormFieldMappingHistoryInsert(request, {
                  field_id: Number(fieldData[0].p_field_id),
                  data_type_combo_id: 0
              })
              .catch((error) => {
                  // Do nothing
              }); */
      })
      .catch((error) => {
          // Do nothing
      });

        fieldSequenceId++;
    }

    return [false, []]
}
function workforceFormFieldMappingInsert(request, formFieldCollection) {
  return new Promise(async (resolve, reject) => {
      // IN p_field_id BIGINT(20), IN p_field_name VARCHAR(1200), IN p_field_description VARCHAR(150),
      // IN p_field_sequence_id BIGINT(20), IN p_field_mandatory_enabled TINYINT(4),
      // IN p_field_preview_enabled TINYINT(4), IN p_data_type_combo_id SMALLINT(6),
      // IN p_data_type_combo_value VARCHAR(1200), IN p_data_type_id SMALLINT(6), IN p_next_field_id BIGINT(20),
      // IN p_form_id BIGINT(20), IN p_organization_id BIGINT(20), IN p_log_asset_id BIGINT(20), IN p_log_datetime DATETIME

      let paramsArr = new Array(
          formFieldCollection.field_name || '',
          formFieldCollection.field_is_required,
          formFieldCollection.field_sequence_id,
          formFieldCollection.data_type_id,
          formFieldCollection.field_choice_id,
          formFieldCollection.field_choice_value,
          formFieldCollection.field_json,
          formFieldCollection.next_field_id,
          request.form_id,
          request.department_id,
          request.office_id,
          request.organization_id,
          request.user_id,
      );
        console.log('\x1b[36m\n\n%s\x1b[0m',"final Params for Field Insert" , paramsArr);
      const queryString = util.getQueryString('form_fields_add', paramsArr);
      if (queryString !== '') {
          db.executeQuery(0, queryString, request, function (err, data) {
              (err) ? reject(err): resolve(data);
          });
      }
  });
}
async function workforceFormFieldMappingUpdateCombo(request, fieldOptions) {
  // IN p_field_id BIGINT(20), IN p_data_type_combo_id SMALLINT(6),
  // IN p_form_id BIGINT(20), IN p_field_name VARCHAR(1200),
  // IN p_field_description VARCHAR(300), IN p_data_type_combo_value VARCHAR(1200),
  // IN p_field_sequence_id BIGINT(20), IN p_field_mandatory_enabled TINYINT(4),
  // IN p_field_preview_enabled TINYINT(4), IN p_log_state TINYINT(4),
  // IN p_organization_id BIGINT(20), IN p_log_asset_id BIGINT(20), IN p_log_datetime DATETIME

  let updateStatus = [],
      error = true; // true;

  let procName = 'ds_p1_workforce_form_field_mapping_update_combo';
  let paramsArr = new Array(
      fieldOptions.field_id,
      fieldOptions.data_type_combo_id,
      request.form_id,
      fieldOptions.field_name,
      fieldOptions.field_description,
      fieldOptions.data_type_combo_value,
      fieldOptions.field_sequence_id,
      fieldOptions.field_mandatory_enabled,
      fieldOptions.field_preview_enabled,
      fieldOptions.log_state,
      request.organization_id,
      request.asset_id,
      util.getCurrentUTCTime(),
  );
  // const queryString = util.getQueryString('ds_p1_workforce_form_field_mapping_update_combo', paramsArr);
  // console.log(queryString);
  await db.callDBProcedure(request, procName, paramsArr, 0)
      .then((data) => {
          updateStatus = data;
          error = false;
      })
      .catch((err) => {
          error = err;
      });
  return [error, updateStatus];
}

function workforceFormFieldMappingHistoryInsert(request, formFieldCollection) {
  return new Promise(async (resolve, reject) => {
      // IN p_field_id BIGINT(20), IN p_data_type_combo_id SMALLINT(6), IN p_form_id BIGINT(20),
      // IN p_organization_id BIGINT(20), IN p_update_type_id SMALLINT(6), IN p_update_datetime DATETIME
      let paramsArr = new Array(
          formFieldCollection.field_id,
          formFieldCollection.data_type_combo_id,
          request.form_id,
          request.organization_id,
          request.update_type_id || 0,
          util.getCurrentUTCTime()
      );
      const queryString = util.getQueryString('ds_p1_workforce_form_field_mapping_history_insert', paramsArr);
      if (queryString !== '') {
          db.executeQuery(0, queryString, request, function (err, data) {
              (err) ? reject(err): resolve(data);
          });
          // await sleep(500);
          // console.log("workforceFormFieldMappingHistoryInsert | ", queryString)
          // resolve([{field_id: 7777}])
      }
  });
}

}
;
module.exports = FormsConfigService;
