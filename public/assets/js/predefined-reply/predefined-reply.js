/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!******************************************************************!*\
  !*** ./resources/assets/js/predefined-reply/predefined-reply.js ***!
  \******************************************************************/


$(document).on('click', '.addPredefinedReplyModal', function () {
  $('#addModal').appendTo('body').modal('show');
});
$(document).on('submit', '#addNewForm', function (e) {
  e.preventDefault();
  processingBtn('#addNewForm', '#btnSave', 'loading');
  var createBody = $('<div />').html($('#createBody').summernote('code'));
  var empty = createBody.text().trim().replace(/ \r\n\t/g, '') === '';

  if ($('#createBody').summernote('isEmpty')) {
    $('#createBody').val('');
  } else if (empty) {
    displayErrorMessage('Body field is not contain only white space');
    processingBtn('#addNewForm', '#btnSave', 'reset');
    return false;
  }

  $.ajax({
    url: route('predefinedReplies.store'),
    type: 'POST',
    data: $(this).serialize(),
    success: function success(result) {
      if (result.success) {
        displaySuccessMessage(result.message);
        $('#addModal').modal('hide');
        window.livewire.emit('refresh');
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
  var predefinedReplyId = $(event.currentTarget).data('id');
  renderData(predefinedReplyId);
});

window.renderData = function (id) {
  $.ajax({
    url: route('predefinedReplies.edit', id),
    type: 'GET',
    success: function success(result) {
      if (result.success) {
        $('#predefinedReplyId').val(result.data.id);
        var element = document.createElement('textarea');
        element.innerHTML = result.data.reply_name;
        $('#editReplyName').val(element.value);
        $('#editBody').summernote('code', result.data.body);
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
  var id = $('#predefinedReplyId').val();
  var editBody = $('<div />').html($('#editBody').summernote('code'));
  var empty = editBody.text().trim().replace(/ \r\n\t/g, '') === '';

  if ($('#editBody').summernote('isEmpty')) {
    $('#editBody').val('');
  } else if (empty) {
    displayErrorMessage('Body field is not contain only white space');
    processingBtn('#editForm', '#btnEditSave', 'reset');
    return false;
  }

  $.ajax({
    url: route('predefinedReplies.update', id),
    type: 'put',
    data: $(this).serialize(),
    success: function success(result) {
      if (result.success) {
        displaySuccessMessage(result.message);
        $('#editModal').modal('hide');
        window.livewire.emit('refresh');
      }
    },
    error: function error(result) {
      displayErrorMessage(result.responseJSON.message);
    },
    complete: function complete() {
      processingBtn('#editForm', '#btnEditSave');
    }
  });
}); // Show predefined replay details on modal

$(document).on('click', '.show-btn', function (e) {
  var predefinedReplyId = $(e.currentTarget).attr('data-id');
  $.ajax({
    url: route('predefinedReplies.show', predefinedReplyId),
    type: 'GET',
    beforeSend: function beforeSend() {
      startLoader();
    },
    complete: function complete() {
      stopLoader();
    },
    success: function success(result) {
      if (result.success) {
        $('#showReplyName').html('');
        $('#showBody').html('');
        $('#showReplyName').append(result.data.reply_name);
        var element = document.createElement('textarea');
        element.innerHTML = result.data.body;
        var body = element.value;
        $('#showBody').append(body ? body : 'N/A');
        $('#showModal').appendTo('body').modal('show');
      }
    },
    error: function error(result) {
      displayErrorMessage(result.responseJSON.message);
    }
  });
});
$(document).on('click', '.delete-btn', function (event) {
  var predefinedReplyId = $(event.currentTarget).data('id');
  deleteItemLivewire('deletePredefinedReply', predefinedReplyId, Lang.get('messages.common.predefined_reply'));
});
window.addEventListener('deleted', function (data) {
  livewireDeleteEventListener(data, Lang.get('messages.common.predefined_reply'));
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
  $('#createBody').summernote('code', '');
});
$('#editModal').on('hidden.bs.modal', function () {
  resetModalForm('#editForm', '#editValidationErrorsBox');
});
/******/ })()
;