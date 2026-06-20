/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!************************************************************!*\
  !*** ./resources/assets/js/clients/estimates/estimates.js ***!
  \************************************************************/


$(document).ready(function () {
  $('#estimateStatus').select2({
    width: '150px'
  });
});
$(document).on('change', '#estimateStatus', function () {
  window.livewire.emit('filterStatus', $(this).val());
});
/******/ })()
;