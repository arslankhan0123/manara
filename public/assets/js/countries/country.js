/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**************************************************!*\
  !*** ./resources/assets/js/countries/country.js ***!
  \**************************************************/


var countryUrl = route('countries.index') + '/';
var countrySaveUrl = route('countries.store');
$(document).on('click', '.addCountryModal', function () {
  $('#addCountryModal').appendTo('body').modal('show');
});
$(document).on('submit', '#addNewForm', function (e) {
  e.preventDefault();
  processingBtn('#addNewForm', '#btnSave', 'loading');
  $.ajax({
    url: countrySaveUrl,
    type: 'POST',
    data: $(this).serialize(),
    success: function success(result) {
      if (result.success) {
        displaySuccessMessage(result.message);
        $('#addCountryModal').modal('hide');
        window.livewire.emit('refresh');
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
$(document).on('click', '.edit-btn', function (event) {
  var countryId = $(event.currentTarget).data('id');
  renderData(countryId);
});

window.renderData = function (id) {
  $.ajax({
    url: route('countries.edit', id),
    type: 'GET',
    success: function success(result) {
      if (result.success) {
        $('#countryId').val(result.data.id);
        var element = document.createElement('textarea');
        element.innerHTML = result.data.name;
        $('#editName').val(element.value);
        $('#editCountryModal').appendTo('body').modal('show');
      }
    },
    error: function error(result) {
      displayErrorMessage(result.responseJSON.message);
    }
  });
};

$(document).on('submit', '#editForm', function (event) {
  event.preventDefault();
  processingBtn('#editForm', '#btnEditSave', 'loading');
  var id = $('#countryId').val();
  $.ajax({
    url: countryUrl + id,
    type: 'put',
    data: $(this).serialize(),
    success: function success(result) {
      if (result.success) {
        displaySuccessMessage(result.message);
        $('#editCountryModal').modal('hide');
        window.livewire.emit('refresh');
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
$(document).on('click', '.delete-btn', function () {
  var countryId = $(this).attr('data-id');
  deleteItemLiveWire(route('countries.destroy', countryId), Lang.get('messages.common.country'));
});
$('#addCountryModal').on('hidden.bs.modal', function () {
  resetModalForm('#addNewForm', '#validationErrorsBox');
});
$('#editCountryModal').on('hidden.bs.modal', function () {
  resetModalForm('#editForm', '#editValidationErrorsBox');
});
/******/ })()
;