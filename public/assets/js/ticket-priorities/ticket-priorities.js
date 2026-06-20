/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!********************************************************************!*\
  !*** ./resources/assets/js/ticket-priorities/ticket-priorities.js ***!
  \********************************************************************/


$(document).ready(function () {
  $('#filter_status').select2({
    width: '150px'
  });
});
$(document).on('change', '#filter_status', function () {
  window.livewire.emit('filterStatus', $(this).val());
});
$(document).on('click', '.addTicketPriorityModal', function () {
  $('#addModal').appendTo('body').modal('show');
});
$(document).on('submit', '#addNewForm', function (e) {
  e.preventDefault();
  processingBtn('#addNewForm', '#btnSave', 'loading');
  $.ajax({
    url: route('ticketPriorities.store'),
    type: 'POST',
    data: $(this).serialize(),
    success: function success(result) {
      if (result.success) {
        displaySuccessMessage(result.message);
        $('#addModal').modal('hide');
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
  var ticketPriorityId = $(event.currentTarget).data('id');
  renderData(ticketPriorityId);
});

window.renderData = function (id) {
  $.ajax({
    url: route('ticketPriorities.edit', id),
    type: 'GET',
    success: function success(result) {
      if (result.success) {
        $('#ticketPriorityId').val(result.data.id);
        var element = document.createElement('textarea');
        element.innerHTML = result.data.name;
        $('#editName').val(element.value);
        if (result.data.status) $('#editStatus').prop('checked', true);
        $('#editModal').appendTo('body').modal('show');
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
  var id = $('#ticketPriorityId').val();
  $.ajax({
    url: route('ticketPriorities.update', id),
    type: 'put',
    data: $(this).serialize(),
    success: function success(result) {
      if (result.success) {
        displaySuccessMessage(result.message);
        $('#editModal').modal('hide');
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
  var ticketPriorityId = $(this).attr('data-id');
  deleteItemLiveWire(route('ticketPriorities.destroy', ticketPriorityId), Lang.get('messages.common.ticket_priority'));
}); // category activation deactivation change event

$(document).on('change', '.status', function (event) {
  var ticketPriorityId = $(event.currentTarget).data('id');
  activeDeActiveCategory(ticketPriorityId);
}); // activate de-activate category

window.activeDeActiveCategory = function (id) {
  $.ajax({
    url: route('active.deactive', id),
    method: 'post',
    cache: false,
    beforeSend: function beforeSend() {
      startLoader();
    },
    success: function success(result) {
      if (result.success) {
        window.livewire.emit('refresh');
      }
    },
    complete: function complete() {
      stopLoader();
    }
  });
};

$('#addModal').on('hidden.bs.modal', function () {
  resetModalForm('#addNewForm', '#validationErrorsBox');
});
$('#editModal').on('hidden.bs.modal', function () {
  resetModalForm('#editForm', '#editValidationErrorsBox');
});
/******/ })()
;