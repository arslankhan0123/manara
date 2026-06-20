/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!************************************************************!*\
  !*** ./resources/assets/js/clients/tickets/create-edit.js ***!
  \************************************************************/


$(document).ready(function () {
  $('#tagId').select2({
    width: '100%',
    placeholder: Lang.get('messages.placeholder.select_tags')
  });
  $('#priorityId').select2({
    width: '100%'
  });
  $('#serviceId').select2({
    width: '100%'
  });
  $('#departmentId').select2({
    width: '100%'
  });
  $('#assignToId').select2({
    width: '100%'
  });
  $('#ticketStatusId').select2({
    width: '100%',
    placeholder: Lang.get('messages.placeholder.select_status')
  });
  $('.ticketBody').summernote({
    dialogsInBody: true,
    minHeight: 150,
    toolbar: [['style', ['bold', 'italic', 'underline', 'clear']], ['font', ['strikethrough']], ['para', ['paragraph']]]
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
$(document).on('submit', '#createTicket', function () {
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
/******/ })()
;