/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*******************************************************************!*\
  !*** ./resources/assets/js/expenses/expense-category-by-chart.js ***!
  \*******************************************************************/


$(document).ready(function () {
  // Expense Category By Chart 
  var expenseCategoryNames = [];
  var expenseCategoryCount = [];
  var colors = [];
  var BgColors = [];
  $.each(expenseCategories, function (key, value) {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    var str = value.name;
    expenseCategoryNames.push(str.replace('&amp;', '&'));
    expenseCategoryCount.push(value.expenses_count);
    colors.push('#' + randomColor);
    BgColors.push('#' + randomColor);
  });
  var expenseCategory = document.getElementById('expenseCategoryByChart');
  var expenseCategoryChart = new Chart(expenseCategory, {
    type: 'bar',
    data: {
      labels: expenseCategoryNames,
      datasets: [{
        label: [Lang.get('messages.expense_by_category')],
        data: expenseCategoryCount,
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