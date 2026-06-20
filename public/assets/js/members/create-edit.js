/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!****************************************************!*\
  !*** ./resources/assets/js/members/create-edit.js ***!
  \****************************************************/


$(document).ready(function () {
  $('#languageId').select2({
    width: '100%'
  });
  $('.price-input').trigger('input');
  $(document).on('click', '.password-show', function () {
    var $pwd = $('#password');

    if ($pwd.attr('type') === 'password') {
      $pwd.attr('type', 'text');
      $('#show_hide_password i').removeClass('fa-eye-slash');
      $('#show_hide_password i').addClass('fa-eye');
    } else {
      $pwd.attr('type', 'password');
      $('#show_hide_password i').addClass('fa-eye-slash');
      $('#show_hide_password i').removeClass('fa-eye');
    }
  });
  $(document).on('click', '.cPassword-show', function () {
    var $pwd = $('#cPassword');

    if ($pwd.attr('type') === 'password') {
      $pwd.attr('type', 'text');
      $('#show_hide_cPassword i').removeClass('fa-eye-slash');
      $('#show_hide_cPassword i').addClass('fa-eye');
    } else {
      $pwd.attr('type', 'password');
      $('#show_hide_cPassword i').addClass('fa-eye-slash');
      $('#show_hide_cPassword i').removeClass('fa-eye');
    }
  });
  $(document).on('keyup', '#facebookUrl', function () {
    this.value = this.value.toLowerCase();
  });
  $(document).on('keyup', '#linkedInUrl', function () {
    this.value = this.value.toLowerCase();
  });
  $(document).on('keyup', '#skypeUrl', function () {
    this.value = this.value.toLowerCase();
  });
  $(document).on('submit', '#createMember, #editMember', function () {
    var facebookUrl = $('#facebookUrl').val();
    var linkedInUrl = $('#linkedInUrl').val();
    var skypeUrl = $('#skypeUrl').val();
    var facebookExp = new RegExp(/^(https?:\/\/)?((m{1}\.)?)?((w{2,3}\.)?)facebook.[a-z]{2,3}\/?.*/i);
    var linkedInExp = new RegExp(/^(https?:\/\/)?((w{2,3}\.)?)linkedin\.[a-z]{2,3}\/?.*/i);
    var skypeExp = new RegExp(/^(https?:\/\/)?((m{1}\.)?)?((w{2,3}\.)?)skype.[a-z]{2,3}\/?.*/i);
    var facebookCheck = facebookUrl == '' ? true : facebookUrl.match(facebookExp) ? true : false;

    if (!facebookCheck) {
      displayErrorMessage('Please enter a valid Facebook Url');
      return false;
    }

    var linkedInCheck = linkedInUrl == '' ? true : linkedInUrl.match(linkedInExp) ? true : false;

    if (!linkedInCheck) {
      displayErrorMessage('Please enter a valid Linkedin Url');
      return false;
    }

    var skypeCheck = skypeUrl == '' ? true : skypeUrl.match(skypeExp) ? true : false;

    if (!skypeCheck) {
      displayErrorMessage('Please enter a valid Skype Url');
      return false;
    }

    if ($('#error-msg').text() !== '') {
      $('#phoneNumber').focus();
      return false;
    }

    var loadingButton = jQuery(this).find('#btnSave');
    loadingButton.button('loading');
  });
  $(document).on('change', '#logo', function () {
    var validFile = isValidFile($(this), '#validationErrorsBox');

    if (validFile) {
      displayPhoto(this, '#logoPreview');
      $('#btnSave').prop('disabled', false);
    } else {
      $('#btnSave').prop('disabled', true);
    }
  });
});
/******/ })()
;