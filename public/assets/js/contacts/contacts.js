/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**************************************************!*\
  !*** ./resources/assets/js/contacts/contacts.js ***!
  \**************************************************/


$(document).ready(function () {
  $('#isEnableId').select2({
    width: '150px'
  });
});
$(document).on('click', '.delete-btn', function (event) {
  var contactId = $(event.currentTarget).attr('data-id');
  var alertMessage = '<div class="alert alert-warning swal__alert">\n' + '<strong class="swal__text-warning">' + deleteContactConfirm + '</strong><div class="swal__text-message">' + byDeleteThisContact + '</div></div>';
  swal({
    type: 'input',
    inputPlaceholder: deleteConfirm + ' "' + deleteWord + '" ' + toTypeDelete + ' ' + 'Contact',
    title: deleteHeading + ' !',
    text: alertMessage,
    html: true,
    showCancelButton: true,
    closeOnConfirm: false,
    showLoaderOnConfirm: true,
    confirmButtonColor: '#6777ef',
    cancelButtonColor: '#d33',
    cancelButtonText: noMessages,
    confirmButtonText: yesMessages,
    imageUrl: baseUrl + 'img/warning.png'
  }, function (inputVal) {
    if (inputVal === false) {
      return false;
    }

    if (inputVal == '' || inputVal.toLowerCase() != 'delete') {
      swal.showInputError('Please type "delete" to delete this Contact');
      $('.sa-input-error').css('top', '23px!important');
      $(document).find('.sweet-alert.show-input :input').val('');
      return false;
    }

    if (inputVal.toLowerCase() === 'delete') {
      window.livewire.emit('deleteContact', contactId);
    }
  });
});
window.addEventListener('deleted', function (data) {
  livewireDeleteEventListener(data, 'Contact');
});
window.addEventListener('manageError', function (error) {
  if (error.type == 'manageError') {
    livewireDeleteErrorEventListener(error.detail);
  }
}); // Contact Status activation deactivation change event

$(document).on('change', '.isActive', function () {
  var contactId = $(this).attr('data-id');
  activeDeActiveContact(contactId);
}); // activate de-activate Contact Status

window.activeDeActiveContact = function (id) {
  $.ajax({
    url: route('contacts.activeDeActiveContact', id),
    method: 'post',
    cache: false,
    beforeSend: function beforeSend() {
      startLoader();
    },
    success: function success(result) {
      if (result.success) {
        displaySuccessMessage(result.message);
        window.livewire.emit('refresh');
      }
    },
    complete: function complete() {
      stopLoader();
    }
  });
};

$(document).on('mouseenter', '.livewire-card', function () {
  $(this).find('.action-dropdown').removeClass('d-none');
});
$(document).on('mouseleave', '.livewire-card', function () {
  $(this).find('.action-dropdown').addClass('d-none');
  $(this).parent().trigger('click');
});
$(document).on('change', '#isEnableId', function () {
  var contactStatus = $(this).val();
  window.livewire.emit('contactStatus', contactStatus);
});
document.addEventListener('livewire:load', function (event) {
  window.livewire.hook('message.processed', function (message, component) {
    $('#isEnableId').select2({
      width: '150px'
    });
  });
});
/******/ })()
;