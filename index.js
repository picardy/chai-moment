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
      objMoment.isSame(expected, granularity)
      , "expected " + objMoment.format('L') + " to be the same " granularity ? granularity + " " : "" + " as " + expectedMoment.format('L')
      , "expected " + objMoment.format('L') + " not to be the same " granularity ? granularity + " " : "" + " as " + expectedMoment.format('L')
      , expected
      , obj
      , true
    )
  });

  //export tdd style
  var assert = chai.assert;

  assert.sameMoment = function (val, exp, msg) {
    new chai.Assertion(val, msg).to.be.sameMoment(exp);
  };
}));
