/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!****************************************************!*\
  !*** ./resources/assets/js/calenders/calenders.js ***!
  \****************************************************/


$(document).ready(function () {
  $.ajax({
    url: 'calendar-list',
    type: 'GET',
    dataType: 'json',
    beforeSend: function beforeSend() {
      $('.loader-div').fadeIn();
    },
    success: function success(obj) {
      $('#calendar').fullCalendar({
        themeSystem: 'bootstrap4',
        height: 750,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month'
        },
        buttonText: {
          today: Lang.get('messages.range.today'),
          month: Lang.get('messages.range.month'),
          week: Lang.get('messages.range.week'),
          day: Lang.get('messages.range.day')
        },
        defaultDate: new Date(),
        defaultView: 'month',
        editable: false,
        events: obj.data,
        timeFormat: 'h:mm A',
        eventAfterAllRender: function eventAfterAllRender(view) {
          /* used this vs viewRender */
          setTimeout(function () {
            $('#calendar button.fc-today-button').removeClass('disabled').prop('disabled', false);
          }, 100);
        },
        eventClick: function eventClick(event) {
          showAnnouncementDetails(event.id);
        }
      });
    },
    complete: function complete() {
      $('.loader-div').fadeOut();
    }
  });

  window.showAnnouncementDetails = function (announcementId) {
    $.ajax({
      url: route('announcement.details', announcementId),
      type: 'GET',
      beforeSend: function beforeSend() {
        startLoader();
      },
      success: function success(data) {
        $('#announcementSubject').text(addNewlines(data.data.subject, 30));
        $('#announcementShowToClients').text(data.data.show_to_clients ? 'Yes' : 'No');
        $('#announcementDate').text(moment(data.data.date, 'YYYY-MM-DD hh:mm:ss').format('Do MMM, YYYY HH:mm A'));
        var element = document.createElement('textarea');
        element.innerHTML = data.data.message;
        var descriptionData = element.value;
        $('#announcementDescription').text('').append(addNewlines(descriptionData ? descriptionData : 'N/A', 30));
        $('#announcementDetailModal').modal('show');
      },
      complete: function complete() {
        stopLoader();
      }
    });
  };
});
/******/ })()
;