/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!****************************************************!*\
  !*** ./resources/assets/js/tickets/create-edit.js ***!
  \****************************************************/


$(document).ready(function () {
  $(document).on('submit', '#createTicket, #editTicket', function () {
    var loadingButton = jQuery(this).find('#btnSave');
    loadingButton.button('loading');

    if ($('#error-msg').text() !== '') {
      return false;
    }

    var description = $('<div />').html($('#ticketBody').summernote('code'));
    var empty = description.text().trim().replace(/ \r\n\t/g, '') === '';

    if ($('#ticketBody').summernote('isEmpty')) {
      $('#ticketBody').val('');
    } else if (empty) {
      displayErrorMessage('Description field is not contain only white space');

      var _loadingButton = jQuery(this).find('#btnSave');

      _loadingButton.button('reset');

      return false;
    }
  });
  $('#tagId').select2({
    width: 'calc(100% - 44px)',
    placeholder: Lang.get('messages.placeholder.select_tags')
  });
  $('#priorityId').select2({
    width: 'calc(100% - 44px)'
  });
  $('#serviceId').select2({
    width: 'calc(100% - 44px)'
  });
  $('#departmentId').select2({
    width: 'calc(100% - 44px)'
  });
  $('#predefinedReplyId').select2({
    width: 'calc(100% - 44px)'
  });
  $('#contactId,#assignToId').select2({
    width: '100%'
  });
  $('#ticketStatusId').select2({
    width: 'calc(100% - 44px)',
    placeholder: Lang.get('messages.placeholder.select_status')
  });
  $('.ticketBody').summernote({
    dialogsInBody: true,
    minHeight: 150,
    toolbar: [['style', ['bold', 'italic', 'underline', 'clear']], ['font', ['strikethrough']], ['para', ['paragraph']]]
  });
  $(document).on('click', '#ticketContactBtn', function () {
    if ($('#contactCol').hasClass('d-none')) {
      $('#ticketContact').text(Lang.get('messages.ticket.ticket_without_contact'));
      $('#ticketContactIcon').attr('class', 'fas fa-envelope');
      $('#contactCol').removeClass('d-none');
      $('#nameCol').addClass('d-none');
    } else {
      $('#ticketContact').text(Lang.get('messages.ticket.ticket_to_contact'));
      $('#ticketContactIcon').attr('class', 'fas fa-user');
      $('#contactCol').addClass('d-none');
      $('#nameCol').removeClass('d-none');
    }
  });
  $(document).on('change', '#predefinedReplyId', function () {
    var predefinedReplyId = $(this).val();

    if (predefinedReplyId !== '') {
      $.ajax({
        url: route('ticket.reply.body', predefinedReplyId),
        type: 'GET',
        success: function success(result) {
          $('.ticketBody').summernote('code', result);
        }
      });
    } else $('.ticketBody').summernote('code', '');
  });
  $(document).on('mouseenter', '.ticket-attachment', function () {
    $(this).find('.attachment-delete').removeClass('d-none');
  });
  $(document).on('mouseleave', '.ticket-attachment', function () {
    $(this).find('.attachment-delete').addClass('d-none');
  });
  $(document).on('click', '.attachment-delete', function (event) {
    var ticketAttachmentId = $(event.currentTarget).data('id');
    swal({
      title: Lang.get('messages.common.delete') + '!',
      text: Lang.get('messages.common.delete_attachment'),
      type: 'warning',
      showCancelButton: true,
      closeOnConfirm: false,
      showLoaderOnConfirm: true,
      confirmButtonColor: '#6777ef',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes'
    }, function () {
      $.ajax({
        url: ticketAttachmentUrl,
        type: 'DELETE',
        dataType: 'json',
        data: {
          mediaId: ticketAttachmentId
        },
        success: function success(obj) {
          if (obj.success) {
            window.location.reload();
          }

          swal({
            title: Lang.get('messages.common.deleted'),
            text: Lang.get('messages.common.attachment_deleted'),
            type: 'success',
            confirmButtonColor: '#6777ef',
            timer: 2000
          });
        },
        error: function error(data) {
          swal({
            title: '',
            text: data.responseJSON.message,
            type: 'error',
            confirmButtonColor: '#6777ef',
            timer: 5000
          });
        }
      });
    });
  });
  document.querySelector('#attachment').addEventListener('change', handleFileSelect, false);
  var selDiv = document.querySelector('#attachmentFileSection');

  function handleFileSelect(e) {
    if (!e.target.files || !window.FileReader) return;
    selDiv.innerHTML = '';
    var files = e.target.files;

    var _loop = function _loop(i) {
      var f = files[i];
      var reader = new FileReader();

      reader.onload = function (e) {
        if (f.type.match('image*')) {
          var html = '<img class=\'img-thumbnail thumbnail-preview ticket-attachment\' src="' + e.target.result + '">';
          selDiv.innerHTML += html;
        } else if (f.type.match('pdf*')) {
          var _html = '<img class=\'img-thumbnail thumbnail-preview ticket-attachment\' src="/assets/img/pdf_icon.png">';
          selDiv.innerHTML += _html;
        } else if (f.type.match('zip*')) {
          var _html2 = '<img class=\'img-thumbnail thumbnail-preview ticket-attachment\' src="/assets/img/zip_icon.png">';
          selDiv.innerHTML += _html2;
        } else if (f.type.match('sheet*')) {
          var _html3 = '<img class=\'img-thumbnail thumbnail-preview ticket-attachment\' src="/assets/img/xlsx_icon.png">';
          selDiv.innerHTML += _html3;
        } else if (f.type.match('text*')) {
          var _html4 = '<img class=\'img-thumbnail thumbnail-preview ticket-attachment\' src="/assets/img/txt_icon.png">';
          selDiv.innerHTML += _html4;
        } else if (f.type.match('msword*')) {
          var _html5 = '<img class=\'img-thumbnail thumbnail-preview ticket-attachment\' src="/assets/img/doc_icon.png">';
          selDiv.innerHTML += _html5;
        } else {
          selDiv.innerHTML += f.name;
        }
      };

      reader.readAsDataURL(f);
    };

    for (var i = 0; i < files.length; i++) {
      _loop(i);
    }
  }

  $(document).on('mouseenter', '.ticket-attachment', function () {
    $(this).find('.ticket-attachment__icon').removeClass('d-none');
  });
  $(document).on('mouseleave', '.ticket-attachment', function () {
    $(this).find('.ticket-attachment__icon').addClass('d-none');
  });
});
$(document).on('submit', '#addTicketPriorityForm', function (e) {
  e.preventDefault();
  processingBtn('#addTicketPriorityForm', '#btnSave', 'loading');
  $.ajax({
    url: route('ticketPriorities.store'),
    type: 'POST',
    data: $(this).serialize(),
    success: function success(result) {
      if (result.success) {
        displaySuccessMessage(result.message);
        $('#addTicketPriorityModal').modal('hide');
        var data = {
          id: result.data.id,
          name: result.data.name
        };
        var newOption = new Option(data.name, data.id, false, true);
        $('#priorityId').append(newOption).trigger('change');
      }
    },
    error: function error(result) {
      displayErrorMessage(result.responseJSON.message);
    },
    complete: function complete() {
      processingBtn('#addTicketPriorityForm', '#btnSave');
    }
  });
});
$('#addTicketPriorityModal').on('hidden.bs.modal', function () {
  resetModalForm('#addTicketPriorityForm', '#validationErrorsBox');
});
$(document).on('submit', '#addNewDepartmentForm', function (e) {
  e.preventDefault();
  processingBtn('#addNewDepartmentForm', '#btnSave', 'loading');
  $.ajax({
    url: route('departments.store'),
    type: 'POST',
    data: $(this).serialize(),
    success: function success(result) {
      if (result.success) {
        displaySuccessMessage(result.message);
        $('#addDepartmentModal').modal('hide');
        var data = {
          id: result.data.id,
          name: result.data.name
        };
        var newOption = new Option(data.name, data.id, false, true);
        $('#departmentId').append(newOption).trigger('change');
      }
    },
    error: function error(result) {
      displayErrorMessage(result.responseJSON.message);
    },
    complete: function complete() {
      processingBtn('#addNewDepartmentForm', '#btnSave');
    }
  });
});
$('#addDepartmentModal').on('hidden.bs.modal', function () {
  resetModalForm('#addNewDepartmentForm', '#validationErrorsBox');
});
$(document).on('submit', '#addNewForm', function (e) {
  e.preventDefault();
  processingBtn('#addNewForm', '#btnSave', 'loading');
  $.ajax({
    url: route('services.store'),
    type: 'POST',
    data: $(this).serialize(),
    success: function success(result) {
      if (result.success) {
        displaySuccessMessage(result.message);
        $('#addModal').modal('hide');
        var data = {
          id: result.data.id,
          name: result.data.name
        };
        var newOption = new Option(data.name, data.id, false, true);
        $('#serviceId').append(newOption).trigger('change');
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
$('#addModal').on('hidden.bs.modal', function () {
  resetModalForm('#addNewForm', '#validationErrorsBox');
});
$(document).on('submit', '#addTicketPredefinedForm', function (e) {
  e.preventDefault();
  processingBtn('#addTicketPredefinedForm', '#btnSave', 'loading');
  $.ajax({
    url: route('predefinedReplies.store'),
    type: 'POST',
    data: $(this).serialize(),
    success: function success(result) {
      if (result.success) {
        displaySuccessMessage(result.message);
        $('#addTicketPredefinedModal').modal('hide');
        var data = {
          id: result.data.id,
          name: result.data.reply_name
        };
        var newOption = new Option(data.name, data.id, false, true);
        $('#predefinedReplyId').append(newOption).trigger('change');
      }
    },
    error: function error(result) {
      displayErrorMessage(result.responseJSON.message);
    },
    complete: function complete() {
      processingBtn('#addTicketPredefinedForm', '#btnSave');
    }
  });
});
$('#addTicketPredefinedModal').on('hidden.bs.modal', function () {
  resetModalForm('#addTicketPredefinedForm', '#validationErrorsBox');
});
$(document).on('submit', '#addTicketStatusForm', function (e) {
  e.preventDefault();
  processingBtn('#addTicketStatusForm', '#btnSave', 'loading');
  $.ajax({
    url: route('ticket.status.store'),
    type: 'POST',
    data: $(this).serialize(),
    success: function success(result) {
      if (result.success) {
        displaySuccessMessage(result.message);
        $('#addTicketStatusModal').modal('hide');
        var data = {
          id: result.data.id,
          name: result.data.name
        };
        var newOption = new Option(data.name, data.id, false, true);
        $('#ticketStatusId').append(newOption).trigger('change');
      }
    },
    error: function error(result) {
      displayErrorMessage(result.responseJSON.message);
    },
    complete: function complete() {
      processingBtn('#addTicketStatusForm', '#btnSave');
    }
  });
});
$('#addTicketStatusModal').on('hidden.bs.modal', function () {
  resetModalForm('#addTicketStatusForm', '#validationErrorBox');
});
/******/ })()
;