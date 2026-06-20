/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!****************************************************!*\
  !*** ./resources/assets/js/dashboard/dashboard.js ***!
  \****************************************************/


$(document).ready(function () {
  $('#monthId').select2({
    width: '130px'
  });

  window.loadContractList = function (data) {
    var isDestroy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (isDestroy) {
      $('#contractExpiredTable').DataTable().clear();
      $('#contractExpiredTable').DataTable().destroy();
    }

    $.each(data, function (key, value) {
      var data = [{
        'subject': value.subject,
        'customer': value.customer.company_name,
        'startDate': moment(value.start_date).locale(currentLocale).format('Do MMM, Y'),
        'endDate': moment(value.end_date).locale(currentLocale).format('Do MMM, Y')
      }];
      var expiredContractsHtml = prepareTemplateRender('#expiredContractsTemplate', data);
      $('.expiring-contracts').append(expiredContractsHtml);
    });

    if (isDestroy) {
      $('#contractExpiredTable').DataTable({
        oLanguage: {
          'sEmptyTable': Lang.get('messages.common.no_data_available_in_table'),
          'sInfo': Lang.get('messages.common.data_base_entries'),
          sLengthMenu: Lang.get('messages.common.menu_entry'),
          sInfoEmpty: Lang.get('messages.common.no_entry'),
          sInfoFiltered: Lang.get('messages.common.filter_by'),
          sZeroRecords: Lang.get('messages.common.no_matching')
        }
      });
    }
  };

  loadContractList(expiringContractLists);
  $('#contractExpiredTable').DataTable({
    oLanguage: {
      'sEmptyTable': Lang.get('messages.common.no_data_available_in_table'),
      'sInfo': Lang.get('messages.common.data_base_entries'),
      sLengthMenu: Lang.get('messages.common.menu_entry'),
      sInfoEmpty: Lang.get('messages.common.no_entry'),
      sInfoFiltered: Lang.get('messages.common.filter_by'),
      sZeroRecords: Lang.get('messages.common.no_matching')
    }
  }); // Lead Overview Chart JS 

  var leadStatusName = [];
  var leadStatusColor = [];
  var leadStatusCount = [];
  $.each(leadData, function (key, value) {
    var str = value.name;
    leadStatusName.push(str.replace('&amp;', '&'));
    leadStatusColor.push(value.color);
    leadStatusCount.push(value.leads_count);
  });
  var leadChartId = document.getElementById('leadChartId');
  var leadChart = new Chart(leadChartId, {
    type: 'doughnut',
    data: {
      labels: leadStatusName,
      datasets: [{
        data: leadStatusCount,
        backgroundColor: leadStatusColor,
        hoverOffset: 4
      }]
    },
    options: {
      legend: {
        display: false
      }
    }
  }); // Project Status Chart JS 

  var projectStatusCount = [];
  $.each(projectStatusCounts, function (key, value) {
    projectStatusCount.push(value);
  });
  projectStatusCount.pop();
  var projectChartId = document.getElementById('projectChartId');
  var projectChart = new Chart(projectChartId, {
    type: 'doughnut',
    data: {
      labels: projectStatus,
      datasets: [{
        data: projectStatusCount,
        backgroundColor: ['#fc544b', '#6777ef', '#ffa426', '#3abaf4', '#47c363'],
        hoverOffset: 4
      }]
    },
    options: {
      legend: {
        display: false
      }
    }
  }); // Tickets Status Chart JS

  var ticketStatusName = [];
  var ticketStatusColor = [];
  var ticketStatusCount = [];
  $.each(ticketStatusData, function (key, value) {
    var str = value.name;
    ticketStatusName.push(str.replace('&amp;', '&'));
    ticketStatusColor.push(value.pick_color);
    ticketStatusCount.push(value.tickets_count);
  });
  var ticketChartId = document.getElementById('ticketChartId');
  var ticketChart = new Chart(ticketChartId, {
    type: 'doughnut',
    data: {
      labels: ticketStatusName,
      datasets: [{
        data: ticketStatusCount,
        backgroundColor: ticketStatusColor
      }]
    },
    options: {
      legend: {
        display: false
      }
    }
  }); // Weekly Payment Chart JS

  var weekNames = Object.keys(currentWeekInvoices);
  var currentWeekPayment = Object.values(currentWeekInvoices);
  var lastWeekPayment = Object.values(lastWeekInvoices);
  var weeklyPaymentChart = document.getElementById('weeklyPaymentChart');
  var paymentChart = new Chart(weeklyPaymentChart, {
    type: 'bar',
    data: {
      labels: weekNames,
      datasets: [{
        label: [' This Week Payments '],
        data: currentWeekPayment,
        backgroundColor: '#d3ebd3',
        borderColor: '#91cb41',
        borderWidth: 2
      }, {
        label: [' Last Week Payments '],
        data: lastWeekPayment,
        backgroundColor: '#e29ed4',
        borderColor: '#d36dbe',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            min: 0
          }
        }]
      }
    }
  }); // Income Vs Expenses Chart Js

  var monthNames = Object.keys(incomeAndExpenseData.income);
  var incomeMonthly = Object.values(incomeAndExpenseData.income);
  var expenseMonthly = Object.values(incomeAndExpenseData.expenses);
  var incomeVsExpense = document.getElementById('incomeVsExpenseChart');
  var incomeVsExpenseChart = new Chart(incomeVsExpense, {
    type: 'bar',
    data: {
      labels: monthNames,
      datasets: [{
        label: [Lang.get('messages.incomes')],
        data: incomeMonthly,
        backgroundColor: '#d3ebd3',
        borderColor: '#91cb41',
        borderWidth: 2
      }, {
        label: [Lang.get('messages.expenses')],
        data: expenseMonthly,
        backgroundColor: '#feabb3',
        borderColor: '#fd6c7b',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            min: 0
          }
        }]
      }
    }
  }); // Contract expired filter as per month

  $(document).on('change', '#monthId', function () {
    var month = $(this).val();
    $.ajax({
      url: route('contract.month.filter'),
      type: 'POST',
      data: {
        month: month
      },
      success: function success(result) {
        if (result.success) {
          if (result.data.length > 0) {
            loadContractList(result.data, true);
          } else {
            $('#contractExpiredTable').DataTable().clear().draw();
          }
        }
      }
    });
  });
});
/******/ })()
;