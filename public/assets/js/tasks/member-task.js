/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**************************************************!*\
  !*** ./resources/assets/js/tasks/member-task.js ***!
  \**************************************************/


$(document).ready(function () {
  $('#filter_status').select2({
    width: '150px'
  });
});
var tableName = '#member-tasksTbl';
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
  'order': [[2, 'desc']],
  ajax: {
    url: route('tasks.index'),
    beforeSend: function beforeSend() {
      startLoader();
    },
    data: function data(_data) {
      _data.owner_id = null;
      _data.member_id = member_id;
      _data.status = $('#filter_status').find('option:selected').val();
    },
    complete: function complete() {
      stopLoader();
    }
  },
  columnDefs: [{
    'targets': [1, 2, 3, 5],
    'width': '14%'
  }, {
    'targets': [4],
    'width': '8%',
    'orderable': false,
    'class': 'text-center'
  }, {
    targets: '_all',
    defaultContent: 'N/A'
  }],
  columns: [{
    data: function data(row) {
      var showLink = taskUrl + row.id;
      return '<a class="font-weight-bold anchor-underline" href="' + showLink + '">' + row.subject + '</a>';
    },
    name: 'subject'
  }, {
    data: function data(row) {
      return priorities[row.priority];
    },
    name: 'priority'
  }, {
    data: function data(row) {
      return moment(row.start_date, 'YYYY-MM-DD hh:mm:ss').format('Do MMM, Y HH:mm A');
    },
    name: 'start_date'
  }, {
    data: function data(row) {
      if (row.due_date != null) {
        return moment(row.due_date, 'YYYY-MM-DD hh:mm:ss').format('Do MMM, Y HH:mm A');
      }
    },
    name: 'due_date'
  }, {
    data: function data(row) {
      if (row.member_id !== null) {
        return '<a href="' + memberUrl + row.member_id + '"><img src="' + row.user.image_url + '" class="thumbnail-rounded" data-toggle="tooltip" title="' + row.user.full_name + '"></a>';
      }

      return 'N/A';
    },
    name: 'member_id'
  }, {
    data: function data(row) {
      var status = row.status;
      var taskStatus = {
        '1': 'Not Started',
        '2': 'In Progress',
        '3': 'Testing',
        '4': 'Awaiting Feedback',
        '5': 'Completed'
      };
      var badgeColor = {
        '1': 'danger',
        '2': 'primary',
        '3': 'warning',
        '4': 'info',
        '5': 'success'
      };
      return '<span class="badge badge-' + badgeColor[status] + '">' + taskStatus[status] + '</span>';
    },
    name: 'status'
  }],
  'fnInitComplete': function fnInitComplete() {
    $(document).on('change', '#filter_status', function () {
      $(tableName).DataTable().ajax.reload(null, true);
    });
  }
});
$(tableName).on('draw.dt', function () {
  $('.tooltip').tooltip('hide');
  setTimeout(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
});
/******/ })()
;