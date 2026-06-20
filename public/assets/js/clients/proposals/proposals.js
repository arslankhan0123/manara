/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!************************************************************!*\
  !*** ./resources/assets/js/clients/proposals/proposals.js ***!
  \************************************************************/


$(document).ready(function () {
  $('#proposalStatus').select2({
    width: '150px'
  });
});
$(document).on('change', '#proposalStatus', function () {
  window.livewire.emit('filterProposalStatus', $(this).val());
});
/******/ })()
;