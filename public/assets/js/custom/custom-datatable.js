/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!********************************************************!*\
  !*** ./resources/assets/js/custom/custom-datatable.js ***!
  \********************************************************/


$.extend($.fn.dataTable.defaults, {
  'paging': true,
  'info': true,
  'ordering': true,
  'autoWidth': false,
  'pageLength': 10,
  'language': {
    'search': '',
    'sSearch': 'Search',
    'paginate': {
      'previous': '<i class="fas fa-angle-left"></i>',
      'next': '<i class="fas fa-angle-right"></i>'
    }
  },
  'preDrawCallback': function preDrawCallback() {
    customSearch();
  }
});

function customSearch() {
  $('.dataTables_filter input').addClass('form-control');
  $('.dataTables_filter input').attr('placeholder', Lang.get('messages.common.search'));
}

window.getCurrencySymbol = function ($key) {
  switch ($key) {
    case 0:
      return 'fas fa-rupee-sign';

    case 1:
    case 2:
    case 6:
      return 'fas fa-dollar-sign';

    case 3:
      return 'fas fa-euro-sign';

    case 4:
      return 'fas fa-yen-sign';

    case 5:
      return 'fas fa-pound-sign';

    default:
      return 'fas fa-dollar-sign';
  }
};
/******/ })()
;