/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!****************************************************!*\
  !*** ./resources/assets/js/estimates/show-page.js ***!
  \****************************************************/


$(document).on('click', 'a', function (event) {
  event.stopPropagation();
});
$(document).on('click', '#markAsDraft, #markAsSend, #markAsExpired, #markAsDeclined, #markAsAccepted', function () {
  var status = $(this).data('status');
  $.ajax({
    url: route('estimate.change-status', estimateId),
    type: 'put',
    data: {
      'status': status
    },
    success: function success(result) {
      if (result.success) {
        window.location.reload();
        displaySuccessMessage(result.message);
      }
    },
    error: function error(result) {
      displayErrorMessage(result.responseJSON.message);
    }
  });
}); //========== Convert Estimate To Invoice ==========================//

$(document).on('click', '#convertToInvoice', function () {
  $.ajax({
    url: route('estimate.convert-to-invoice', estimateId),
    type: 'post',
    success: function success(result) {
      if (result.success) {
        var invoiceId = result.data.id;
        window.location.href = invoiceUrl + '/' + invoiceId;
        displaySuccessMessage(result.message);
      }
    },
    error: function error(result) {
      displayErrorMessage(result.responseJSON.message);
    }
  });
});
/******/ })()
;