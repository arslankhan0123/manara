/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!****************************************************************!*\
  !*** ./resources/assets/js/email-templates/email-templates.js ***!
  \****************************************************************/


$(document).ready(function () {
  $('#filterTemplate,#filterDisabledTemplate').select2({
    width: '200px'
  });
});
var tableName = '#emailTemplatesTable';
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
  'order': [[0, 'asc']],
  ajax: {
    url: emailTemplateUrl,
    data: function data(_data) {
      _data.template_type = $('#filterTemplate').find('option:selected').val();
      _data.disabled = $('#filterDisabledTemplate').find('option:selected').val();
    }
  },
  columnDefs: [{
    'targets': [1],
    'orderable': false,
    'className': 'text-center',
    'width': '5%'
  }, {
    targets: '_all',
    defaultContent: 'N/A'
  }],
  columns: [{
    data: function data(row) {
      var editLink = emailTemplateUrl + row.id + '/edit';
      return '<a href="' + editLink + '">' + row.template_name + '</a>';
    },
    name: 'template_name'
  }, {
    data: function data(row) {
      var checked = row.disabled === 0 ? '' : 'checked';
      var data = [{
        'id': row.id,
        'checked': checked
      }];
      return prepareTemplateRender('#enableTemplate', data);
    },
    name: 'subject'
  }],
  'fnInitComplete': function fnInitComplete() {
    $(document).on('change', '#filterDisabledTemplate,#filterTemplate', function () {
      $(tableName).DataTable().ajax.reload(null, true);
    });
  }
}); // Template enable disable change event

$(document).on('change', '.isEnable', function (event) {
  var templateId = $(event.currentTarget).data('id');
  activeDeActiveTemplate(templateId);
}); // enable disable Template

window.activeDeActiveTemplate = function (id) {
  $.ajax({
    url: emailTemplateUrl + id + '/enable-disable',
    method: 'post',
    cache: false,
    success: function success(result) {
      if (result.success) {
        $(tableName).DataTable().ajax.reload(null, false);
      }
    }
  });
};
/******/ })()
;