/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!****************************************************!*\
  !*** ./resources/assets/js/proposals/show-page.js ***!
  \****************************************************/


$(document).on('click', 'a', function (event) {
  event.stopPropagation();
});
$(document).on('click', '#markAsDraft, #markAsSend ,#markAsOpen,#markAsRevised,#markAsDeclined,#markAsAccepted', function () {
  var status = $(this).data('status');
  $.ajax({
    url: route('proposal.change-status', proposalId),
    type: 'put',
    data: {
      'status': status
    },
    success: function success(result) {
      if (result.success) {
        window.location.reload();
        displaySuccessMessage(result.message);
      }
    },
    error: function error(result) {
      displayErrorMessage(result.responseJSON.message);
    }
  });
}); //=========== Convert Proposal To Invoice ===================

$(document).on('click', '#convertToInvoice', function () {
  $.ajax({
    url: route('proposal.convert-to-invoice', proposalId),
    type: 'post',
    success: function success(result) {
      if (result.success) {
        var invoiceId = result.data.id;
        window.location.href = invoiceUrl + '/' + invoiceId;
        displaySuccessMessage(result.message);
      }
    },
    error: function error(result) {
      displayErrorMessage(result.responseJSON.message);
    }
  });
}); //============= Convert Proposal To Estimate ==============//

$(document).on('click', '#convertToEstimate', function () {
  $.ajax({
    url: route('proposal.convert-to-estimate', proposalId),
    type: 'post',
    success: function success(result) {
      if (result.success) {
        var estimateId = result.data.id;
        window.location.href = estimateUrl + '/' + estimateId;
        displaySuccessMessage(result.message);
      }
    },
    error: function error(result) {
      displayErrorMessage(result.responseJSON.message);
    }
  });
});
/******/ })()
;