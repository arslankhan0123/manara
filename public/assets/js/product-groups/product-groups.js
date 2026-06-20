/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**************************************************************!*\
  !*** ./resources/assets/js/product-groups/product-groups.js ***!
  \**************************************************************/


var tableName = $('#productGroupsTable');
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
    url: route('product-groups.index')
  },
  columnDefs: [{
    'targets': [3],
    'orderable': false,
    'className': 'text-center',
    'width': '8%'
  }, {
    'targets': [2],
    'orderable': true,
    'searchable': false,
    'className': 'text-center',
    'width': '8%'
  }, {
    'targets': [1],
    render: function render(data) {
      return data.length > 80 ? data.substr(0, 80) + '...' : data;
    }
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
      if (row.description != null) {
        var element = document.createElement('textarea');
        element.innerHTML = row.description;
        return element.value;
      } else return 'N/A';
    },
    name: 'description'
  }, {
    data: 'products_count',
    name: 'products_count'
  }, {
    data: function data(row) {
      var data = [{
        'id': row.id
      }];
      return prepareTemplateRender('#productGroupActionTemplate', data);
    },
    name: 'id'
  }]
});
$(document).on('submit', '#addNewForm', function (e) {
  e.preventDefault();
  processingBtn('#addNewForm', '#btnSave', 'loading');
  var description = $('<div />').html($('#createDescription').summernote('code'));
  var empty = description.text().trim().replace(/ \r\n\t/g, '') === '';

  if ($('#createDescription').summernote('isEmpty')) {
    $('#createDescription').val('');
  } else if (empty) {
    displayErrorMessage('Description field is not contain only white space');
    processingBtn('#addNewForm', '#btnSave', 'reset');
    return false;
  }

  $.ajax({
    url: route('product-groups.index'),
    type: 'POST',
    data: $(this).serialize(),
    success: function success(result) {
      if (result.success) {
        displaySuccessMessage(result.message);
        $('#addModal').modal('hide');
        tableName.DataTable().ajax.reload(null, false);
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
  var productGroupId = $(event.currentTarget).data('id');
  renderData(productGroupId);
});

window.renderData = function (id) {
  $.ajax({
    url: route('product-groups.edit', id),
    type: 'GET',
    success: function success(result) {
      if (result.success) {
        $('#productGroupId').val(result.data.id);
        var element = document.createElement('textarea');
        element.innerHTML = result.data.name;
        $('#editName').val(element.value);
        $('#editDescription').summernote('code', result.data.description);
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
  var id = $('#productGroupId').val();
  var $editDescription = $('<div />').html($('#editDescription').summernote('code'));
  var empty = $editDescription.text().trim().replace(/ \r\n\t/g, '') === '';

  if ($('#editDescription').summernote('isEmpty')) {
    $('#editDescription').val('');
  } else if (empty) {
    displayErrorMessage('Description field is not contain only white space');
    processingBtn('#editForm', '#btnEditSave', 'reset');
    return false;
  }

  $.ajax({
    url: route('product-groups.update', id),
    type: 'put',
    data: $(this).serialize(),
    success: function success(result) {
      if (result.success) {
        displaySuccessMessage(result.message);
        $('#editModal').modal('hide');
        tableName.DataTable().ajax.reload(null, false);
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
  var productGroupId = $(event.currentTarget).data('id');
  deleteItem(route('product-groups.destroy', productGroupId), '#productGroupsTable', Lang.get('messages.common.product_group'));
});
$('#addModal').on('show.bs.modal', function () {
  $('.note-toolbar-wrapper').removeAttr('style');
  $('.note-toolbar').removeAttr('style');
});
$('#editModal').on('show.bs.modal', function () {
  $('.note-toolbar-wrapper').removeAttr('style');
  $('.note-toolbar').removeAttr('style');
});
$('#addModal').on('hidden.bs.modal', function () {
  resetModalForm('#addNewForm', '#validationErrorsBox');
  $('#createDescription').summernote('code', '');
});
$('#editModal').on('hidden.bs.modal', function () {
  resetModalForm('#editForm', '#editValidationErrorsBox');
});
/******/ })()
;