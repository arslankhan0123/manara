/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!******************************************************************!*\
  !*** ./resources/assets/js/leads/lead-convert-customer-chart.js ***!
  \******************************************************************/


$(document).ready(function () {
  // Lead Convert Customer Chart
  var colors = [];
  var BgColors = [];
  $.each(leads, function () {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    colors.push('#' + randomColor);
    BgColors.push('#' + randomColor);
  });
  var leadConvertCustomer = document.getElementById('leadConvertChart');
  var leadConvertCustomerChart = new Chart(leadConvertCustomer, {
    type: 'bar',
    data: {
      labels: currentMonthDates,
      datasets: [{
        label: [Lang.get('messages.lead_convert_to_customer')],
        data: leads,
        backgroundColor: colors,
        borderColor: BgColors,
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
      },
      legend: {
        display: false
      }
    }
  });
});
/******/ })()
;