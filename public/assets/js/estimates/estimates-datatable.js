/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**************************************************************!*\
  !*** ./resources/assets/js/estimates/estimates-datatable.js ***!
  \**************************************************************/


$(document).ready(function () {
  $('#filterStatus').select2({
    width: '150px'
  });
});
$(document).on('mouseenter', '.estimate-card', function () {
  $(this).find('.action-dropdown').removeClass('d-none');
});
$(document).on('mouseleave', '.estimate-card', function () {
  $(this).find('.action-dropdown').addClass('d-none');
  $(this).parent().trigger('click');
});
$(document).on('change', '#filterStatus', function () {
  window.livewire.emit('filterEstimateStatus', $(this).val());
});
$(document).on('click', '.delete-btn', function () {
  var estimateId = $(this).attr('data-id');
  deleteItemLiveWire(route('estimates.destroy', estimateId), Lang.get('messages.estimate.estimate'));
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
  $('#estimateFilterStatus').select2();
});
$(document).on('change', '#estimateFilterStatus', function () {
  window.livewire.emit('filterEstimateStatus', $(this).val());
});
document.addEventListener('DOMContentLoaded', function (event) {
  Livewire.hook('message.received', function (message, component) {
    setTimeout(function () {
      $(document).find('#estimateFilterStatus').select2('destroy');
      $(document).find('#estimateFilterStatus').select2();
      $(document).find('.select2').removeClass('opacity-0');
    }, 200);
  });
});
/******/ })()
;