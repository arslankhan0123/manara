/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!************************************************************!*\
  !*** ./resources/assets/js/payment-modes/payment-modes.js ***!
  \************************************************************/


$(document).ready(function () {
  $('#filterActivePaymentMode').select2({
    width: '150px'
  });
});
$(document).on('change', '#filterActivePaymentMode', function () {
  window.livewire.emit('filterStatus', $(this).val());
});
$(document).on('submit', '#addNewForm', function (e) {
  e.preventDefault();
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
    url: route('payment-modes.store'),
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
  var paymentModeId = $(event.currentTarget).data('id');
  renderData(paymentModeId);
});

window.renderData = function (id) {
  $.ajax({
    url: route('payment-modes.edit', id),
    type: 'GET',
    success: function success(result) {
      if (result.success) {
        $('#paymentModeId').val(result.data.id);
        var element = document.createElement('textarea');
        element.innerHTML = result.data.name;
        $('#editName').val(element.value);
        $('#editDescription').summernote('code', result.data.description);

        if (result.data.active) {
          $('#editActive').prop('checked', true);
        }

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
  var id = $('#paymentModeId').val();
  var editDescription = $('<div />').html($('#editDescription').summernote('code'));
  var empty = editDescription.text().trim().replace(/ \r\n\t/g, '') === '';

  if ($('#editDescription').summernote('isEmpty')) {
    $('#editDescription').val('');
  } else if (empty) {
    displayErrorMessage('Description field is not contain only white space');
    processingBtn('#editForm', '#btnEditSave', 'reset');
    return false;
  }

  $.ajax({
    url: route('payment-modes.update', id),
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
  var paymentModeId = $(this).attr('data-id');
  deleteItemLiveWire(route('payment-modes.destroy', paymentModeId), Lang.get('messages.common.payment_mode'));
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
$(document).on('change', '#invoicesOnly, #expensesOnly', function () {
  checkforDisable('#invoicesOnly', '#expensesOnly');
});
$(document).on('change', '#editInvoicesOnly, #editExpensesOnly', function () {
  checkforDisable('#editInvoicesOnly', '#editExpensesOnly');
});

var checkforDisable = function checkforDisable(invoices, expenses) {
  if ($(invoices).prop('checked') == true) {
    $(expenses).attr('disabled', true);
  } else if ($(expenses).prop('checked') == true) {
    $(invoices).attr('disabled', true);
  } else {
    $(invoices).attr('disabled', false);
    $(expenses).attr('disabled', false);
  }
}; // payment mode activation deactivation change event


$(document).on('change', '.isActive', function () {
  var paymentModeId = $(this).attr('data-id');
  activeDeActivePaymentMode(paymentModeId);
}); // activate de-activate PaymentMode

window.activeDeActivePaymentMode = function (id) {
  $.ajax({
    url: route('payment-modes.active.deactive', id),
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
}; // Show Payment Mode details on modal


$(document).on('click', '.show-btn', function (e) {
  var paymentModeId = $(e.currentTarget).attr('data-id');
  $.ajax({
    url: route('payment-modes.show', paymentModeId),
    type: 'GET',
    beforeSend: function beforeSend() {
      startLoader();
    },
    complete: function complete() {
      stopLoader();
    },
    success: function success(result) {
      if (result.success) {
        $('#showName').html('');
        $('#showDescription').html('');
        $('#showName').append(result.data.name);
        var element = document.createElement('textarea');
        element.innerHTML = result.data.description;
        var description = element.value;
        $('#showDescription').append(description ? description : 'N/A');
        $('#showModal').appendTo('body').modal('show');
      }
    },
    error: function error(result) {
      displayErrorMessage(result.responseJSON.message);
    }
  });
});
/******/ })()
;