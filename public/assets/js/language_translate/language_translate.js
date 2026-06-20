/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**********************************************************************!*\
  !*** ./resources/assets/js/language_translate/language_translate.js ***!
  \**********************************************************************/


$(document).ready(function () {
  $('.translateLanguage, #subFolderFiles').select2({
    placeholder: 'Select File'
  });
});
var lang = languageName;
var file = fileName;
$('.langName').keypress(function (e) {
  var regex = new RegExp(/^[a-zA-Z\s]+$/);
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);

  if (regex.test(str)) {
    return true;
  } else {
    e.preventDefault();
    return false;
  }
});
$(document).on('change', '.translateLanguage', function () {
  lang = $(this).val();

  if (lang == '') {
    window.location.href = url;
  } else {
    window.location.href = url + 'name=' + lang + '&file=' + file;
  }
});
$(document).on('change', '#subFolderFiles', function () {
  file = $(this).val();

  if (file == '') {
    location.href = url;
  } else {
    window.location.href = url + 'name=' + lang + '&file=' + file;
  }
});
/******/ })()
;