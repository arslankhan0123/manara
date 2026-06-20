/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!****************************************************************!*\
  !*** ./resources/assets/js/ticket-statuses/ticket-statuses.js ***!
  \****************************************************************/


var tableName = '#ticketStatusTbl';
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
    url: route('ticket.status.index')
  },
  columnDefs: [{
    'targets': [3],
    'orderable': false,
    'className': 'text-center',
    'width': '6%'
  }, {
    'targets': [1],
    'width': '8%',
    'orderable': false
  }, {
    'targets': [2],
    'className': 'text-center',
    'width': '8%',
    'searchable': false
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
      var data = [{
        'color': row.pick_color,
        'ticketStyle': 'style'
      }];
      return prepareTemplateRender('#ticketStatusColorBox', data);
    },
    name: 'pick_color'
  }, {
    data: 'tickets_count',
    name: 'tickets_count'
  }, {
    data: function data(row) {
      var data = [{
        'id': row.id
      }];
      return prepareTemplateRender('#ticketStatusActionTemplate', data);
    },
    name: 'id'
  }]
});
var pickr = Pickr.create({
  el: '.color-wrapper',
  theme: 'nano',
  // or 'monolith', or 'nano'
  closeWithKey: 'Enter',
  autoReposition: true,
  defaultRepresentation: 'HEX',
  position: 'bottom-end',
  swatches: ['rgba(244, 67, 54, 1)', 'rgba(233, 30, 99, 1)', 'rgba(156, 39, 176, 1)', 'rgba(103, 58, 183, 1)', 'rgba(63, 81, 181, 1)', 'rgba(33, 150, 243, 1)', 'rgba(3, 169, 244, 1)', 'rgba(0, 188, 212, 1)', 'rgba(0, 150, 136, 1)', 'rgba(76, 175, 80, 1)', 'rgba(139, 195, 74, 1)', 'rgba(205, 220, 57, 1)', 'rgba(255, 235, 59, 1)', 'rgba(255, 193, 7, 1)'],
  components: {
    // Main components
    preview: true,
    hue: true,
    // Input / output Options
    interaction: {
      input: true,
      clear: false,
      save: false
    }
  }
});
var editPickr = Pickr.create({
  el: '.color-wrapper',
  theme: 'nano',
  // or 'monolith', or 'nano'
  closeWithKey: 'Enter',
  autoReposition: true,
  defaultRepresentation: 'HEX',
  position: 'bottom-end',
  swatches: ['rgba(244, 67, 54, 1)', 'rgba(233, 30, 99, 1)', 'rgba(156, 39, 176, 1)', 'rgba(103, 58, 183, 1)', 'rgba(63, 81, 181, 1)', 'rgba(33, 150, 243, 1)', 'rgba(3, 169, 244, 1)', 'rgba(0, 188, 212, 1)', 'rgba(0, 150, 136, 1)', 'rgba(76, 175, 80, 1)', 'rgba(139, 195, 74, 1)', 'rgba(205, 220, 57, 1)', 'rgba(255, 235, 59, 1)', 'rgba(255, 193, 7, 1)'],
  components: {
    // Main components
    preview: true,
    hue: true,
    // Input / output Options
    interaction: {
      input: true,
      clear: false,
      save: false
    }
  }
});
pickr.on('change', function () {
  var color = pickr.getColor().toHEXA().toString();

  if (wc_hex_is_light(color)) {
    $('#validationErrorColor').addClass('d-block').text('Pick a different color');
    $(':input[id="btnSave"]').prop('disabled', true);
    return;
  }

  $('#validationErrorColor').removeClass('d-block');
  $(':input[id="btnSave"]').prop('disabled', false);
  pickr.setColor(color);
  $('#color').val(color);
});
editPickr.on('change', function () {
  var editColor = editPickr.getColor().toHEXA().toString();

  if (wc_hex_is_light(editColor)) {
    $('#editValidationErrorColor').addClass('d-block').text('Pick a different color');
    $(':input[id="btnEditSave"]').prop('disabled', true);
    return;
  }

  $('#editValidationErrorColor').removeClass('d-block');
  $(':input[id="btnEditSave"]').prop('disabled', false);
  editPickr.setColor(editColor);
  $('#edit_color').val(editColor);
});

function wc_hex_is_light(color) {
  var hex = color.replace('#', '');
  var c_r = parseInt(hex.substr(0, 2), 16);
  var c_g = parseInt(hex.substr(2, 2), 16);
  var c_b = parseInt(hex.substr(4, 2), 16);
  var brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
  return brightness > 240;
}

var picked = false;
$(document).on('click', '#color', function () {
  picked = true;
});
$(document).on('click', '.addTicketStatusModal', function () {
  $('#addModal').appendTo('body').modal('show');
});
$(document).on('submit', '#addNewForm', function (e) {
  e.preventDefault();

  if ($('#color').val() == '') {
    displayErrorMessage('Please select your color.');
    return false;
  }

  processingBtn('#addNewForm', '#btnSave', 'loading');
  $.ajax({
    url: route('ticket.status.store'),
    type: 'POST',
    data: $(this).serialize(),
    success: function success(result) {
      if (result.success) {
        displaySuccessMessage(result.message);
        $('#addModal').modal('hide');
        $('#ticketStatusTbl').DataTable().ajax.reload(null, false);
      }
    },
    error: function error(result) {
      displayErrorMessage(result.responseJSON.message);
    },
    complete: function complete() {
      processingBtn('#addNewForm', '#btnSave');
    }
  });
});
$(document).on('click', '.edit-btn', function (event) {
  var ticketStatusId = $(event.currentTarget).data('id');
  renderData(ticketStatusId);
});

window.renderData = function (id) {
  $.ajax({
    url: route('ticket.status.edit', id),
    type: 'GET',
    success: function success(result) {
      if (result.success) {
        $('#ticketStatusId').val(result.data.id);
        var element = document.createElement('textarea');
        element.innerHTML = result.data.name;
        $('#editName').val(element.value);
        editPickr.setColor(result.data.pick_color);
        $('#editModal').appendTo('body').modal('show');
      }
    },
    error: function error(result) {
      displayErrorMessage(result.responseJSON.message);
    }
  });
};

$(document).on('submit', '#editForm', function (event) {
  event.preventDefault();
  processingBtn('#editForm', '#btnEditSave', 'loading');
  var id = $('#ticketStatusId').val();
  $.ajax({
    url: route('ticket.status.update', id),
    type: 'put',
    data: $(this).serialize(),
    success: function success(result) {
      if (result.success) {
        displaySuccessMessage(result.message);
        $('#editModal').modal('hide');
        $('#ticketStatusTbl').DataTable().ajax.reload(null, false);
      }
    },
    error: function error(result) {
      displayErrorMessage(result.responseJSON.message);
    },
    complete: function complete() {
      processingBtn('#editForm', '#btnEditSave');
    }
  });
});
$(document).on('click', '.delete-btn', function (event) {
  var ticketStatusId = $(event.currentTarget).data('id');
  deleteItem(route('ticket.status.destroy', ticketStatusId), '#ticketStatusTbl', Lang.get('messages.ticket_status.ticket_status'));
});
$('#addModal').on('show.bs.modal', function () {
  pickr.setColor('#3F51B5');
});
$('#addModal').on('hidden.bs.modal', function () {
  pickr.setColor('#000');
  resetModalForm('#addNewForm', '#validationErrorsBox');
  pickr.hide();
});
$('#editModal').on('hidden.bs.modal', function () {
  resetModalForm('#editForm', '#editValidationErrorsBox');
  editPickr.hide();
});
/******/ })()
;