/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!****************************************************!*\
  !*** ./resources/assets/js/customers/customers.js ***!
  \****************************************************/


$(document).on('click', '.customer-delete-btn', function (event) {
  var customerId = $(event.currentTarget).data('id');
  var alertMessage = '<div class="alert alert-warning swal__alert">\n' + '<strong class="swal__text-warning">' + Lang.get('messages.customer.delete_customer_confirm') + '</strong><div class="swal__text-message">' + Lang.get('messages.customer.by_deleting_this_customer') + '</div></div>';
  deleteItemInputConfirmation(route('customers.destroy', customerId), Lang.get('messages.common.customer'), alertMessage);
});

function deleteItemAjax(url, header) {
  var callFunction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  $.ajax({
    url: url,
    type: 'DELETE',
    dataType: 'json',
    success: function success(obj) {
      if (obj.success) {
        window.livewire.emit('refresh');
      }

      swal({
        title: Lang.get('messages.common.deleted'),
        text: header + Lang.get('messages.common.has_been_delete'),
        type: 'success',
        confirmButtonText: Lang.get('messages.common.ok'),
        confirmButtonColor: '#6777ef',
        timer: 2000
      });

      if (callFunction) {
        eval(callFunction);
      }
    },
    error: function error(data) {
      swal({
        title: '',
        text: data.responseJSON.message,
        type: 'error',
        confirmButtonColor: '#6777ef',
        timer: 5000
      });
    }
  });
}

window.deleteItemInputConfirmation = function (url, header, alertMessage) {
  var callFunction = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  swal({
    type: 'input',
    inputPlaceholder: Lang.get('messages.common.delete_confirm') + ' "' + Lang.get('messages.common.delete') + '" ' + Lang.get('messages.common.to_delete_this') + ' ' + header + '.',
    title: Lang.get('messages.common.delete') + ' !',
    text: alertMessage,
    html: true,
    showCancelButton: true,
    closeOnConfirm: false,
    showLoaderOnConfirm: true,
    confirmButtonColor: '#6777ef',
    cancelButtonColor: '#d33',
    cancelButtonText: Lang.get('messages.common.no'),
    confirmButtonText: Lang.get('messages.common.yes'),
    imageUrl: baseUrl + 'img/warning.png'
  }, function (inputVal) {
    if (inputVal === false) {
      return false;
    }

    if (inputVal == '' || inputVal.toLowerCase() != 'delete') {
      swal.showInputError(Lang.get('messages.common.type_delete') + ' ' + header + '.');
      $('.sa-input-error').css('top', '23px!important');
      $(document).find('.sweet-alert.show-input :input').val('');
      return false;
    }

    if (inputVal.toLowerCase() === 'delete') {
      deleteItemAjax(url, header, callFunction = null);
    }
  });
};
/******/ })()
;