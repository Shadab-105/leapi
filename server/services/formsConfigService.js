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
  this.updateForm = (request,callback)=>{
    var paramsArray = new Array(
      request.organization_id,
      request.form_id,
      request.form_name,
      request.form_type_id,
      request.sequence_id,
      request.is_workflow,
      request.is_origin,
      request.percentage,
      request.user_id,
      request.log_datetime
  );
  var queryString = util.getQueryString('forms_edit', paramsArray);

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

    for (const formField of fieldDefinitions) {
      console.log("FIELDS",formField);
        let fieldName = (typeof formField.field_name == 'undefined') ? "" : formField.field_name;
        let fieldMandatoryEnabled = formField.is_required == true ? 1 : 0;
        let nextFieldId = (typeof formField.field_id == '') ? 0 : Number(formField.field_id);
        let fieldSequenceId = 1;
        let fieldOptions = {
          options: formField.options,
          validations: formField.validations
        }
        let fieldJson = JSON.stringify(fieldOptions)
        //let fieldJson = (typeof formField.options == 'undefined' || formField.options=="") ? '{}' : JSON.stringify(formField.options);

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
          data_type_id: Number(formField.type_id),
          next_field_id: nextFieldId,

      })
      .then( (fieldData) => {
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
          console.log("Errror Saving",error)
      });

        fieldSequenceId++;
    }

    return [false, []]
}
this.formFieldDefinitionUpdate = async function(request){
  let formId = 0,
        fieldDefinitions = [],
        formData = [],
        error;
    try {
        fieldDefinitions = JSON.parse(request.fields_data);
    } catch (error) {
        return [true, {
            message: "fields_data has invalid JSON."
        }];
    }
    for (const formField of fieldDefinitions) {
      console.log("FIELDS Update",formField);
        let fieldName = (typeof formField.field_name == 'undefined') ? "" : formField.field_name;
        let fieldMandatoryEnabled = formField.is_required == true ? 1 : 0;
        let nextFieldId = (typeof formField.field_id == '') ? 0 : Number(formField.field_id);
        let fieldSequenceId = 1;
        let fieldOptions = {
          options: formField.options,
          validations: formField.validations
        }
        let fieldJson = JSON.stringify(fieldOptions)
        //let fieldJson = (typeof formField.options == 'undefined' || formField.options=="") ? '{}' : JSON.stringify(formField.options);

        //let dataTypeCategoryId = Number(formField.dataTypeCategoryId);

        console.log('\x1b[36m\n\n%s\x1b[0m', 'fieldSequenceId: ', fieldSequenceId);
        //console.log('\x1b[36m\n\n%s\x1b[0m', 'dataTypeCategoryId: ', dataTypeCategoryId);

        await workforceFormFieldMappingUpdate(request, {
          field_id: formField.field_id,
          field_name: fieldName,
          field_sequence_id: fieldSequenceId,
          field_is_required: fieldMandatoryEnabled,
          field_json: fieldJson, // THIS NEEDS WORK
          field_choice_id: 0,
          field_choice_value: '',
          data_type_id: Number(formField.type_id),
          next_field_id: nextFieldId,

      })
      .then( (fieldData) => {
           //console.log("Field Data: "+formField.field_id, fieldData)
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
          console.log("Errror Saving",error)
      });

        fieldSequenceId++;
    }
    return [false, []]
}
 async function workforceFormFieldMappingInsert(request, formFieldCollection) {
  return new Promise((resolve, reject) => {
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
        db.executeQuery(0, queryString, function (err, data) {
          if (err === false) {
              //query successfully inserted
              resolve(data);

              //callback(false, { data: data }, 200);
          } else {
              //query insert failed
              reject(err);
              //callback(false, { data: data }, 200);
          }
      });

      }
  });
}
async function workforceFormFieldMappingUpdate(request, formFieldCollection) {
  return new Promise((resolve, reject) => {
      // IN p_field_id BIGINT(20), IN p_field_name VARCHAR(1200), IN p_field_description VARCHAR(150),
      // IN p_field_sequence_id BIGINT(20), IN p_field_mandatory_enabled TINYINT(4),
      // IN p_field_preview_enabled TINYINT(4), IN p_data_type_combo_id SMALLINT(6),
      // IN p_data_type_combo_value VARCHAR(1200), IN p_data_type_id SMALLINT(6), IN p_next_field_id BIGINT(20),
      // IN p_form_id BIGINT(20), IN p_organization_id BIGINT(20), IN p_log_asset_id BIGINT(20), IN p_log_datetime DATETIME

      let paramsArr = new Array(
          request.organization_id,
          request.form_id,
          formFieldCollection.field_id,
          formFieldCollection.field_name || '',
          formFieldCollection.field_choice_id,
          formFieldCollection.field_choice_value,
          formFieldCollection.field_json,
          formFieldCollection.field_sequence_id,
          formFieldCollection.field_is_required,
          request.user_id,
          request.log_datetime
      );
        console.log('\x1b[36m\n\n%s\x1b[0m',"final Params for Field Insert" , paramsArr);
      const queryString = util.getQueryString('form_fields_edit', paramsArr);
      if (queryString !== '') {
        db.executeQuery(0, queryString, function (err, data) {
          if (err === false) {
              //query successfully inserted
              resolve(data);

              //callback(false, { data: data }, 200);
          } else {
              //query insert failed
              reject(err);
              //callback(false, { data: data }, 200);
          }
      });

      }
  });
}


}
;
module.exports = FormsConfigService;
