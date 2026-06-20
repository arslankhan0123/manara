/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**********************************************************!*\
  !*** ./resources/assets/js/clients/invoices/invoices.js ***!
  \**********************************************************/


$(document).ready(function () {
  $('#paymentStatus').select2({
    width: '150px'
  });
});
$(document).on('change', '#paymentStatus', function () {
  window.livewire.emit('filterPaymentStatus', $(this).val());
});
/******/ })()
;