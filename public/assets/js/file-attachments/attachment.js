/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!************************************************************!*\
  !*** ./resources/assets/js/file-attachments/attachment.js ***!
  \************************************************************/


$(document).ready(function () {
  if (typeof isEdit !== 'undefined') {
    // changing the item stock attachment preview on edit item stock
    var previewSrc = $('#previewImage').attr('src');
    var ext = previewSrc.split('.').pop().toLowerCase();

    if (ext == 'pdf') {
      $('#previewImage').attr('src', pdfDocumentImageUrl);
    } else if (ext == 'docx' || ext == 'doc') {
      $('#previewImage').attr('src', docxDocumentImageUrl);
    }
  }
});
$(document).on('change', '#attachment', function () {
  var extension = isValidDocument($(this));

  if (!isEmpty(extension) && extension != false) {
    displayDocument(this, '#previewImage', extension);
  }
});

window.isValidDocument = function (inputSelector) {
  var ext = $(inputSelector).val().split('.').pop().toLowerCase();

  if ($.inArray(ext, ['png', 'jpg', 'jpeg', 'pdf', 'doc', 'docx']) == -1) {
    $(inputSelector).val('');
    displayErrorMessage('File type not allowed.');
    $('#previewImage').attr('src', blockedAttachmentUrl);
    return false;
  }

  return ext;
};

window.isEmpty = function (value) {
  return value === undefined || value === null || value === '';
};

window.displayDocument = function (input, selector, extension) {
  var displayPreview = true;

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      var image = new Image();

      if ($.inArray(extension, ['pdf', 'doc', 'docx']) == -1) {
        image.src = e.target.result;
      } else {
        if (extension == 'pdf') {
          image.src = pdfDocumentImageUrl;
        } else {
          image.src = docxDocumentImageUrl;
        }
      }

      image.onload = function () {
        $(selector).attr('src', image.src);
        displayPreview = true;
      };
    };

    if (displayPreview) {
      reader.readAsDataURL(input.files[0]);
      $(selector).show();
    }
  }
};
/******/ })()
;