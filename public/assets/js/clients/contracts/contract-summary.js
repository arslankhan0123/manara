/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*******************************************************************!*\
  !*** ./resources/assets/js/clients/contracts/contract-summary.js ***!
  \*******************************************************************/


$(document).ready(function () {
  // Contract Summary for Contract Type In Client Side
  var contractTypeNames = [];
  var contractsColors = [];
  var contractsBgColors = [];
  var contractCounts = [];
  $.each(contractTypesData, function (key, value) {
    var str = value.name;
    contractTypeNames.push(str.replace('&amp;', '&'));
    contractCounts.push(value.contracts_customer_count);
    contractsColors.push('#e5e5e5');
    contractsBgColors.push('#d9c0c0');
  });
  var clientContractChart = document.getElementById('clientContractChartId');
  var ContractChart = new Chart(clientContractChart, {
    type: 'bar',
    data: {
      labels: contractTypeNames,
      datasets: [{
        label: 'Contracts By Type ',
        data: contractCounts,
        backgroundColor: contractsColors,
        borderColor: contractsBgColors,
        borderWidth: 2
      }]
    },
    options: {
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