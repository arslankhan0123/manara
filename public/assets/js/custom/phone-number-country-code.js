/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*****************************************************************!*\
  !*** ./resources/assets/js/custom/phone-number-country-code.js ***!
  \*****************************************************************/


var input = document.querySelector('#phoneNumber'),
    errorMsg = document.querySelector('#error-msg'),
    validMsg = document.querySelector('#valid-msg');
var errorMap = [Lang.get('messages.placeholder.invalid_number'), Lang.get('messages.placeholder.invalid_country_number'), Lang.get('messages.placeholder.too_short'), Lang.get('messages.placeholder.too_long'), Lang.get('messages.placeholder.invalid_number')]; // initialise plugin

var intl = window.intlTelInput(input, {
  initialCountry: defaultCountryCodeValue,
  separateDialCode: true,
  preferredCountries: false,
  geoIpLookup: function geoIpLookup(success, failure) {
    $.get('//ipinfo.io', function () {}, 'jsonp').always(function (resp) {
      var countryCode = resp && resp.country ? resp.country : '';
      success(countryCode);
    });
  },
  utilsScript: utilsScript
});
var getCode = intl.selectedCountryData['name'] + '+' + intl.selectedCountryData['dialCode'];
$('#defaultCountryData').val(getCode);

var reset = function reset() {
  input.classList.remove('error');
  errorMsg.innerHTML = '';
  errorMsg.classList.add('hide');
  validMsg.classList.add('hide');
};

input.addEventListener('blur', function () {
  reset();

  if (input.value.trim()) {
    if (intl.isValidNumber()) {
      validMsg.classList.remove('hide');
    } else {
      input.classList.add('error');
      var errorCode = intl.getValidationError();
      errorMsg.innerHTML = errorMap[errorCode];
      errorMsg.classList.remove('hide');
    }
  }
}); // on keyup / change flag: reset

input.addEventListener('change', reset);
input.addEventListener('keyup', reset);

if (phoneNo !== '') {
  setTimeout(function () {
    $('#phoneNumber').trigger('change');
  }, 500);
}

$(document).on('blur keyup change countrychange', '#phoneNumber', function () {
  if (phoneNo !== '') {
    intl.setNumber('+' + phoneNo);
    phoneNo = '';
  }

  var getCode = intl.selectedCountryData['dialCode'];
  $('#prefix_code').val(getCode);
});

if (isEdit) {
  var _getCode = intl.selectedCountryData['dialCode'];
  $('#prefix_code').val(_getCode);
}

var getPhoneNumber = $('#phoneNumber').val();
var removeSpacePhoneNumber = getPhoneNumber.replace(/\s/g, '');
$('#phoneNumber').val(removeSpacePhoneNumber);
/******/ })()
;