/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*****************************************************!*\
  !*** ./resources/assets/js/articles/create-edit.js ***!
  \*****************************************************/


var articleGroupCreateUrl = route('article-groups.store');
$(document).ready(function () {
  $('#groupId').select2({
    width: 'calc(100% - 44px)',
    placeholder: Lang.get('messages.placeholder.select_group')
  });
});
$(document).on('submit', '#createArticle, #editArticle', function () {
  var loadingButton = jQuery(this).find('#btnSave');
  loadingButton.button('loading');
  var description = $('<div />').html($('#articleDescription').summernote('code'));
  var empty = description.text().trim().replace(/ \r\n\t/g, '') === '';

  if ($('#articleDescription').summernote('isEmpty')) {
    $('#articleDescription').val('');
  } else if (empty) {
    displayErrorMessage('Description field is not contain only white space');

    var _loadingButton = jQuery(this).find('#btnSave');

    _loadingButton.button('reset');

    return false;
  }

  $('#btnSave').prop('disabled', true);
});
$(document).on('change', '#attachment', function () {
  var validFile = isValidFile($(this), '#validationErrorBox');

  if (!validFile) {
    return false;
  }
});
$(document).on('submit', '#addArticleGroupForm', function (e) {
  e.preventDefault();
  processingBtn('#addArticleGroupForm', '#btnSave', 'loading');
  $.ajax({
    url: articleGroupCreateUrl,
    type: 'POST',
    data: $(this).serialize(),
    success: function success(result) {
      if (result.success) {
        displaySuccessMessage(result.message);
        $('#addArticleGroupModal').modal('hide');
        var data = {
          id: result.data.id,
          name: result.data.group_name
        };
        var newOption = new Option(data.name, data.id, false, true);
        $('#groupId').append(newOption).trigger('change');
      }
    },
    error: function error(result) {
      displayErrorMessage(result.responseJSON.message);
    },
    complete: function complete() {
      processingBtn('#addArticleGroupForm', '#btnSave');
    }
  });
});
$('#addArticleGroupModal').on('hidden.bs.modal', function () {
  resetModalForm('#addArticleGroupForm', '#validationErrorsBox');
});
/******/ })()
;