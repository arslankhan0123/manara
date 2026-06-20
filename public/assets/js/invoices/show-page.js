/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!***************************************************!*\
  !*** ./resources/assets/js/invoices/show-page.js ***!
  \***************************************************/


$(document).on('click', 'a', function (event) {
  event.stopPropagation();
});
$(document).on('click', '#markAsSent, #markAsCancelled, #unmarkAsCancelled', function () {
  var paymentStatus = $(this).data('status');
  $.ajax({
    url: changeStatus,
    type: 'put',
    data: {
      'paymentStatus': paymentStatus
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
});
/******/ })()
;