/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!************************************************************!*\
  !*** ./resources/assets/js/clients/contracts/contracts.js ***!
  \************************************************************/


$(document).ready(function () {
  $('#filterType').select2({
    width: '200px'
  });
});
$(document).on('change', '#filterType', function () {
  window.livewire.emit('filterType', $(this).val());
});
/******/ })()
;