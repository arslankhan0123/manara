/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**************************************************************!*\
  !*** ./resources/assets/js/proposals/proposals-datatable.js ***!
  \**************************************************************/


$(document).ready(function () {
  $('#filterStatus').select2({
    width: '150px'
  });
});
$(document).on('change', '#filterStatus', function () {
  window.livewire.emit('filterProposalStatus', $(this).val());
});
$(document).on('mouseenter', '.livewire-card', function () {
  $(this).find('.proposal-action-btn').removeClass('d-none');
});
$(document).on('mouseleave', '.livewire-card', function () {
  $(this).find('.proposal-action-btn').addClass('d-none');
  $(this).parent().trigger('click');
});
$(document).on('click', '.delete-btn', function () {
  var proposalId = $(this).attr('data-id');
  deleteItemLiveWire(route('proposals.destroy', proposalId), Lang.get('messages.common.proposal'));
});

if (customerId === null) {
  document.addEventListener('livewire:load', function (event) {
    Livewire.hook('message.processed', function (message, component) {
      var $owl = $('.owl-carousel');
      $owl.trigger('destroy.owl.carousel');
      $owl.html($owl.find('.owl-stage-outer').html()).removeClass('owl-loaded');
      livewireLoadOwel($owl);
    });
  });
}

$(document).ready(function () {
  $('#proposalFilterStatus').select2();
});
$(document).on('change', '#proposalFilterStatus', function () {
  window.livewire.emit('filterProposalStatus', $(this).val());
});
document.addEventListener('DOMContentLoaded', function (event) {
  Livewire.hook('message.received', function (message, component) {
    setTimeout(function () {
      $(document).find('#proposalFilterStatus').select2('destroy');
      $(document).find('#proposalFilterStatus').select2();
      $(document).find('.select2').removeClass('opacity-0');
    }, 200);
  });
});
/******/ })()
;