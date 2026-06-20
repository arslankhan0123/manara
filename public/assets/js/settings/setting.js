/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*************************************************!*\
  !*** ./resources/assets/js/settings/setting.js ***!
  \*************************************************/


$(document).ready(function () {
  $('#mySelect').select2({
    width: '100%'
  });

  if (groupName == 'general') {
    var input2 = document.querySelector('#defaultCountryData');
    var intl2 = window.intlTelInput(input2, {
      initialCountry: defaultCountryCodeValue,
      separateDialCode: true,
      preferredCountries: false,
      geoIpLookup: function geoIpLookup(success, failure) {
        $.get('https://ipinfo.io', function () {}, 'jsonp').always(function (resp) {
          var countryCode = resp && resp.country ? resp.country : '';
          success(countryCode);
        });
      },
      utilsScript: utilsScript
    });
    var getCode = intl2.selectedCountryData['name'] + '+' + intl2.selectedCountryData['dialCode'];
    $('#defaultCountryData').val(getCode);
  }
});
$(document).on('click', '.iti__standard', function () {
  $('#defaultCountryData').val($(this).text());
  $(this).attr('data-country-code');
  $('#defaultCountryCode').val($(this).attr('data-country-code'));
});
$(document).on('submit', '#settingUpdate', function () {
  if (groupName === 'company_information') {
    var address = $('#addressId').val();
    var companyName = $('#companyNameId').val();
    var emptyAddress = address.trim().replace(/ \r\n\t/g, '') === '';

    if (emptyAddress) {
      displayErrorMessage('Address field is not contain only white space');
      return false;
    }

    var emptyCompanyName = companyName.trim().replace(/ \r\n\t/g, '') === '';

    if (emptyCompanyName) {
      displayErrorMessage('Company Name field is not contain only white space');
      return false;
    }
  }

  if (groupName === 'general') {
    var applicationName = $('#applicationNameId').val();
    var emptyApplicationName = applicationName.trim().replace(/ \r\n\t/g, '') === '';

    if (emptyApplicationName) {
      displayErrorMessage('Application Name field is not contain only white space');
      return false;
    }
  }

  if ($('#error-msg').text() !== '') {
    $('#phoneNumber').focus();
    return false;
  }
});
$(document).on('change', '#logo', function () {
  if (isValidFile($(this), '#validationErrorsBox')) {
    displayPhoto(this, '#logoPreview');
  }
});
$(document).on('change', '#favicon', function () {
  if (isValidFile($(this), '#validationErrorsBox')) {
    displayFavicon(this, '#faviconPreview');
  }
});
/******/ })()
;