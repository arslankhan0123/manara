/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*******************************************************!*\
  !*** ./resources/assets/js/clients/tickets/ticket.js ***!
  \*******************************************************/


var tableName = '#clientTicketTbl';
$(tableName).DataTable({
  oLanguage: {
    'sEmptyTable': Lang.get('messages.common.no_data_available_in_table'),
    'sInfo': Lang.get('messages.common.data_base_entries'),
    sLengthMenu: Lang.get('messages.common.menu_entry'),
    sInfoEmpty: Lang.get('messages.common.no_entry'),
    sInfoFiltered: Lang.get('messages.common.filter_by'),
    sZeroRecords: Lang.get('messages.common.no_matching')
  },
  processing: true,
  serverSide: true,
  order: false,
  ajax: {
    url: route('client.tickets.index'),
    beforeSend: function beforeSend() {
      startLoader();
    },
    complete: function complete() {
      stopLoader();
    }
  },
  columnDefs: [{
    'targets': [3],
    'orderable': false,
    'className': 'text-center',
    'width': '6%'
  }, {
    'targets': [2],
    'width': '15%',
    'orderable': false
  }, {
    targets: '_all',
    defaultContent: 'N/A'
  }],
  columns: [{
    data: function data(row) {
      var showPageUrl = route('client.tickets.show', row.id);
      var element = document.createElement('textarea');
      element.innerHTML = row.subject;
      var subject = element.value;
      return "<a href=\"".concat(showPageUrl, "\" class=\"text-decoration-none\">").concat(subject, "</a>");
    },
    name: 'subject'
  }, {
    data: 'email',
    name: 'email'
  }, {
    data: function data(row) {
      return "<span class=\"badge badge-primary\" style=\"background-color: ".concat(row.ticket_status.pick_color, ";\">").concat(row.ticket_status.name, "</span>");
    },
    name: 'id'
  }, {
    data: function data(row) {
      var data = [{
        'id': row.id
      }];
      return prepareTemplateRender('#clientTicketActionTemplate', data);
    },
    name: 'id'
  }]
});
$(document).on('click', '.delete-client-ticket', function () {
  var deleteTicketID = $(this).attr('data-id');
  deleteItem(route('client.tickets.destroy', deleteTicketID), tableName, Lang.get('messages.task.ticket'));
});
/******/ })()
;