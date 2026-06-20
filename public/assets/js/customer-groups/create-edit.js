/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!************************************************************!*\
  !*** ./resources/assets/js/customer-groups/create-edit.js ***!
  \************************************************************/


var customerGroupCreateUrl = route('customer-groups.store');
var customerGroupUrl = route('customer-groups.index') + '/';
$(document).on('submit', '#addNewForm', function (event) {
  event.preventDefault();
  processingBtn('#addNewForm', '#btnSave', 'loading');
  var description = $('<div />').html($('#createDescription').summernote('code'));
  var empty = description.text().trim().replace(/ \r\n\t/g, '') === '';

  if ($('#createDescription').summernote('isEmpty')) {
    $('#createDescription').val('');
  } else if (empty) {
    displayErrorMessage('Description field is not contain only white space');
    processingBtn('#addNewForm', '#btnSave', 'reset');
    return false;
  }

  $.ajax({
    url: customerGroupCreateUrl,
    type: 'POST',
    data: $(this).serialize(),
    success: function success(result) {
      if (result.success) {
        displaySuccessMessage(result.message);
        $('#addModal').modal('hide');
        $('#customerGroupTable').DataTable().ajax.reload(null, false);
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
$(document).on('submit', '#editForm', function (event) {
  event.preventDefault();
  processingBtn('#editForm', '#btnEditSave', 'loading');
  var editDescription = $('<div />').html($('#editDescription').summernote('code'));
  var empty = editDescription.text().trim().replace(/ \r\n\t/g, '') === '';

  if ($('#editDescription').summernote('isEmpty')) {
    $('#editDescription').val('');
  } else if (empty) {
    displayErrorMessage('Description field is not contain only white space');
    processingBtn('#editForm', '#btnEditSave', 'reset');
    return false;
  }

  var id = $('#customerGroupId').val();
  $.ajax({
    url: customerGroupUrl + id,
    type: 'put',
    data: $(this).serialize(),
    success: function success(result) {
      if (result.success) {
        displaySuccessMessage(result.message);
        $('.modal').modal('hide');
        $('#customerGroupTable').DataTable().ajax.reload(null, false);
      }
    },
    error: function error(result) {
      displayErrorMessage(result.responseJSON.message);
    },
    complete: function complete() {
      processingBtn('#editForm', '#btnEditSave');
    }
  });
});

window.renderData = function (id) {
  $.ajax({
    url: route('customer-groups.edit', id),
    type: 'GET',
    success: function success(result) {
      if (result.success) {
        var customerGroup = result.data;
        $('#customerGroupId').val(customerGroup.id);
        var element = document.createElement('textarea');
        element.innerHTML = result.data.name;
        $('#editName').val(element.value);
        $('#editDescription').summernote('code', customerGroup.description);
        $('#editModal').modal('show');
      }
    },
    error: function error(result) {
      displayErrorMessage(result.responseJSON.message);
    }
  });
};

$(document).on('click', '.edit-btn', function (event) {
  var customerGroupId = $(event.currentTarget).data('id');
  renderData(customerGroupId);
});
$(document).on('click', '.delete-btn', function (event) {
  var customerGroupId = $(event.currentTarget).data('id');
  deleteItem(customerGroupUrl + customerGroupId, '#customerGroupTable', Lang.get('messages.common.customer_group'));
});
$('#addModal').on('show.bs.modal', function () {
  $('.note-toolbar-wrapper').removeAttr('style');
  $('.note-toolbar').removeAttr('style');
});
$('#editModal').on('show.bs.modal', function () {
  $('.note-toolbar-wrapper').removeAttr('style');
  $('.note-toolbar').removeAttr('style');
});
$('#addModal').on('hidden.bs.modal', function () {
  resetModalForm('#addNewForm', '#validationErrorsBox');
  $('#createDescription').summernote('code', '');
});
$('#editModal').on('hidden.bs.modal', function () {
  resetModalForm('#editForm', '#editValidationErrorsBox');
});
$('.summernote-simple').summernote({
  dialogsInBody: true,
  minHeight: 150,
  placeholder: Lang.get('messages.common.description'),
  toolbar: [['style', ['bold', 'italic', 'underline', 'clear']], ['font', ['strikethrough']], ['para', ['paragraph']]]
});
/******/ })()
;