/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*****************************************************!*\
  !*** ./resources/assets/js/payments/add-payment.js ***!
  \*****************************************************/


$(document).ready(function () {
  $('#paymentMode').select2({
    width: '100%'
  });
  $('#paymentDate').datetimepicker({
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
  $(document).on('click', '#addPayment', function (event) {
    var invoiceId = $(event.currentTarget).data('id');
    renderData(invoiceId);
  });
  $('#note').summernote({
    dialogsInBody: true,
    minHeight: 150,
    toolbar: [['style', ['bold', 'italic', 'underline', 'clear']], ['font', ['strikethrough']], ['para', ['paragraph']]]
  });

  window.renderData = function (id) {
    $.ajax({
      url: route('payments.create'),
      type: 'GET',
      data: {
        invoice_id: id
      },
      success: function success(result) {
        if (result.success) {
          $('#paymentOwnerId').val(result.data.id);
          $('#paymentAmount').val(getFormattedPrice(result.data.amount));
          $('#paymentDate').val(format(result.data.date, 'YYYY-MM-DD HH:mm:ss'));
          $('#addPaymentModal').appendTo('body').modal('show');
        }
      },
      error: function error(result) {
        displayErrorMessage(result.responseJSON.message);
      }
    });
  };

  $(document).on('submit', '#addNewPaymentForm', function (e) {
    e.preventDefault();
    processingBtn('#addNewPaymentForm', '#btnPaymentSave', 'loading');
    $.ajax({
      url: route('payments.store'),
      type: 'POST',
      data: $(this).serialize(),
      success: function success(result) {
        if (result.success) {
          displaySuccessMessage(result.message);
          $('#addPaymentModal').modal('hide');
          $('#paymentsTbl').DataTable().ajax.reload(null, true);
          window.location.href = invoiceUrl + '/' + invoiceId;
        }
      },
      error: function error(result) {
        displayErrorMessage(result.responseJSON.message);
      },
      complete: function complete() {
        processingBtn('#addNewPaymentForm', '#btnPaymentSave');
      }
    });
  });
});
$('#addPaymentModal').on('show.bs.modal', function () {
  $('.note-toolbar-wrapper').removeAttr('style');
  $('.note-toolbar').removeAttr('style');
});
/******/ })()
;