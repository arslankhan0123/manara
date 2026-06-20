/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!***********************************************************!*\
  !*** ./resources/assets/js/activity-logs/activity-log.js ***!
  \***********************************************************/


var _ranges;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var activityLogsUrl = route('activity.logs.index');
var changeCreatedAtUrl = route('change.filter');
$(document).ready(function () {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  var count = 1;
  $(window).scroll(function () {
    if ($(window).scrollTop() === $(document).height() - $(window).height()) {
      loadArticle(count);
      count++;
    }
  });
  var dataCount = false;

  function loadArticle(count) {
    if (!dataCount) {
      $('.load-more-logs').show();
      $.ajax({
        url: activityLogsUrl + '?page=' + count,
        type: 'get',
        success: function success(result) {
          if (result.success) {
            var activityLogs = '';
            var index;

            if (result.data.data.length > 0) {
              dataCount = false;

              for (index = 1; index < result.data.data.length; ++index) {
                var data = [{
                  'created_at': humanReadableFormatDate(result.data.data[index].created_at),
                  'subject_type': activityLogIconJS(result.data.data[index].subject_type),
                  'created_by': result.data.data[index].created_by.full_name,
                  'description': result.data.data[index].description
                }];
                var activityLogDiv = prepareTemplateRender('#activityLogsTemplate', data);
                activityLogs += activityLogDiv;
              }
            } else {
              dataCount = true;
              $('.load-more-logs').hide();
              $('.no-found-more-logs').html('No more records found');
            }

            $('.activities').append(activityLogs);
          }
        },
        error: function error(result) {
          manageAjaxErrors(result);
        }
      });
    }
  }

  function humanReadableFormatDate(date) {
    return moment(date).fromNow();
  }

  function activityLogIconJS(model) {
    var className = model.substring(11);

    if (className === 'CustomerGroup') {
      return 'fas fa-people-arrows';
    } else if (className === 'Customer') {
      return 'fas fa-street-view';
    } else if (className === 'User') {
      return 'fas fa-user';
    } else if (className === 'ArticleGroup') {
      return 'fas fa-edit';
    } else if (className === 'Article') {
      return 'fab fa-autoprefixer';
    } else if (className === 'Tag') {
      return 'fas fa-tty';
    } else if (className === 'LeadStatus') {
      return 'fas fa-blender-phone';
    } else if (className === 'LeadSource') {
      return 'fas fa-globe';
    } else if (className === 'Lead') {
      return 'fas fa-file-invoice';
    } else if (className === 'Project') {
      return 'fas fa-layer-group';
    } else if (className === 'Task') {
      return 'fas fa-tasks';
    } else if (className === 'TicketPriority') {
      return 'fas fa-sticky-note';
    } else if (className === 'TicketStatus') {
      return 'fas fa-info-circle';
    } else if (className === 'PredefinedReply') {
      return 'fas fa-reply';
    } else if (className === 'Ticket') {
      return 'fas fa-ticket-alt';
    } else if (className === 'Invoice') {
      return 'fas fa-file-invoice';
    } else if (className === 'CreditNote') {
      return 'fas fa-clipboard';
    } else if (className === 'Proposal') {
      return 'fas fa-scroll';
    } else if (className === 'Estimate') {
      return 'fas fa-calculator';
    } else if (className === 'Payment') {
      return 'fas fa-money-check-alt';
    } else if (className === 'Department') {
      return 'fas fa-columns';
    } else if (className === 'ExpenseCategory') {
      return 'fas fa-list-ol';
    } else if (className === 'Expense') {
      return 'fab fa-erlang';
    } else if (className === 'PaymentMode') {
      return 'fab fa-product-hunt';
    } else if (className === 'TaxRate') {
      return 'fas fa-percent';
    } else if (className === 'Announcement') {
      return 'fas fa-bullhorn';
    } else if (className === 'Item') {
      return 'fas fa-sitemap';
    } else if (className === 'ItemGroup') {
      return 'fas fa-object-group';
    } else if (className === 'ContractType') {
      return 'fas fa-file-contract';
    } else if (className === 'Contract') {
      return 'fas fa-file-signature';
    } else if (className === 'Goal') {
      return 'fas fa-bullseye';
    } else if (className === 'Service') {
      return 'fab fa-stripe-s';
    } else if (className === 'Reminder') {
      return 'fas fa-bell';
    } else if (className === 'Note') {
      return 'fas fa-sticky-note';
    } else if (className === 'Comment') {
      return 'fas fa-comment';
    } else if (className === 'Contact') {
      return 'fas fa-user';
    }
  }
});
var timeRange = $('#time_range');
var today = moment();
var start = today.clone().startOf('month');
var end = today.clone().endOf('month');
var lastMonth = moment().startOf('month').subtract(1, 'days');
$(document).ready(function () {
  timeRange.val(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD')); // tbl.ajax.reload();
}); // Time Entries filter script

window.cb = function (start, end) {
  if (start._isValid && end._isValid) {
    timeRange.find('span').html(start.format('MMM D, YYYY') + ' - ' + end.format('MMM D, YYYY'));
  } else {
    timeRange.val('');
    timeRange.find('span').html('');
  }
}; // setting the date into the element


cb(start, end); // instantiate the plugin

timeRange.daterangepicker({
  startDate: start,
  endDate: end,
  opens: 'left',
  showDropdowns: true,
  autoUpdateInput: false,
  locale: {
    customRangeLabel: Lang.get('messages.common.custom'),
    applyLabel: Lang.get('messages.common.apply'),
    cancelLabel: Lang.get('messages.common.cancel'),
    fromLabel: Lang.get('messages.common.from'),
    toLabel: Lang.get('messages.common.to'),
    monthNames: [Lang.get('messages.months.jan'), Lang.get('messages.months.feb'), Lang.get('messages.months.mar'), Lang.get('messages.months.apr'), Lang.get('messages.months.may'), Lang.get('messages.months.jun'), Lang.get('messages.months.jul'), Lang.get('messages.months.aug'), Lang.get('messages.months.sep'), Lang.get('messages.months.oct'), Lang.get('messages.months.nov'), Lang.get('messages.months.dec')],
    daysOfWeek: [Lang.get('messages.weekdays.sun'), Lang.get('messages.weekdays.mon'), Lang.get('messages.weekdays.tue'), Lang.get('messages.weekdays.wed'), Lang.get('messages.weekdays.thu'), Lang.get('messages.weekdays.fri'), Lang.get('messages.weekdays.sat')]
  },
  ranges: (_ranges = {}, _defineProperty(_ranges, Lang.get('messages.range.today'), [moment(), moment()]), _defineProperty(_ranges, Lang.get('messages.range.this_week'), [moment().startOf('week'), moment().endOf('week')]), _defineProperty(_ranges, Lang.get('messages.range.last_week'), [moment().startOf('week').subtract(7, 'days'), moment().startOf('week').subtract(1, 'days')]), _defineProperty(_ranges, Lang.get('messages.range.this_month'), [start, end]), _defineProperty(_ranges, Lang.get('messages.range.last_month'), [lastMonth.clone().startOf('month'), lastMonth.clone().endOf('month')]), _ranges)
}, cb); // this will fire the daterangepicker plugin change when the date has been changed

timeRange.on('apply.daterangepicker', function (ev, picker) {
  if (picker.startDate._isValid && picker.endDate._isValid) {
    var startDate = picker.startDate.format('YYYY-MM-DD');
    var endDate = picker.endDate.format('YYYY-MM-DD');
    loadData(startDate, endDate); // window.location.reload();
  } else {
    $(this).val(''); // window.location.reload();
  }
});

function loadData(startDate, endDate) {
  $.ajax({
    url: changeCreatedAtUrl,
    type: 'post',
    data: {
      startDate: startDate,
      endDate: endDate
    },
    beforeSend: function beforeSend() {
      startLoader();
    },
    success: function success(result) {
      $('.activity-logs-data').html(result.html);
    },
    error: function error(result) {
      displayErrorMessage(result.responseJSON.message);
    },
    complete: function complete() {
      stopLoader();
    }
  });
}
/******/ })()
;