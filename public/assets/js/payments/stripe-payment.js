/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!********************************************************!*\
  !*** ./resources/assets/js/payments/stripe-payment.js ***!
  \********************************************************/


$(document).ready(function () {
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });
  $(document).on('click', '#invoiceStripePayment', function () {
    var _this = this;

    var payloadData = {
      invoiceId: invoiceID
    };
    $(this).html('<div class="spinner-border spinner-border-sm" role="status">\n' + '<span class="sr-only">Loading...</span>\n' + '</div>' + '  ' + 'Loading...');
    $(this).addClass('disabled');
    $.post(invoiceStripePaymentUrl, payloadData).done(function (result) {
      var sessionId = result.data.sessionId;
      stripe.redirectToCheckout({
        sessionId: sessionId
      }).then(function (result) {
        manageAjaxErrors(result);
      });
    })["catch"](function (error) {
      manageAjaxErrors(error);
      $(_this).removeClass('disabled');
    });
  });
});
/******/ })()
;