/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!************************************************************!*\
  !*** ./resources/assets/js/invoices/invoices-datatable.js ***!
  \************************************************************/


$(document).ready(function () {
  $('#paymentStatus').select2({
    width: '150px'
  });
});
$(document).on('click', '.delete-btn', function () {
  var invoiceId = $(this).attr('data-id');
  deleteItemLiveWire(route('invoices.destroy', invoiceId), Lang.get('messages.contact.invoice'));
});
$(document).on('change', '#paymentStatus', function () {
  window.livewire.emit('filterStatus', $(this).val());
});
$(document).on('mouseenter', '.livewire-card', function () {
  $(this).find('.invoice-action-btn').removeClass('d-none');
});
$(document).on('mouseleave', '.livewire-card', function () {
  $(this).find('.invoice-action-btn').addClass('d-none');
  $(this).parent().trigger('click');
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
  $('#invoicePaymentStatus').select2();
});
$(document).on('change', '#invoicePaymentStatus', function () {
  window.livewire.emit('filterStatus', $(this).val());
});
document.addEventListener('DOMContentLoaded', function (event) {
  Livewire.hook('message.received', function (message, component) {
    setTimeout(function () {
      $(document).find('#invoicePaymentStatus').select2('destroy');
      $(document).find('#invoicePaymentStatus').select2();
      $(document).find('.select2').removeClass('opacity-0');
    }, 200);
  });
});
/******/ })()
;