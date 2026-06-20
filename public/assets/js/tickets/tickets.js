/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!************************************************!*\
  !*** ./resources/assets/js/tickets/tickets.js ***!
  \************************************************/


$(document).ready(function () {
  $('#ticketStatus').select2({
    width: '150px'
  });
  $('#ticketPriorityId').select2({
    width: '190px'
  });
});
$(document).on('mouseenter', '.livewire-card', function () {
  $(this).find('.ticket-action-btn').removeClass('d-none');
});
$(document).on('mouseleave', '.livewire-card', function () {
  $(this).find('.ticket-action-btn').addClass('d-none');
  $(this).parent().trigger('click');
});
$(document).on('change', '#ticketStatus', function () {
  window.livewire.emit('filterTicketByStatus', $(this).val());
});
$(document).on('click', '.delete-btn', function () {
  var ticketId = $(this).attr('data-id');
  deleteItemLiveWire(route('ticket.destroy', ticketId), Lang.get('messages.task.ticket'));
});
document.addEventListener('livewire:load', function (event) {
  Livewire.hook('message.processed', function (message, component) {
    var $owl = $('.owl-carousel');
    $owl.trigger('destroy.owl.carousel');
    $owl.html($owl.find('.owl-stage-outer').html()).removeClass('owl-loaded');
    livewireLoadOwel($owl);
  });
});
$(document).ready(function () {
  $('#customerTicketStatus').select2();
});
$(document).on('change', '#customerTicketStatus', function () {
  window.livewire.emit('filterTicketByStatus', $(this).val());
});
$(document).on('change', '#ticketPriorityId', function () {
  window.livewire.emit('filterTicketPriority', $(this).val());
});
document.addEventListener('DOMContentLoaded', function (event) {
  Livewire.hook('message.received', function (message, component) {
    setTimeout(function () {
      $(document).find('#customerTicketStatus').select2('destroy');
      $(document).find('#customerTicketStatus').select2();
      $(document).find('.select2').removeClass('opacity-0');
    }, 200);
  });
});
/******/ })()
;