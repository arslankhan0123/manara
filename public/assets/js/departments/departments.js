/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!********************************************************!*\
  !*** ./resources/assets/js/departments/departments.js ***!
  \********************************************************/


$(document).on('submit', '#addNewDepartmentForm', function (e) {
  e.preventDefault();
  processingBtn('#addNewDepartmentForm', '#btnSave', 'loading');
  $.ajax({
    url: route('departments.store'),
    type: 'POST',
    data: $(this).serialize(),
    success: function success(result) {
      if (result.success) {
        displaySuccessMessage(result.message);
        $('#addDepartmentModal').modal('hide');
        window.livewire.emit('refresh');
      }
    },
    error: function error(result) {
      displayErrorMessage(result.responseJSON.message);
    },
    complete: function complete() {
      processingBtn('#addNewDepartmentForm', '#btnSave');
    }
  });
});
$(document).on('click', '.edit-btn', function (event) {
  var departmentId = $(event.currentTarget).data('id');
  renderData(departmentId);
});

window.renderData = function (id) {
  $.ajax({
    url: route('departments.edit', id),
    type: 'GET',
    success: function success(result) {
      if (result.success) {
        $('#departmentId').val(result.data.id);
        var element = document.createElement('textarea');
        element.innerHTML = result.data.name;
        $('#editName').val(element.value);
        $('#editDepartmentModal').appendTo('body').modal('show');
      }
    },
    error: function error(result) {
      displayErrorMessage(result.responseJSON.message);
    }
  });
};

$(document).on('submit', '#editDepartmentForm', function (event) {
  event.preventDefault();
  processingBtn('#editDepartmentForm', '#btnEditSave', 'loading');
  var id = $('#departmentId').val();
  $.ajax({
    url: route('departments.update', id),
    type: 'put',
    data: $(this).serialize(),
    success: function success(result) {
      if (result.success) {
        displaySuccessMessage(result.message);
        $('#editDepartmentModal').modal('hide');
        window.livewire.emit('refresh');
      }
    },
    error: function error(result) {
      displayErrorMessage(result.responseJSON.message);
    },
    complete: function complete() {
      processingBtn('#editDepartmentForm', '#btnEditSave');
    }
  });
});
$(document).on('click', '.delete-btn', function () {
  var departmentId = $(this).attr('data-id');
  deleteItemLiveWire(route('departments.destroy', departmentId), Lang.get('messages.common.department'));
});
$('#addDepartmentModal').on('hidden.bs.modal', function () {
  resetModalForm('#addNewDepartmentForm', '#validationErrorsBox');
});
$('#editDepartmentModal').on('hidden.bs.modal', function () {
  resetModalForm('#editDepartmentForm', '#editValidationErrorsBox');
});
/******/ })()
;