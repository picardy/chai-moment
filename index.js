(function(plugin){
  if (
    typeof require === "function"
    && typeof exports === "object"
    && typeof module === "object"
  ) {
    // NodeJS
    module.exports = plugin;
  } else if (
    typeof define === "function"
    && define.amd
  ) {
    // AMD
    define(function () {
      return plugin;
    });
  } else {
    // Other environment (usually <script> tag): plug in to global chai instance directly.
    chai.use(plugin);
  }
}(function(chai, utils){
  var moment;

  if (
    typeof window === "object"
    && typeof window.moment == "function"
  ) {
    // browser-side
    moment = window.moment;
  } else {
    // server-side
    moment = require('moment');
  }

  chai.Assertion.addMethod('sameMoment', function(expected, granularity) {
    var obj = this._obj
    var objMoment = moment(obj)
    var expectedMoment = moment(expected)
    this.assert(
      objMoment.isSame(expectedMoment, granularity)
      , "expected " + objMoment.format('L') + " to be the same as " + expectedMoment.format('L') + (granularity ? " (granularity: " + granularity + ")" : "")
      , "expected " + objMoment.format('L') + " not to be the same as " + expectedMoment.format('L') + (granularity ? " (granularity: " + granularity + ")" : "")
      , expected
      , obj
      , true
    )
  });

  chai.Assertion.addMethod('beforeMoment', function(expected, granularity) {
    var obj = this._obj
    var objMoment = moment(obj)
    var expectedMoment = moment(expected)
    this.assert(
      objMoment.isBefore(expectedMoment, granularity)
      , "expected " + objMoment.format('L') + " to be before " + expectedMoment.format('L') + (granularity ? " (granularity: " + granularity + ")" : "")
      , "expected " + objMoment.format('L') + " not to be before " + expectedMoment.format('L') + (granularity ? " (granularity: " + granularity + ")" : "")
      , expected
      , obj
      , true
    )
  });

  chai.Assertion.addMethod('afterMoment', function(expected, granularity) {
    var obj = this._obj
    var objMoment = moment(obj)
    var expectedMoment = moment(expected)
    this.assert(
      objMoment.isAfter(expectedMoment, granularity)
      , "expected " + objMoment.format('L') + " to be after " + expectedMoment.format('L') + (granularity ? " (granularity: " + granularity + ")" : "")
      , "expected " + objMoment.format('L') + " not to be after " + expectedMoment.format('L') + (granularity ? " (granularity: " + granularity + ")" : "")
      , expected
      , obj
      , true
    )
  });

  //export tdd style
  var assert = chai.assert;

  var allowedGranularities = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second'],
    allowedGranularitiesLookup = {};

  allowedGranularities.forEach(function(type) {
    allowedGranularitiesLookup[type] = true;
  });

  assert.sameMoment = function (val, exp, granularity, msg) {
    if(!allowedGranularitiesLookup[granularity]) msg = granularity;
    new chai.Assertion(val, msg).to.be.sameMoment(exp, granularity);
  };

  assert.beforeMoment = function (val, exp, granularity, msg) {
    if(!allowedGranularitiesLookup[granularity]) msg = granularity;
    new chai.Assertion(val, msg).to.be.beforeMoment(exp, granularity);
  };

  assert.afterMoment = function (val, exp, granularity, msg) {
    if(!allowedGranularitiesLookup[granularity]) msg = granularity;
    new chai.Assertion(val, msg).to.be.afterMoment(exp, granularity);
  };
  
}));
