/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!********************************************!*\
  !*** ./resources/assets/js/web/article.js ***!
  \********************************************/
 // Search Front Side Article 

$(document).on('keyup', '#searchArticle', function () {
  var searchData = $(this).val();

  if (searchData != '') {
    $.ajax({
      url: articleSearchUrl,
      type: 'GET',
      data: {
        searchData: searchData
      },
      success: function success(result) {
        $('#articles').html(result);
      },
      error: function error(result) {
        manageAjaxErrors(result.responseJSON.message);
      }
    });
  }
});
/******/ })()
;