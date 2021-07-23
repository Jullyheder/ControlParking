"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = formatCurrency;

var _big = _interopRequireDefault(require("big.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function formatCurrency(value, localeConfig, currencyName) {
  var numberConfig = localeConfig.formats.number[currencyName];
  var formatter = new global.Intl.NumberFormat(localeConfig.locale, numberConfig);
  return formatter.format((0, _big["default"])(value));
}