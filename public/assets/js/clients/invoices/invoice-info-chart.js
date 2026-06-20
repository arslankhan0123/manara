/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!********************************************************************!*\
  !*** ./resources/assets/js/clients/invoices/invoice-info-chart.js ***!
  \********************************************************************/


$(document).ready(function () {
  // Invoice Info Chart
  var allMonthNames = Object.values(allMonths);
  var paidInvoices = Object.values(invoicesData.paid);
  var unpaidInvoices = Object.values(invoicesData.unpaid);
  var invoiceInfoChart = document.getElementById('invoiceInfoChart');
  var invoiceChart = new Chart(invoiceInfoChart, {
    type: 'bar',
    data: {
      labels: allMonthNames,
      datasets: [{
        label: [' Unpaid '],
        data: unpaidInvoices,
        backgroundColor: '#feb8bf',
        borderColor: '#fa5768',
        borderWidth: 2
      }, {
        label: [' Paid '],
        data: paidInvoices,
        backgroundColor: '#daedbe',
        borderColor: '#bce77e',
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
  });
});
/******/ })()
;