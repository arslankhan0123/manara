/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!****************************************************************!*\
  !*** ./resources/assets/js/customer-groups/customer-groups.js ***!
  \****************************************************************/


var tbl = $('#customerGroupTable').DataTable({
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
  'order': [[0, 'asc']],
  ajax: {
    url: route('customer-groups.index')
  },
  columnDefs: [{
    'targets': [1],
    render: function render(data) {
      return data.length > 80 ? data.substr(0, 80) + '...' : data;
    }
  }, {
    'targets': [2],
    'className': 'text-center',
    'width': '8%',
    'searchable': false,
    'orderable': true
  }, {
    'targets': [3],
    'className': 'text-center',
    'width': '6%',
    'orderable': false
  }, {
    targets: '_all',
    defaultContent: 'N/A'
  }],
  columns: [{
    data: function data(row) {
      var element = document.createElement('textarea');
      element.innerHTML = row.name;
      return element.value;
    },
    name: 'name'
  }, {
    data: function data(row) {
      if (row.description != '') {
        var element = document.createElement('textarea');
        element.innerHTML = row.description;
        return element.value;
      } else return 'N/A';
    },
    name: 'description'
  }, {
    data: 'customers_count',
    name: 'customers_count'
  }, {
    data: function data(row) {
      var data = [{
        'id': row.id
      }];
      return prepareTemplateRender('#customerGroupActionTemplate', data);
    },
    name: 'id'
  }]
});
/******/ })()
;