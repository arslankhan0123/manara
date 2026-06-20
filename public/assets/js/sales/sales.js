/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!********************************************!*\
  !*** ./resources/assets/js/sales/sales.js ***!
  \********************************************/


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

$(document).ready(function () {
  setTimeout(function () {
    $('#invoiceCurrencyId, #creditNoteCurrencyId, #proposalCurrencyId, #estimateCurrencyId').trigger('change');
  }, 500);
  $('#tagId').select2({
    width: 'calc(100% - 44px)',
    placeholder: Lang.get('messages.placeholder.select_tags'),
    multiple: true
  });
  $('.tax-rates').select2({
    width: '100%',
    placeholder: Lang.get('messages.placeholder.select_tax')
  });
  $('#paymentMode').select2({
    width: 'calc(100% - 44px)',
    placeholder: Lang.get('messages.placeholder.select_payment_mode'),
    multiple: true
  });
  $('.status').select2({
    width: '100%',
    placeholder: Lang.get('messages.placeholder.select_status')
  });
  $('.currency-select-box, .sale-agent-select-box, #customerSelectBox').select2({
    width: '100%',
    placeholder: Lang.get('messages.placeholder.select_customer')
  });
  $('#addItemSelectBox').select2({
    width: '87%'
  });
  $('#billTaskSelectBox').select2({
    width: '87%',
    placeholder: Lang.get('messages.placeholder.bill_tasks')
  });
  $('#recurringInvoiceSelect, #discountTypeSelect').select2();

  window.renderOptions = function () {
    var lastItemTaxbox = $('.items-container>tr:last-child').find('.tax-rates');
    taxData.forEach(function (data) {
      var newOption = new Option(data.tax_rate, data.id, false, false);
      lastItemTaxbox.select2({
        width: '100%',
        placeholder: Lang.get('messages.placeholder.select_tax')
      });
      lastItemTaxbox.append(newOption).trigger('change');
    });
  };

  if (typeof isCreate !== 'undefined') {
    renderOptions();
  }

  $(document).on('click', '#itemAddBtn', function (e) {
    e.preventDefault();
    var invoiceItemHtml = prepareTemplateRender('#invoiceItemTemplate');
    $('.items-container').append(invoiceItemHtml);
    $('#invoiceCurrencyId, #creditNoteCurrencyId, #proposalCurrencyId, #estimateCurrencyId').trigger('change');
    renderOptions();
    $(".item-name").attr("placeholder", Lang.get('messages.invoice.item'));
    $(".item-description").attr("placeholder", Lang.get('messages.common.description'));
    $(".qty").attr("placeholder", Lang.get('messages.invoice.qty'));
    $(".rate").attr("placeholder", Lang.get('messages.products.rate'));
  });
  $(document).on('change', '#shippingAddressEnable', function () {
    if ($(this).prop('checked') == true) {
      $('#shippingAddressForm').slideToggle();
    } else {
      $('#shippingAddressForm').slideToggle();
    }
  });
  $(document).on('click', '.remove-invoice-item', function (e) {
    e.preventDefault();

    if ($('table#itemTable tbody tr').length === 1) {
      $('.tax-rates').val([]).trigger('change');
    }

    $(this).parent().parent().remove();

    if ($('table#itemTable tbody tr').length === 0) {
      $('.total-numbers').text('0');
    }

    calculateSubTotal();
  }); //    invoice item calculation

  $(document).on('keyup', '.qty', function () {
    $(this).val($(this).val().replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'));
    var qty = $(this).val();
    var rate = removeCommas($(this).parent().next().find('.rate').val());
    calculateItemAmount(qty, rate, $(this));
    calculateSubTotal();
    $('.tax-rates').trigger('change');
  });
  $(document).on('keyup', '.rate', function () {
    var rate = removeCommas($(this).val());
    var qty = 0;

    if ($(this).val() != '') {
      $(this).val(getFormattedPrice(rate));
      qty = $(this).parent().prev().find('.qty').val();
    }

    calculateItemAmount(qty, rate, $(this));
    calculateSubTotal();
    $('.tax-rates').trigger('change');
  });

  window.calculateItemAmount = function (qty, rate, ele) {
    var itemAmount = qty * rate;

    if (!isNaN(itemAmount)) {
      ele.parent().siblings().children('.item-amount').text(getFormattedPrice(itemAmount));
    }
  };

  var subTotal = 0;

  window.calculateSubTotal = function () {
    subTotal = 0;
    $('.items-container>tr').each(function () {
      var itemAmount = $(this).find('.item-amount').text();
      subTotal += parseFloat(removeCommas(itemAmount));
      subTotal = parseFloat(subTotal);
    });

    if (subTotal == 0) {
      $('#subTotal').text(subTotal);
    } else {
      $('#subTotal').text(getFormattedPrice(subTotal));
    }

    calculateFinalTotal();

    if (checkDiscountType()) {
      $('#footerDiscount').trigger('change');
    }
  };

  $(document).on('change', '#discountTypeSelect', function () {
    $('#footerDiscount').trigger('change');

    if ($(this).val() == 0) {
      $('#footerDiscount').val(0);
    } else {
      $('#footerDiscount').val(1);
    }
  });
  var footerDiscountType = 1;
  $(document).on('change', '#footerDiscount', function () {
    if (checkDiscountType()) {
      footerDiscountType = $(this).val();
      $('.footer-discount-input').trigger('keyup');
      return false;
    }

    $('.footer-discount-input').val(0);
    $('.footer-discount-input').trigger('keyup');
  });
  var discount = 0;
  $(document).on('keyup', '.footer-discount-input', function () {
    if ($(this).val() != '') {
      var currentVal = $(this).val().replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
      $(this).val(parseFloat(currentVal));
    } else {
      $(this).val(0);
    }

    if (checkDiscountType() === '' && $(this).val() > 0) {
      alert('please select discount type first');
    } else {
      prepareSelectedTaxes();
      discount = 0;
      var discountType = checkDiscountType();

      if (discountType == 1) {
        $('.footer-discount-numbers').text('0');
        $('.footer-discount-numbers').text(getFormattedPrice(-$(this).val()));

        if (footerDiscountType == 1) {
          var discountPercentage = $(this).val();
          discountPercentage = discountPercentage > 100 ? 100 : discountPercentage;
          $(this).val(discountPercentage);
          var total1 = parseFloat(subTotal) * parseFloat(discountPercentage) / 100;
          $('.footer-discount-numbers').text(getFormattedPrice(-total1));
        } else {
          var _discountPercentage = $('.footer-discount-input').val();

          $('.footer-discount-numbers').val(_discountPercentage);
        }
      } else if (discountType == 2) {
        $('.footer-discount-numbers').text('0');
        $('.footer-discount-numbers').text(getFormattedPrice(-$(this).val()));

        if (footerDiscountType == 1) {
          var _discountPercentage2 = $(this).val();

          _discountPercentage2 = _discountPercentage2 > 100 ? 100 : _discountPercentage2;
          $(this).val(_discountPercentage2);
          $('.footer-discount-numbers').text(getFormattedPrice(-(subTotal + totalOfAllTaxes) * _discountPercentage2 / 100));
          var total2 = parseFloat(totalOfAllTaxes) + parseFloat(subTotal);
          total2 = total2 * parseFloat(_discountPercentage2) / 100;
          $('.footer-discount-numbers').text(getFormattedPrice(-total2));
        }
      } else {
        $('.footer-discount-numbers').text(getFormattedPrice(-$(this).val()));
        $(this).val(0);
        var subTotalIncludingTaxes = getSubTotalIncludingTaxes();
        $('.footer-discount-numbers').text(getFormattedPrice(subTotalIncludingTaxes * parseFloat(-$(this).val()) / 100));
      }

      discount = parseFloat(removeCommas($('.footer-discount-numbers').text()));
      prepareSelectedTaxes();
      calculateFinalTotal();
    }
  });

  window.getSubTotalWithDiscount = function () {
    return subTotal + discount;
  };

  $(document).on('mousewheel', '#adjustment', function () {
    $(this).blur();
  });
  var adjustment = 0;
  $(document).on('keyup', '#adjustment', function () {
    adjustment = $(this).val() == '' ? 0 : $(this).val();
    $('.adjustment-numbers').text(adjustment === 0 ? 0 : getFormattedPrice(adjustment));
    calculateFinalTotal();
  });

  window.checkDiscountType = function () {
    var discountType = $('#discountTypeSelect').val();

    if (discountType != '' && discountType == 0) {
      $('.footer-discount-input').val('');
      $('#footerDiscount').val(0);
      $('.fDiscount').hide();
    }

    if (discountType == 1 || discountType == 2) {
      $('.fDiscount').show();
      return discountType;
    }
  };

  var taxes = [];
  $(document).on('change', '.tax-rates', function () {
    prepareSelectedTaxes();

    if (checkDiscountType()) {
      $('#footerDiscount').trigger('change');
    }

    calculateFinalTotal();
  });
  var taxPerItems = {
    'items': []
  };

  window.prepareSelectedTaxes = function () {
    taxes = [];
    taxPerItems.items = [];
    $('.items-container>tr').each(function () {
      var itemTax = [];
      $.each($(this).find('.tax-rates option:selected'), function () {
        itemTax.push($(this).text());
      });
      taxes = [].concat(_toConsumableArray(taxes), itemTax);
      var itemRate = removeCommas($(this).find('.item-amount').text());
      taxPerItems.items.push(_defineProperty({}, itemTax, itemRate));
    });
    taxes = Array.from(new Set(taxes));
    renderTaxList();
  };

  var totalOfAllTaxes = 0;
  var discountInNumber = 0;

  window.renderTaxList = function () {
    discountInNumber = $('.footer-discount-input').val();
    totalOfAllTaxes = 0;
    $('#taxesListTable').html('');
    var subTotalForTax = checkDiscountType() == 1 ? getSubTotalWithDiscount() : subTotal;
    taxes.forEach(function (ele) {
      var itemAmount = 0;
      taxPerItems.items.forEach(function (itemsArr) {
        $.each(itemsArr, function (i, v) {
          var multipleTaxes = i.split(','); // taxt1, tax2 = return array

          multipleTaxes.forEach(function (tax) {
            // ele should be tax value
            if (tax != ele) {
              return;
            }

            itemAmount = parseFloat(itemAmount) + parseFloat(v);
          });
        });
      });
      var calculatedTax = 0;

      if ($('#discountTypeSelect').val() == 0) {
        calculatedTax = getFormattedPrice(parseFloat(itemAmount) * parseFloat(ele) / 100);
      } else if ($('#discountTypeSelect').val() == 1) {
        if (footerDiscountType == 1) {
          var amt1 = getFormattedPrice(parseFloat(itemAmount) * parseFloat(discountInNumber) / 100);
          calculatedTax = getFormattedPrice((parseFloat(itemAmount) - parseFloat(amt1 ? removeCommas(amt1) : 0)) * ele / 100);
        } else {
          var amt3 = 0;

          if (discountInNumber != 0) {
            amt3 = getFormattedPrice(parseFloat(itemAmount) - parseFloat(discountInNumber));
            calculatedTax = getFormattedPrice(parseFloat(amt3 ? removeCommas(amt3) : 0) * ele / 100);
          } else {
            calculatedTax = getFormattedPrice((parseFloat(itemAmount) - parseFloat(amt3 ? removeCommas(amt3) : 0)) * ele / 100);
          }
        }
      } else if ($('#discountTypeSelect').val() == 2) {
        calculatedTax = getFormattedPrice(parseFloat(itemAmount) * parseFloat(ele) / 100);
      }

      totalOfAllTaxes += parseFloat(calculatedTax ? removeCommas(calculatedTax) : 0);
      var data = [{
        'tax_name': ele,
        'tax_rate': calculatedTax
      }];
      var taxOptionHtml = prepareTemplateRender('#taxesList', data);
      $('#taxesListTable').append(taxOptionHtml);
    });
  };

  window.getSubTotalIncludingTaxes = function () {
    return subTotal - totalOfAllTaxes;
  };

  window.calculateFinalTotal = function () {
    var discountType = $('#discountTypeSelect').val();

    if (discountType == 0) {
      var ttl = parseFloat(subTotal) + parseFloat(totalOfAllTaxes) + parseFloat(adjustment);
      $('.total-numbers').text(ttl === 0 ? 0 : getFormattedPrice(ttl));
    } else if (discountType == 1) {
      var ttl1 = parseFloat(subTotal) + parseFloat(totalOfAllTaxes) + parseFloat(adjustment) + parseFloat(discount);
      $('.total-numbers').text(ttl1 === 0 ? 0 : getFormattedPrice(ttl1));
    } else if (discountType == 2) {
      var newTotal = parseFloat(totalOfAllTaxes) + parseFloat(subTotal);
      newTotal = newTotal + parseFloat(discount);
      var newTotalFinal = newTotal + parseFloat(adjustment);
      $('.total-numbers').text(newTotalFinal === 0 ? 0 : getFormattedPrice(newTotalFinal));
    }
  };

  window.getCurrencyFormatted = function (number) {
    return getFormattedPrice(number);
  };

  window.getAddressDetail = function (ele) {
    if (typeof editData !== "undefined" && editData) {
      var data = [{
        street: ele.find('.street').val(),
        city: ele.find('.city').val(),
        state: ele.find('.state').val(),
        country: ele.find('.country').val(),
        zip_code: ele.find('.zip-code').val()
      }];
      return prepareTemplateRender('#addressTemplate', data);
    }
  };

  window.createAddressDetail = function (ele) {
    if (typeof createData !== 'undefined' && createData) {
      var data = [{
        street: ele.find('.street').val(),
        city: ele.find('.city').val(),
        state: ele.find('.state').val(),
        country: ele.find('.country').val(),
        zip_code: ele.find('.zip-code').val()
      }];
      return prepareTemplateRender('#createAddressTemplate', data);
    }
  };

  setTimeout(function () {
    $('.address-modal').trigger('hidden.bs.modal');
  }, 100);
  setTimeout(function () {
    $('#addModal').trigger('hidden.bs.modal');
  }, 100); // change the table header when the radio button is changed from the Show As Quantity section.

  var quantityAs = {
    'qty': 'qty',
    'hours': 'hours',
    'qtyHours': 'qtyHours'
  };
  $('#qty, #hours, #qtyHours').on('change', function () {
    var qtyAs = quantityAs[$(this).data('quantity-for')];
    if ($(this).data('quantity-for') === qtyAs && $(this).prop('checked')) $('.qtyHeader').text($(this).next().text());
    $(".qty").attr("placeholder", $(this).next().text());
  }); // on edit mode, change the table header based on the selected option.

  if (typeof editData !== "undefined" && editData) $('#qty, #hours, #qtyHours').trigger('change'); // change currency icon based on their selected value

  var currenciesIconClass = {
    0: 'fas fa-rupee-sign',
    1: 'fas fa-dollar-sign',
    2: 'fas fa-dollar-sign',
    3: 'fas fa-euro-sign',
    4: 'fas fa-yen-sign',
    5: 'fas fa-pound-sign',
    6: 'fas fa-dollar-sign'
  };
  $('#invoiceCurrencyId, #creditNoteCurrencyId, #proposalCurrencyId, #estimateCurrencyId').on('change input', function () {
    var currencyIndex = $(this).val();
    $(document).find('[data-set-currency-class=\'true\']').attr('class', currenciesIconClass[currencyIndex]);
  });
  $(document).on('blur', '#adjustment', function () {
    var adjustment = $(this).val();

    if (isEmpty(adjustment)) {
      $('#adjustment').val('0');
    }
  });
});
/******/ })()
;