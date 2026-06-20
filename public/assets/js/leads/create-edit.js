/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**************************************************!*\
  !*** ./resources/assets/js/leads/create-edit.js ***!
  \**************************************************/


$(document).ready(function () {
  $('#leadTagID').select2({
    width: 'calc(100% - 44px)',
    placeholder: Lang.get('messages.placeholder.select_tags')
  });
  $('#memberId,#countryId,#languageId').select2({
    width: '100%'
  });
  $('#sourceId').select2({
    width: 'calc(100% - 44px)',
    placeholder: Lang.get('messages.placeholder.select_source')
  });
  $('#statusId').select2({
    width: 'calc(100% - 44px)',
    placeholder: Lang.get('messages.placeholder.select_status')
  });

  window.toggleDateField = function (selector) {
    if ($(selector).prop('checked') === true) {
      $('#contactForm').slideUp();
    } else {
      $('#contactForm').slideDown();
    }
  };

  $(document).on('change', '#checkContact', function () {
    toggleDateField('#checkContact');
  });

  if (typeof isEdit !== 'undefined' && isEdit) {
    toggleDateField('#checkContact');
  }

  $('#contactDateId').datetimepicker({
    format: 'YYYY-MM-DD HH:mm:ss',
    useCurrent: true,
    sideBySide: true,
    icons: {
      up: 'fa fa-chevron-up',
      down: 'fa fa-chevron-down',
      next: 'fa fa-chevron-right',
      previous: 'fa fa-chevron-left'
    }
  });
  $('#leadDescription').summernote({
    minHeight: 200,
    toolbar: [['style', ['bold', 'italic', 'underline', 'clear']], ['font', ['strikethrough']], ['para', ['paragraph']]]
  });
  $(document).on('submit', '#createLead, #editLead', function () {
    var loadingButton = jQuery(this).find('#btnSave');
    loadingButton.button('loading');
    var description = $('<div />').html($('#leadDescription').summernote('code'));
    var empty = description.text().trim().replace(/ \r\n\t/g, '') === '';

    if ($('#leadDescription').summernote('isEmpty')) {
      $('#leadDescription').val('');
    } else if (empty) {
      displayErrorMessage('Description field is not contain only white space');

      var _loadingButton = jQuery(this).find('#btnSave');

      _loadingButton.button('reset');

      return false;
    }

    if ($('#error-msg').text() !== '') {
      $('#phoneNumber').focus();
      return false;
    }
  });
  $(document).on('blur', '#website', function () {
    var website = $(this).val();

    if (isEmpty(website)) {
      $('#website').val('');
    } else {
      website = websiteURLConvert(website);
      $('#website').val(website);
    }
  });

  window.websiteURLConvert = function (website) {
    if (!~website.indexOf('http')) {
      website = 'http://' + website;
    }

    return website;
  };
});
$(document).on('submit', '#addNewForm', function (e) {
  e.preventDefault();
  processingBtn('#addNewForm', '#btnSave', 'loading');
  $.ajax({
    url: route('lead.source.store'),
    type: 'POST',
    data: $(this).serialize(),
    success: function success(result) {
      if (result.success) {
        displaySuccessMessage(result.message);
        $('#addModal').modal('hide');
        var data = {
          id: result.data.id,
          name: result.data.name
        };
        var newOption = new Option(data.name, data.id, false, true);
        $('#sourceId').append(newOption).trigger('change');
      }
    },
    error: function error(result) {
      displayErrorMessage(result.responseJSON.message);
    },
    complete: function complete() {
      processingBtn('#addNewForm', '#btnSave');
    }
  });
});
$('#addModal').on('hidden.bs.modal', function () {
  resetModalForm('#addNewForm', '#validationErrorsBox');
});
$(document).on('submit', '#addLeadStatusForm', function (e) {
  e.preventDefault();
  processingBtn('#addLeadStatusForm', '#btnSave', 'loading');
  $.ajax({
    url: route('lead.status.store'),
    type: 'POST',
    data: $(this).serialize(),
    success: function success(result) {
      if (result.success) {
        displaySuccessMessage(result.message);
        $('#addLeadStatusModal').modal('hide');
        var data = {
          id: result.data.id,
          name: result.data.name
        };
        var newOption = new Option(data.name, data.id, false, true);
        $('#statusId').append(newOption).trigger('change');
      }
    },
    error: function error(result) {
      displayErrorMessage(result.responseJSON.message);
    },
    complete: function complete() {
      processingBtn('#addLeadStatusForm', '#btnSave');
    }
  });
});
$('#addLeadStatusModal').on('hidden.bs.modal', function () {
  resetModalForm('#addLeadStatusForm', '#validationErrorsBox');
});
/******/ })()
;