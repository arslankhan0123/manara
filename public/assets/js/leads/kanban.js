/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*********************************************!*\
  !*** ./resources/assets/js/leads/kanban.js ***!
  \*********************************************/


var containers = [];
var boardCount = document.getElementsByClassName('board').length;

for (var i = 0; i < boardCount; i++) {
  containers.push(document.querySelector('.board-' + i));
}

var id;
var drake = dragula({
  containers: containers,
  revertOnSpill: true,
  direction: 'vertical'
}).on('drag', function (el) {
  el.className = el.className.replace('ex-moved', '');
}).on('drop', function (el, container) {
  var board = $(container);
  el.className += ' ex-moved';
  id = $('.ex-moved').data('id');
  var boardStatus = $(container).data('board-status');
  board.parent().find('.infy-loader').fadeIn();
  $.ajax({
    url: leadUrl + '/' + id + '/status/' + boardStatus,
    type: 'PUT',
    cache: false,
    success: function success(result) {
      if (result.success) {
        displaySuccessMessage(result.message);
      }
    },
    complete: function complete() {
      board.parent().find('.infy-loader').fadeOut();
    }
  });
}).on('over', function (el, container) {
  container.className += ' ex-over';
}).on('out', function (el, container) {
  container.className = container.className.replace('ex-over', '');
});
$(document).ready(function () {
  var containers = [document.querySelector('.flex-nowrap')];
  $('.board').each(function (index, ele) {
    containers.push(document.querySelector('.board-' + index));
  });
  var scroll = autoScroll(containers, {
    margin: 200,
    autoScroll: function autoScroll() {
      return this.down && drake.dragging;
    }
  });
});
/******/ })()
;