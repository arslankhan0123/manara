/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!************************************************************!*\
  !*** ./resources/assets/js/email-templates/create-edit.js ***!
  \************************************************************/


$(document).ready(function () {
  if (!!document.createRange) {
    document.getSelection().removeAllRanges();
  }

  $('#emailMessage').summernote({
    dialogsInBody: true,
    minHeight: 150,
    toolbar: [['style', ['bold', 'italic', 'underline', 'clear']], ['font', ['strikethrough', 'superscript', 'subscript']], ['para', ['ul', 'ol', 'paragraph']], ['fontname', ['fontname']], ['fontsize', ['fontsize']], ['color', ['color']], ['table', ['table']], ['misc', ['undo', 'redo']], ['height', ['height']], ['insert', ['link', 'picture', 'video']], ['view', ['codeview', 'help']]],
    spellCheck: true
  });
  $(document).on('click', '.fieldText', function (e) {
    var selection = document.getSelection();
    var cursorPos = selection.anchorOffset;
    var oldContent = selection.anchorNode.nodeValue;
    var toInsert = $(this).text();
    var newContent = oldContent.substring(0, cursorPos) + toInsert + oldContent.substring(cursorPos);
    selection.anchorNode.nodeValue = newContent;
    var html = $('#emailMessage').summernote('code');
    $('#emailMessage').summernote('code', html);
  });
});
/******/ })()
;